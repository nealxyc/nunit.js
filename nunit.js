/**
 *  Copyright (c) 2013 Neal Xiong
 */

(function(){
	
	var nunit = module.exports = {};
	
	/** @memberOf nunit */
	var assert = {
		/** 
		 * Assert equals. Do not use to compare two null value. Use {@link #isNull} to assert a null(or undefined) value.
		 * @memberOf nunit.assert 
		 * */
		"equals": function(obj1, obj2, desc){
			if(obj1 === obj2 || toStr(obj1) == toStr(obj2)){
				return true ;
			};
			throw new Error("Expecting " + toStr(obj1) + " but was " + toStr(obj2)) ;
		},
		/** 
		 * Short cut to {@link assert#equals} 
		 * @memberOf nunit.assert*/
		"eq": function(obj1, obj2, desc){
			return this.equals(obj1, obj2, desc);
		},
		
		"isTrue": function(obj, desc){
			if(obj === true){
				return true ;
			}
			throw new Error(desc || "Expecting true");
		},
		"isFalse": function(obj, desc){
			if(obj === false){
				return true ;
			}
			throw new Error(desc || "Expecting false");
		},
		"isNull": function(obj, desc){
			if(isNull(obj)){
				return true ;
			}
			throw new Error(desc || "Expecting null");
		},
		"notNull": function(obj, desc){
			if(!isNull(obj)){
				return true ;
			}
			throw new Error(desc || "Expecting not null");
		},
		"fail":  function(msg){
			msg = isNull(msg)? "": msg ;
			throw new Error(msg);
		}
	};

	/** @private */
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
	
	/**
	 * @memberOf nunit
	 */
	var Test = function(){
		
	};

	/**
	 * @memberOf nunit.Test.prototype
	 */
	Test.prototype.before = EMPTY_FUNC ;
	Test.prototype.after = EMPTY_FUNC ;
	/**
	 * @memberOf nunit.Test
	 * @static
	 */
	Test.beforeClass = EMPTY_FUNC ;
	Test.afterClass = EMPTY_FUNC ;
	/**
	 * @memberOf nunit.Test
	 * @static
	 * @constant
	 */
	Test.BEFORE  = "before" ;
	Test.AFTER = "after" ;
	Test.BEFORE_CLASS = "beforeClass" ;
	Test.AFTER_CLASS = "afterClass";
	
	/** @memberOf nunit */
	nunit.TestRunner = {
			run: function(test){
				var total = 0, failed = 0 , successful = 0;
				this.info('[TestRunner] ' + 'Starting test.');
//				this.out.println('log', '[TestRunner] ' + 'Starting test.');
				if(Test.prototype.isPrototypeOf(test) == false){
					this.info('[TestRunner] ' + 'No test found.');
					return ;
				}
				
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
						this.log('[TestRunner] ' + 'Running #' + prop);
						try{
							if(typeof test[prop] === "function"){
								total ++ ;
								invoke(test,prop) ;
								successful ++ ;
							}
						}catch(e){
							failed ++ ;
							this.err("[#" + prop +"] " + e.message);
							this.err("Failed: #"+ prop );
//							log.err(e);
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
			appenders:[]
	};
	
	nunit.assert = assert ;
	nunit.Test = Test ;
	module.exports = nunit ;
	
})();
