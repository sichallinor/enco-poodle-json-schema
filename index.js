'use strict';


module.exports =  {

	schema_default: require('./schemas/schema_default.json'),   
	schema_timesheets: require('./schemas/schema_timesheets.json'),


    helloWorld() {
    	console.log("hello world - module is up and running");
    },


}