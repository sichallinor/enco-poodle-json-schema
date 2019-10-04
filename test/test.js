'use strict';

var expect = require('chai').expect;
var poodleJsonSchema = require('../index');

describe('#poodleJsonSchema', function() {


    it('should be facilitate access to default schema', () => {  

        console.log(poodleJsonSchema.schema_default);
        return poodleJsonSchema.schema_default;

    });


})