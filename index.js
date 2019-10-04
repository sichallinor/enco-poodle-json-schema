'use strict';

const fIdent = "IdentityField";

module.exports =  {



	schema_default: require('./schemas/schema_default.json'),   
	schema_timesheets: require('./schemas/schema_timesheets.json'),
	schema_caldav: require('./schemas/schema_caldav.json'),


	checkModeAndSchema(mode){
		if(mode && mode.schemas && mode.schemas.length>0) return true;
		return false;
	},

	// VALIDATION
	hasFieldName(mode,fieldname){
		if(mode && mode.schemas && mode.schemas.length>0) return true;
		return mode.schemas[0].properties.hasOwnProperty(fieldname)
	},

	// RETRIEVEAL
    getFieldIdentity(mode){
    	if(!checkModeAndSchema(mode)) return null;
    	if(mode.schemas[0].hasOwnProperty(fIdent)) return mode.schemas[0][fIdent];
    	//default ... try id
    	if(hasFieldName(mode,'id')) return 'id';
    	return null;
    }


}