var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	locals.find( {active : true}).select('eventName').exec(function (err, pLoc) {
		if (err) return handleError(err);
		res.render('admin', {locals : pLoc});
	});
});

module.exports = router;
