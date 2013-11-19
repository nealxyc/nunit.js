NUnit.js
========

Neal's unit test framework for JavaScript. 

* No callbacks and closures. Simple and Intuitive. Easier to understand and write tests.
* Pure JavaScript based. Runnable in browser or in NodeJS.
* A similar syntax to JUnit test framework. Less learning curve for developer who is already familiar with the most popular Java unit test framework.

## v0.2.0

### Usage

#### In browser

	<!-- Include nunit.js -->
	<script src="../nunit.js"></script>
	<script>
	var name = "world";
	var test = new NUnit.Test("Test Hello world"); // Create a test module (test case)
	test.myTest = function(assert){ // Every method on the test module is a test. 
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

	`var test = new NUnit.Test("Test description.");`

* Every function on this module object are treated as one test except these four: `before`, `after`, `beforeAll`, and `afterAll`. 
* If `before` and `after` was defined on the test object, they will run before and after each test respectively.
* If `beforeAll` and `afterAll` was defined on the test object, they will run before and after all tests respectively.


#### NUnit.Assert
##### Accessing the assert object
There are two ways to get to the assert object.
* From `assert` attribute of the test module

		var test = new NUnit.Test("a test module");
		var a = test.assert ;

* From the first argument of the test function:

		test.myTest = function(a){
			a.assertTrue(true);
		}

* And they are equivalent:

		test.testAssert = function(a){
			a.strictEquals(a, this.assert);
		}

##### Assert functions
* **equals(obj1, obj2, desc)**: Asserts `obj1` equals to `obj2`. It uses `==` to compare the two. For javascript object it also tries `toJSON(obj1) == toJSON(obj2)`. Do not use to compare two null value. Use **#isNull** to assert a null(or undefined) value.
* **notEqual(obj1, obj2, desc)**: Asserts not equal.
* **isTrue(obj, desc)**: Asserts `obj` is `true`.
* **isFalse(obj, desc)**: Asserts `obj` is `false`.
* **isNull(obj, desc)**: Asserts `obj` is `null` or `undefined`.
* **notNull(obj, desc)**: Asserts `obj` is not `null` or `undefined`.
* **fail(msg)**: Fails the current test with message `msg`. 
* **contains(obj1, obj2, desc)**: Asserts `obj1` contains `obj2`. It uses `indexOf` function on `obj1`.
* **exception(callback, desc)**: Asserts that the `callback` will throw an error.


		



