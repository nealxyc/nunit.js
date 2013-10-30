/**
 *  Copyright (c) 2013 Neal Xiong
 */

(function(){
	var nunit = {};
	/** @memberOf nunit */
	nunit.assert = {
		/** 
		 * Assert equals. Do not use to compare two null value. Use {@link #isNull} to assert a null(or undefined) value.
		 * @memberOf assert 
		 * */
		"equals": function(obj1, obj2, desc){
			if(obj1 === obj2 || toStr(obj1) == toStr(obj2)){
				return true ;
			};
			throw new Error("Expecting " + toStr(obj1) + " but was " + toStr(obj2)) ;
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
	
	module.exports = nunit ;
})();
