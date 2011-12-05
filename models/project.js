var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Project = new Schema({
	name : String,
	
});

exports.Project = Project;