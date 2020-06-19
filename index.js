'use strict';

const fIdent = "IdentityField";
const fListCellTitle = "ListCellTitleField";

module.exports =  {
//export default {

	init: false,

	schema_other_settings: require('./schemas/schema_other_settings.json'), 

	schema_studio_primatives: require('./schemas/schema_studio_primatives.json'),
	schema_studio_mode: require('./schemas/schema_studio_mode.json'), 
	schema_studio_component: require('./schemas/schema_studio_component.json'), 
	schema_studio_actions: require('./schemas/schema_studio_actions.json'),
	schema_studio_proxy: require('./schemas/schema_studio_proxy.json'),

	schema_settings: require('./schemas/schema_settings.json'), 
	schema_schema: require('./schemas/schema_schema.json'),   
	schema_default: require('./schemas/schema_default.json'),   
	schema_simple: require('./schemas/schema_simple.json'),   
	schema_simple_2: require('./schemas/schema_simple_2.json'),  
	schema_timesheets: require('./schemas/schema_timesheets.json'),

	schema_caldav_settings: require('./schemas/schema_caldav_settings.json'),
	schema_caldav_new: require('./schemas/schema_caldav_new.json'),
	schema_caldav_existing: require('./schemas/schema_caldav_existing.json'),
	schema_caldav_calendar: require('./schemas/schema_caldav_calendar.json'),

	schema_context: require('./schemas/schema_context.json'),
	schema_client: require('./schemas/schema_client.json'),

	schema_wtd_hobby: require('./schemas/schema_wtd_hobby.json'),

	schema_ge002: require('./schemas/schema_ge002.json'),
	schema_ge002_bulk: require('./schemas/schema_ge002_bulk.json'),

	mode: { reference : "schemas", mode_type : "schemas", items : [] },
	schemas: [],
	schemasByRef: {},

	initHardCoded(){
		if(this.init) return;
		var schemasRefs = [];
		for(var prop in this){
			if(prop.startsWith("schema_") ) schemasRefs.push(prop);
		}
		for(var i=0;i<schemasRefs.length;i++){
			// array of schemas
			this.schemas.push(this[schemasRefs[i]]);
			// object with all schemas by reference as properties
			this.schemasByRef[schemasRefs[i]] = this[schemasRefs[i]];
		} 
		// mode with items containing all schemas
		this.mode.items.push(...this.schemas);
		this.init = true;
	},

	getMode(){
		return this.mode;
	},

	getSchemaByRef(ref){
		this.initHardCoded();
		if(this.schemasByRef.hasOwnProperty(ref)){
			return this.schemasByRef[ref];
		}
		return null;
	},


	checkModeAndSchema(mode){
		if(mode && mode.schemas && mode.schemas.length>0) return true;
		console.log("checkModeAndSchema : NO MODE OR SCHEMA")
		return false;
	},

	// VALIDATION
	hasFieldName(mode,fieldname){
		if(!this.checkModeAndSchema(mode)) return false;
		if(mode && mode.schemas && mode.schemas.length>0) return true;
		return mode.schemas[0].properties.hasOwnProperty(fieldname)
	},

	// RETRIEVEAL
    getFieldIdentity(mode){
    	if(!this.checkModeAndSchema(mode)) return null;
    	if(mode.hasOwnProperty('schemas') && mode.schemas.length>0 && mode.schemas[0] && mode.schemas[0].hasOwnProperty(fIdent)) return mode.schemas[0][fIdent];
    	//default ... try id
    	if(this.hasFieldName(mode,'id')) return 'id';
    	return null;
    },
    getFieldListCellTitle(mode){
    	if(!this.checkModeAndSchema(mode)) return null;
    	if(mode.schemas[0].hasOwnProperty(fListCellTitle)) return mode.schemas[0][fListCellTitle];
    	//default ... try title
    	if(this.hasFieldName(mode,'title')) return 'title';
    	return null;
    }


}