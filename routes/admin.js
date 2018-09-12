var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');

/*set up dates
var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
var lastSundayTimestamp = lastSunday.getTime();
*/

/* GET list of events/links that require approval. */
router.get('/', function(req, res, next) {
	res.render('adminLogin');
});

router.post('/', function(req, res, next) {
	if (req.body.adminPW == "njmelee") {
		locals.find( {active : false}).select('eventName').exec(function (err, pLoc) {
			if (err) return handleError(err);
			res.render('admin', {pendingLocals : pLoc});
		});
	}
});

module.exports = router;
