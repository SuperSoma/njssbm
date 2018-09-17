var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var locals = require('../models/localModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	locals.getLocals(function (err, pLoc) {
		if (err) return console.log(err);
		console.log(pLoc);
		res.render('index', {beans : pLoc});
	});
});

module.exports = router;
