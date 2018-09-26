var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');
var events = require('../models/eventModel.js');
var social = require('../models/socialModel.js');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDayOfWeek(day) {
	return weekDays[day];
}

function getMonth(month) {
	return monthNames[month];
}


/* GET home page. */
router.get('/', function(req, res, next) {
	
	locals.getLocals(function (err, pLoc) {
		if (err) return console.log(err);
		var darts = [];
		locs = [];
		for (var i=0; i < 7; i++) {
			darts.push(Math.abs(Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + i)));
			var d = new Date(darts[i])
			locs.push({date : getDayOfWeek(d.getUTCDay()) + ", " + getMonth(d.getUTCMonth()) + " " + d.getUTCDate(), evs : []});
		}
		//console.log(locs);
		for (var i=0;i < pLoc.length;i++) {
			for (var j=0;j < darts.length;j++) {
				if (((darts[j] /1000) - pLoc[i].startDate) % pLoc[i].frequency == 0) break;
			}
			//console.log(j);
			locs[j].evs.push(pLoc[i]);
		}
		
		events.getEvents(function(err2, eventos) {
			if (err2) return console.log(err2);
			
			for (var i=0;i < eventos.length;i++) {
				var d = new Date(eventos[i].date * 1000)
				eventos[i].eventDate = getDayOfWeek(d.getUTCDay()) + ", " + getMonth(d.getUTCMonth()) + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
			}
			
			social.find({active:true}, function(err3, socs) {
				if (err3) return console.log(err3);
				
				//['Facebook', 'Twitter', 'Instagram', 'Twitch', 'Mixer', 'YouTube']
				var yt = [], tw = [], inst = [], mxr = [], fb = [], twtc = [];
				for (var i=0; i < socs.length; i++) {
					switch (socs[i].pageType) {
						case "Facebook":
						fb.push(socs[i]);
						break;
						case "Twitter":
						tw.push(socs[i]);
						break;
						case "Instagram":
						inst.push(socs[i]);
						break;
						case "Twitch":
						twtc.push(socs[i]);
						break;
						case "Mixer":
						mxr.push(socs[i]);
						break;
						case "YouTube":
						yt.push(socs[i]);
						break;
					}
				}
							
				res.render('index', {beans : locs, evos : eventos, youtube : yt, twitter : tw, instagram : inst, twitch : twtc, mixer : mxr, facebook : fb});
			});
		});
	});
});

module.exports = router;
