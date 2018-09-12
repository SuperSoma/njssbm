var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//set up database
mongoose.connect('mongodb://127.0.0.1/njssbm');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Schemas and Models
var Schema = mongoose.Schema;

var localSchema = new Schema({
	_id : Schema.Types.ObjectId,
	startDate : Number, //unix timestamp
	Frequency : Number, //weekly - 604800, bi-weekly 1209600
	eventName : String,
	startTime : String,
	events : [{game:String,time:String}],
	description : String
});

var locals = mongoose.model('Local', localSchema);

var eventSchema = new Schema({
	_id : Schema.Types.ObjectId,
	eventName : String,
	date : Date,
	pageLink : String
});

var socialSchema = new Schema({
	_id : Schema.Types.ObjectId,
	pageName : String,
	pageType : String,
	url : String
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
/*
app.get('/add', addRouter);
app.post('/add', addRouter);

app.get('/admin', adminRouter);
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
