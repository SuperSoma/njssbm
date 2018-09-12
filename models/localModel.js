//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var localSchema = new Schema({
	//_id : Schema.Types.ObjectId,
	startDate : Number, //unix timestamp
	frequency : Number, //weekly - 604800, bi-weekly 1209600
	eventName : String,
	//startTime : String,
	//events : [{game:String,time:String}],
	description : String,
	active : {type:Boolean, default : false}
});

module.exports = mongoose.model('Local', localSchema);