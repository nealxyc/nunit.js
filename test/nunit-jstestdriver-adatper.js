
(function(global){
	
	if(global && global.NUnit){
		global.NUnit.assert = {
				"equals": function(obj1, obj2, desc){
					return assertEquals(desc, obj1, obj2);
				},
				/** 
				 * Short cut to {@link assert#equals} 
				 * @memberOf assert*/
				"eq": function(obj1, obj2, desc){
					return this.equals(obj1, obj2, desc);
				},
				
				"isTrue": function(obj, desc){
					return
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
			}
	}
})(this);