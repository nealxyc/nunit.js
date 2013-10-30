

/**
 * Using the old testjs.js to test nunit.js
 */

var nunit = require("../nunit.js");
var assert = nunit.assert ;
var test = new Test();

/** @memberOf test */
test.testEq = function(){
	assert.eq("", "");
	
	var err;
	try{
		assert.eq("", 123);
	}catch(e){err = e;}
	assertNotNull(err);

};

test.assertTrue = function(){
	assert.isTrue(true);
	assert.isFalse(false);
	var err;
	try{
		assert.isTrue("true", "desc");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("desc", err.message);
	
	var err;
	try{
		assert.isFalse("");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("Expecting false", err.message);
	
}

test.isNull = function(){
	assert.isNull(null);
	assert.isNull(undefined);
	
	assert.notNull("");
	assert.notNull(1);
	assert.notNull(0);
	
	
	var err;
	try{
		assert.isNull("null", "should be null");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("should be null", err.message);
	
	var err;
	try{
		assert.isFalse("");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("Expecting false", err.message);
	
}
module.exports = test ;