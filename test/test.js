

/**
 * Using the old testjs.js to test nunit.js
 */

var nunit = require("../nunit.js");
var assert = nunit.assert ;
var test = new Test();

/** @memberOf test */
test.testEq = function(){
	assert.eq("", "");
	
	//When not equal, there will be an exception and err should not be null
	var err;
	try{
		assert.eq("", 123, "When not equal, there will be an exception and err should not be null");
	}catch(e){err = e;}
	assertNotNull(err);

};

test.assertTrue = function(){
	assert.isTrue(true);
	assert.isFalse(false);
	var err;
	try{
		assert.isTrue({}, "desc");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("desc", err.message);
	
	var err;
	try{
		assert.isTrue({});
	}catch(e){err = e;}
	assertNotNull(err);
	eq("Expecting true", err.message);
	
	
	var err;
	try{
		assert.isFalse("");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("Expecting false", err.message);
	
	var err;
	try{
		assert.isFalse(1, "desc");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("desc", err.message);
	
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
		assert.isNull(1);
	}catch(e){err = e;}
	assertNotNull(err);
	eq("Expecting null", err.message);
	
};

test.testFail = function(){
	var err;
	try{
		fail();
	}catch(e){err = e;}
	assertNotNull(err);
	eq("", err.message);
	
	var err;
	try{
		fail("msg");
	}catch(e){err = e;}
	assertNotNull(err);
	eq("msg", err.message);
	
};
module.exports = test ;