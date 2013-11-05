/**
 *  Copyright (c) 2013 Neal Xiong
 */

(function(global){
	
	var NUnit = {};
	
	var assert = NUnit.assert = {
		/** 
		 * Assert equals. Do not use to compare two null value. Use {@link #isNull} to assert a null(or undefined) value.
		 * @memberOf assert 
		 * */
		"equals": function(obj1, obj2, desc){
			if(obj1 === obj2 || toStr(obj1) == toStr(obj2)){
				return true ;
			};
			throw new Error(desc || "Expecting " + toStr(obj1) + " but was " + toStr(obj2)) ;
		},
		/** 
		 * Short cut to {@link assert#equals} 
		 * @memberOf assert*/
		"eq": function(obj1, obj2, desc){
			return this.equals(obj1, obj2, desc);
		},
		
		"isTrue": function(obj, desc){
			if(obj === true){
				return true ;
			}
			throw new Error(desc || "Expecting true");
		},
		"t": function(obj, desc){
			return this.isTrue(obj, desc)
		},
		"isFalse": function(obj, desc){
			if(obj === false){
				return true ;
			}
			throw new Error(desc || "Expecting false");
		},
		"f": function(obj, desc){
			return this.isFalse(obj, desc);
		},
		"isNull": function(obj, desc){
			if(isNull(obj)){
				return true ;
			}
			throw Error(desc || "Expecting null");
		},
		"notNull": function(obj, desc){
			if(!isNull(obj)){
				return true ;
			}
			throw Error(desc || "Expecting not null");
		},
		"fail":  function(msg){
			msg = isNull(msg)? "": msg ;
			throw new Error(msg);
		},
		"contains": function(obj1, obj2, desc){
			try{
				return this.t(obj1.indexOf(obj2) > -1, desc)
			}catch(e){
				throw Error("Expecting " + toStr(obj2) + " in " + toStr(obj1));
			}
		},
		"exception": function(callback, desc){
			var err ;
			try{
				//FIXME ?? context of callback?
				callback();
			}catch(e){
				err = e ;
			}
			return this.notNull(err, desc || "Expecting exception from closure.");
		},
		guarantee: function(){
			return {
				counter: 0,
				crossPoints: [],
				cross: function(desc){
					this.crossPoints.push(desc);
					this.counter ++;
				},
				count : function(num, desc){
					try{
						var pass = assert.eq(this.counter, num, desc);	
						this.counter = 0;
						this.crossPoints = [];
					}catch(e){
						var msg = desc || e.message ;
						throw Error(msg + "\n" + "Captured cross points: " + toStr(this.crossPoints) );
					}
					
				}

			};
		}
	};

	/** 
	 *  Uses JSON.stringify to convert the object into a string.
	 *  @private */
	var toStr = function(obj){
		if (isNull(obj)){
			return "" + obj;
		}
		
		return JSON.stringify(obj);
	};

	/** 
	 * Returns true if obj is null of undefined 
	 * @private
	 * */
	var isNull = function(obj){
		/* null === undefined is false 
		 * null == undefined is true */
		return obj == undefined ;
	};
	
	var Test = NUnit.Test = function(desc){
		if(this instanceof Test == false){
			return new Test(desc);
		}
		
		this.desc = desc || ("_" + Date.now());
	};

	var EMPTY_FUNC = function(){};
	Test.prototype.before = EMPTY_FUNC ;
	Test.prototype.after = EMPTY_FUNC ;
	Test.prototype.beforeEach = EMPTY_FUNC ;
	Test.prototype.afterEach = EMPTY_FUNC ;
	Test.beforeClass = EMPTY_FUNC ;
	Test.afterClass = EMPTY_FUNC ;
	Test.BEFORE  = "before" ;
	Test.AFTER = "after" ;
	Test.BEFORE_EACH  = "beforeEach" ;
	Test.AFTER_EACH = "afterEach" ;
	Test.BEFORE_CLASS = "beforeClass" ;
	Test.AFTER_CLASS = "afterClass";
	
	/** Stack trace support from stacktrace.js
		@private */
	var stackTraceJs = function(){

		if (typeof printStackTrace !== "undefined")
			return printStackTrace
		else if (typeof require !== "undefined")
			try{
				return require("stacktrace")
			}catch(e){}
			
		else 
			return undefined
	}();

	var TestRunner = NUnit.TestRunner = function(){
		if(this instanceof TestRunner == false){
			return new TestRunner();
		}
		/** 
		 * A list of result objects
		 * @field */
		this.results = [];
		this.total = 0;
		this.failed = [];
		/**
		 * A list of appenders
		 */
		this.appenders = [];
		this.reporters = [];
	};
	TestRunner.prototype = {
			/** @param  {Test} test */
			run: function(test){
				var total = 0, failed = 0 , successful = 0, target = test ;
//				this.out.println('log', '[TestRunner] ' + 'Starting test.');
				if(!test || !test instanceof Test ){
					throw new Error('No test found.');
					return ;
				}

				for(var attr in test){
					if(test.hasOwnProperty(attr) && typeof test[attr] == "function"){
						total ++;
					}
				}
				// failedTarget={};

				this.info('[TestRunner] ' + 'Starting test.');
				this.report("testUnitBegin", [total, test.desc]);

				
				//Run Test.beforeClass
				if(test.hasOwnProperty(Test.BEFORE_CLASS) ){
					this.log('[TestRunner] ' + 'Running BEFORE_CLASS function.');
					invoke(test, Test.BEFORE_CLASS);
				}
				for(var prop in test){
					if(test.hasOwnProperty(prop)){
						if("before" == prop){
							continue ;
						}
						if(test.hasOwnProperty(Test.BEFORE) && typeof test[Test.BEFORE] === "function"){
							this.log('[TestRunner] ' + 'Running BEFORE.');
							invoke(test,Test.BEFORE);
						}
						
						if(typeof test[prop] === "function"){
							this.log('[TestRunner] ' + 'Running #' + prop);
							var result = new NUnit.TestResult(test, prop);
							this.report("testBegin", [result.id, prop]);
							this.results.push(result);

							// total ++ ;
							try{
								invoke(test,prop) ;
								successful ++ ;
								result.passed = true;//result.passed = false by default
							}catch(e){
								failed ++ ;
								this.err("[#" + prop +"] " + e.message);
								if(stackTraceJs){
									var trace = stackTraceJs({"e": e});
									this.err(trace.join('\n'));
								}
								this.err("Failed: #"+ prop );
								result.error = e;
	//							log.err(e);
							}finally{
								this.report("testEnd", [result.id, prop, result.passed]);
							}
							
						}

						if(test.hasOwnProperty(Test.AFTER) && typeof test[Test.AFTER] === "function"){
							this.log('[TestRunner] ' + 'Running AFTER');
							invoke(test,Test.AFTER);
						}
					}
				}
				if(test.hasOwnProperty(Test.AFTER_CLASS) ){
					this.log('[TestRunner] ' + 'Running AFTER_CLASS');
					invoke(test, Test.AFTER_CLASS);
				}
				this.report("testUnitEnd", [total, test.desc, failed]);
				this.log('[TestRunner] ' + 'Finishing test.');
				this.info('[TestRunner] ' + 'Ran ' + total + ' tests, ' + successful + ' were successful, ' + failed + ' were failed.');
			},
			info: function(msg){
				this._log("INFO", msg)
			},
			error: function(msg){
				this._log("ERROR", msg);
			},
			err: function(msg){
				this.error(msg);
			},
			log: function(msg){
				this._log("LOG", msg);
			},
			_log: function(level, msg, skipAppenders){
				if(console){
					switch(level){
						case "LOG":
							console.log(msg);
							break;
						case "INFO":
							console.info(msg);
							break;
						case "ERROR":
							console.error(msg);
							break ;
					}
				}
				if(this.appenders && !skipAppenders){
					for(var index in this.appenders){
						try{
							this.appenders[index]['append'](level, msg);
						}catch(e){
							this._log("ERROR", e.message, true);
						}
						
					}
					
				}
			},
			addReporter: function(reporter){
				this.reporters.push(reporter);
			},
			report: function(event, params){
				for(var index in this.reports){
					try{
						var rep = this.reporters[index] ;
						rep[event].apply(rep, params);
					}catch(e){
						//TODO reporter error
					}
				}
			}
			
	};

	var TestResult = NUnit.TestResult = function(test, testName){
		this.id = test.desc + "." + testName;
		this.passed = false ;
		this.error = null;
	};

	if(typeof module !== "undefined") module.exports = NUnit ;
	if(global && global.window === global){
		global.NUnit = NUnit ;
	}
})(this);
