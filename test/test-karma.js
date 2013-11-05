
/**
 * Using the old testjs.js to test nunit.js
 */

var nunit = require("../nunit.js");
var assert = nunit.assert ;
var test = new nunit.Test("NUnit Test with karma...");


test.testConstructor = function(){
	var t = new nunit.Test();
	assert.isTrue(t instanceof nunit.Test);
	t = nunit.Test();
	assert.isTrue(t instanceof nunit.Test);
};

test.testName = function(){
	var t = new nunit.Test('mytest');
	assert.eq("mytest", t.desc);
};

/** @memberOf test */
test.testEq = function(){
	assert.eq("", "");
	
	//When not equal, there will be an exception and err should not be null
	var err;
	try{
		assert.eq("", 123, "When not equal, there will be an exception and err should not be null");
	}catch(e){err = e;}
	assert.notNull(err);
	//assertEquals("When not equal, there will be an exception and err should not be null", err.message);
};

module.exports = test ;