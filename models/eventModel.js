//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	eventName : String,
	date : Number,
	pageLink : String,
	//time : String,
	//events : [{game:String,time:String}],
	description : String,
	active : {type:Boolean, default : false}
});

eventSchema.statics.getEvents = function(cb) {
	return this.find(
		{
			active : true, 
			$where : function() {
				var today = Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()) / 1000;
				return today <= this.date;
			}
},null, {sort : { date : 1 }}, cb);
}

module.exports = mongoose.model('Event', eventSchema);