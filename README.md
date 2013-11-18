NUnit.js
========

Neal's unit test framework for JavaScript. 

* No callbacks and closures. Simple and Intuitive. Easier to understand and write tests.
* Pure JavaScript based. Runnable in browsers or in NodeJS.
* A similar syntax to JUnit test framework. Less learning curve for developer who is already familiar with the most popular Java unit test framework.

## v0.2.0

### Usage

#### In browsers

	<!-- Include nunit.js -->
	<script src="../nunit.js"></script>
	<script>
	var name = "world";
	var test = new NUnit.Test("Test Hello world"); // Create a test object (test module)
	test.myTest = function(assert){ // Every method on the test object is a test case. 
	    assert.equals("hello world!", "hello " + name + "!");
	  };
	</script>
	<!-- nunit-browser.js contains script that looks for all the test objects and runs them with built-in test runner. -->
	<!-- It also has a mini reporter to show the results -->
	<script src="nunit-browser.js"></script>


