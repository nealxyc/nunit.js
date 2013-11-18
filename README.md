NUnit.js
========

Neal's unit test framework for JavaScript. 

* No callbacks and closures. Simple and Intuitive. Easier to understand and write tests.
* Pure JavaScript based. Runnable in browsers or in NodeJS.
* A similar syntax to JUnit test framework. Less learning curve for developer who is already familiar with the most popular Java unit test framework.

## v0.2.0

### Usage

#### Run test in browsers
Include `nunit.js`, script containing  your tests, and `nunit-browser.js`

	<script src="../nunit.js"></script>
	<script>
	var name = "world";
	// Create a test object (test module)
	var test = new NUnit.Test("Test Hello world");
	// Every method on the test object is a test case. 
	test.myTest = function(assert){
	    assert.equals("hello world!", "hello " + name + "!");
	  };
	</script>
	<!-- nunit-browser.js contains script that looks for all the test objects and runs them with built-in test runner. -->
	<!-- It also has a mini reporter to show the results -->
	<script src="nunit-browser.js"></script>


