//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var socialSchema = new Schema({
	_id : Schema.Types.ObjectId,
	pageName : String,
	pageType : {type:String, 'enum' : ['Facebook', 'Twitter', 'Twitch', 'Mixer', 'YouTube']},
	url : String,
	active : {type:Boolean, default : false}
});

module.exports = mongoose.model('Social', socialSchema);