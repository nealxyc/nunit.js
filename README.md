NUnit.js
========

Neal's unit test framework for JavaScript. 

* No callbacks and closures. Simple and Intuitive. Easier to understand and write tests.
* Pure JavaScript based. Runnable in browsers or in NodeJS.
* A similar syntax to JUnit test framework. Less learning curve for developer who is already familiar with the most popular Java unit test framework.

## v0.2.0

### Usage

#### In browser

	<!-- Include nunit.js -->
	<script src="../nunit.js"></script>
	<script>
	var name = "world";
	var test = new NUnit.Test("Test Hello world"); // Create a test object (test module)
	test.myTest = function(assert){ // Every method on the test module is a test case. 
	    assert.equals("hello world!", "hello " + name + "!");
	  };
	</script>
	<!-- nunit-browser.js contains the driver script that looks for all the test modules and runs them with built-in test runner. -->
	<!-- It also provides a mini reporter for displaying test results -->
	<script src="nunit-browser.js"></script>

#### In NodeJS

	var nunit = require("nunit");
	var test = new NUnit.Test("Test Hello Node!");
	test.myTest = function(assert){
	    assert.equals("hello Node!", "hello " + "Node + "!");
	  };
	nunit.execute(); //Use the default configuration to run all test modules.


### API doc

#### NUnit.Test
* Every test module (or test object) has to be an instance of `NUnit.Test` class.

	var test = new NUnit.Test("Test description.");




