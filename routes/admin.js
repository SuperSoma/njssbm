var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');
var events = require('../models/eventModel.js');
var social = require('../models/socialModel.js');

/*set up dates
var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
var lastSundayTimestamp = lastSunday.getTime();
*/

const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getMonth(month) {
	return monthNames[month];
}

function getDay(d) {
	return dayOfWeek[d];
}

function renderAdminPage(req, res, next) {
	locals.find( ).exec(function (err, locs) {
			events.find({
				$where : function() {
					return (this.date * 1000) >= (Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()))
				}
			}).exec(function(err, evs) {
				social.find().exec(function(err, soc) {
					if (err) console.log(err);
					var args = {
						aLocals : [],
						pLocals : [],
						aEvents : [],
						pEvents : [],
						aSocial : [],
						pSocial : []
					};
					for(var i=0;i < locs.length; i++) {
						locs[i].dayOfWeek = getDay(new Date(locs[i].startDate * 1000).getUTCDay());
						if(locs[i].active == false) {
							args.pLocals.push(locs[i]);
						} else {
							args.aLocals.push(locs[i]);
						}
					}
					for(var i=0;i < evs.length; i++) {
						evs[i].eventDay = getDay(new Date(evs[i].date * 1000).getUTCDay()) + ", " + getMonth(new Date(evs[i].date * 1000).getUTCMonth()) + " " + new Date(evs[i].date * 1000).getUTCDate() + ", " + new Date(evs[i].date * 1000).getUTCFullYear();
						if(evs[i].active == false) {
							args.pEvents.push(evs[i]);
						} else {
							args.aEvents.push(evs[i]);
						}
					}
					for(var i=0;i < soc.length; i++) {
						if(soc[i].active == false) {
							args.pSocial.push(soc[i]);
						} else {
							args.aSocial.push(soc[i]);
						}
					}
					
					res.render('admin', args);
				});
			})
		});
}

/* GET list of events/links that require approval. */
router.get('/', function(req, res, next) {
	res.render('adminLogin');
});

router.post('/', function(req, res, next) {
	if (req.body.adminPW == "njmelee" && typeof(req.body.updateStuff) == "undefined") {
		renderAdminPage(req, res, next);
	} else if (req.body.adminPW == "njmelee" && typeof(req.body.updateStuff) != "undefined") {
		console.log(req.body);
		
		for (var key in req.body.local) {
			console.log(req.body.local[key]);
		
			switch(req.body.local[key]) {
				case 'approve':
				locals.update({"_id" : key}, {active: true}, {}, function(err,doc) {if (err) {console.log(err)}});
				break;
				
				case 'deactivate':
				locals.update({"_id" : key}, {active: false}, {}, function(err,doc) {if (err) {console.log(err)}});
				break;
				
				case 'delete':
				locals.remove({"_id" : key}, function(err,doc) {if (err) {console.log(err)}});
				break;
			}
		}
		
		for (var key in req.body.event) {
			switch(req.body.event[key]) {
				case 'approve':
				events.update({"_id" : key}, {active: true}, {},function(err,doc) {if (err) {console.log(err)}});
				break;
				
				case 'deactivate':
				events.update({"_id" : key}, {active: false}, {}, function(err,doc) {if (err) {console.log(err)}});
				break;
								
				case 'delete':
				events.remove({"_id" : key}, function(err,doc) {if (err) {console.log(err)}});
				break;
			}
		}
		
		for (var key in req.body.social) {
			switch(req.body.social[key]) {
				case 'approve':
				social.update({"_id" : key}, {active: true}, {},function(err,doc) {if (err) {console.log(err)}});
				break;
				
				case 'delete':
				social.remove({"_id" : key}, function(err,doc) {if (err) {console.log(err)}});
				break;
			}
		}
		
		renderAdminPage(req, res, next);
	} else {
		res.render('adminLogin');
	}
});

router.put('/', function(req, res, next) {
		if (req.body.adminPW == "njmelee") {
			console.log(req.body);
			
			renderAdminPage(req, res, next);
		} else {
			res.render('adminLogin');			
		}
});

module.exports = router;
