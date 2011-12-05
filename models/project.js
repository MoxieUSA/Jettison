var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
	name : String,
	
});

module.exports = mongoose.model('Project', ProjectSchema);