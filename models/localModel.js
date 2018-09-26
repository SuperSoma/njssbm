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

localSchema.statics.getLocals = function(cb) {
	return this.find({active : true,
		$where : function() {
			var darts = [];
			for (var i=0; i < 7; i++) {
				darts.push(Math.abs(Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + i)));
			}
			var a = ((((darts[0]  / 1000)- this.startDate) % this.frequency == 0)) && ((darts[0]  / 1000) >= this.startDate);
			var b = ((((darts[1]  / 1000)- this.startDate) % this.frequency == 0)) && ((darts[1]  / 1000) >= this.startDate);
			var c = ((((darts[2] / 1000) - this.startDate) % this.frequency == 0)) && ((darts[2]  / 1000) >= this.startDate);
			var d = ((((darts[3] / 1000)- this.startDate)  % this.frequency == 0)) && ((darts[3]  / 1000) >= this.startDate);
			var e = ((((darts[4]  / 1000)- this.startDate) % this.frequency == 0)) && ((darts[4]  / 1000) >= this.startDate);
			var f = ((((darts[5] / 1000) - this.startDate) % this.frequency == 0)) && ((darts[5]  / 1000) >= this.startDate);
			var g = ((((darts[6]  / 1000) - this.startDate)% this.frequency == 0)) && ((darts[6]  / 1000) >= this.startDate);
			return a || b || c || d || e || f || g;
		}
	},cb)
}

module.exports = mongoose.model('Local', localSchema);