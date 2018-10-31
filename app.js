var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var env = process.env.NODE_ENV || 'dev';

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var addRouter = require('./routes/add');

var app = express();
var session = require('express-session');

//set up database
if (env == 'dev') {
	mongoose.connect('mongodb://nick:sc00terj@ds161322.mlab.com:61322/heroku_4vsk7dcm',{ useNewUrlParser: true });
	mongoose.Promise = global.Promise;
} else {
	mongoose.connect('mongodb://127.0.0.1:27017',{ useNewUrlParser: true });
	mongoose.Promise = global.Promise;	
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Model imports
var locals = require('./models/localModel.js');
var events = require('./models/eventModel.js');
var social = require('./models/socialModel.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
	secret : 'njsmash',
	resave : true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/add', addRouter);

//error
const handleError = function() {
    console.error(err);
    // handle your error
};

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
