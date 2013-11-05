/**
	Interface - NunitReporter
*/

module.exports = function(){

	var UnitReporter = function(){
	}

	UnitReporter.prototype = {
		/** @param {Number} testCount */
		/** @param {String} desc */
		testUnitBegin: function(testCount, desc){

		},
		/** @param {String} testName  */
		testBegin: function(id, testName){

		},
		/** @param {NUnit.Test} test  */
		/** @param {String} testName  */
		/** @param {Boolean} result  */
		testEnd: function(id, testName, result){

		},

		testUnitEnd: function(testCount, desc, failedCount)){

		}

	};

	return UnitReporter;
};