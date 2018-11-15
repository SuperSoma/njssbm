//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var socialSchema = new Schema({
	pageName : String,
	pageType : {type:String, 'enum' : ['Facebook', 'Twitter', 'Instagram', 'Twitch', 'Mixer', 'YouTube', 'Discord']},
	url : String,
	active : {type:Boolean, default : false}
});

module.exports = mongoose.model('Social', socialSchema);