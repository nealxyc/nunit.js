
/**
 * Using the JsTestDriver to test nunit.js
 */

var test = TestCase("Test NUnit.js");
/** @memberOf test */
test.prototype.testEq = function(){
	assertEquals("", "");
	
	//When not equal, there will be an exception and err should not be null
//	assertEquals("", 123, "When not equal, there will be an exception and err should not be null");
	assertNotEquals( "When not equal, there will be an exception and err should not be null", "", 123);

};

test.prototype.testAssertTrue = function(){
	assertTrue(true);
	assertFalse(false);
	var err;
	try{
		assertTrue({}, "desc");
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("desc", err.message);
	
	var err;
	try{
		assertTrue({});
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("Expecting true", err.message);
	
	
	var err;
	try{
		assertFalse("");
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("Expecting false", err.message);
	
	var err;
	try{
		assertFalse(1, "desc");
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("desc", err.message);
	
}

test.prototype.testIsNull = function(){
	assertNull(null);
	assertUndefined(undefined);
	
	assertNotNull("");
	assertNotNull(1);
	assertNotNull(0);
	
	
	var err;
	try{
		assertNull("null", "should be null");
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("should be null", err.message);
	
	var err;
	try{
		assertNull(1);
	}catch(e){err = e;}
	assertNotNull(err);
//	assertEquals("Expecting null", err.message);
	
};

//test.prototype.testFail = function(){
//	var err;
//	try{
//		fail();
//	}catch(e){err = e;}
//	assertNotNull(err);
//	assertEquals("", err.message);
//	
//	var err;
//	try{
//		fail("msg");
//	}catch(e){err = e;}
//	assertNotNull(err);
//	assertEquals("msg", err.message);
//	
//};
//
//test.prototype.testTestClass = function(){
//	var a = assert;
//	var t = new NUnit.Test();
//	a.isTrue(t instanceof NUnit.Test);
//	t.testOne = function(){};
//	a.equals(1, Object.getOwnPropertyNames(t).length);
//
//};
//
//test.prototype.testRunner = function(){
//	var a = assert;
//	
//	var runner = new NUnit.TestRunner();
//
//	var err;
//	try{
//		runner.run();
//	}catch(e){
//		err = e;
//	}
//	a.notNull(err, "No test to run will cause error");
//
//	var t = new NUnit.Test();
//	t.myTest = function(){ a.fail();};
//	runner.run(t);
//
//};