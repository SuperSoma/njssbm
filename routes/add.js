var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');
var events = require('../models/eventModel.js');
var social = require('../models/socialModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('add');
});

router.post('/',function(req, res, next) {
	var name = ""
	if (req.body.type == "local") {
		var d = new Date(req.body.startDate).getTime();
		var unixDateTime =Math.round(d / 1000)
		var fr = req.body.frequency == "weekly" ? 604800 : 1209600;
		name = req.body.eventName;
		locals.create({
			eventName : req.body.eventName,
			frequency : fr,
			startDate : unixDateTime,
			description : req.body.description
		});
	} else if(req.body.type == "event") {
		var d = new Date(req.body.startDate).getTime();
		var unixDateTime =Math.round(d / 1000);
		name = req.body.eventName;
		events.create({
			eventName : req.body.eventName,
			date : unixDateTime,
			pageLink : req.body.page,
			description : req.body.description
		});
	} else if(req.body.type == "social") {
		name = req.body.pageName
		social.create({
			pageName : req.body.pageName,
			pageType : req.body.frequency,
			url : req.body.page
		});
	}
  res.render('add', {eventAdded : req.body.type, eventName : name, date : req.body.startDate } );
});

module.exports = router;
