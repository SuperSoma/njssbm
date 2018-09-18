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
	if (req.body.type == "local") {
		var d = new Date(req.body.startDate).getTime();
		var unixDateTime =Math.round(d / 1000)
		var fr = req.body.frequency == "weekly" ? 604800 : 1209600;
		locals.create({
			eventName : req.body.eventName,
			frequency : fr,
			startDate : unixDateTime,
			description : req.body.description
		});
	} else if(req.body.type == "event") {
		var d = new Date(req.body.startDate).getTime();
		var unixDateTime =Math.round(d / 1000);
		locals.create({
			eventName : req.body.eventName,
			startDate : unixDateTime,
			pageLink : req.body.page,
			description : req.body.description
		});
	} else if(req.body.type == "social") {
		social.create({
			pageName : req.body.pageName,
			pageType : req.body.frequency,
			url : req.body.page
		});
	}
  res.render('add', {eventAdded : req.body.type, eventName : req.body.eventName, date : req.body.startDate } );
});

module.exports = router;
