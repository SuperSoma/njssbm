//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	eventName : String,
	date : Date,
	pageLink : String,
	//time : String,
	//events : [{game:String,time:String}],
	description : String,
	active : {type:Boolean, default : false}
});

module.exports = mongoose.model('Event', eventSchema);