var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var model = require('./db/models');

var schedule = require('./utils/schedule');

var app = express();

// mongoose config
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qbase_cron');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = mongoose;
		req.model = require('./db/models');
		req.config = require('./config');
		req.scheduleManager = schedule.Manager
    next();
});

var routes = require('./routes/index');
var users = require('./routes/users');
var tokens = require('./routes/v0.1.0/tokens');
var tasks = require('./routes/v0.1.0/tasks');


app.use('/', routes);
app.use('/users', users);

app.use('/api/v0.1.0/tokens', tokens);
app.use('/api/v0.1.0/tasks', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
