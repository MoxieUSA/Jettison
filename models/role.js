var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var RoleSchema = new Schema({
	name : String,
	type : String,
	groupDN : String
});

module.exports = mongoose.model('Role', RoleSchema);