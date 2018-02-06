'use strict';

var express     = require('express');

var user = require('./routes/user');


var jsonParser = require('body-parser').json;
var logger      = require('morgan');

var mongoose    = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(jsonParser());

app.use('/api/user', user);


//
  // Application setup
//
// set our port
app.set('port', process.env.PORT || 5000);


// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// mongoose to use standard promises
mongoose.Promise = global.Promise;



//
  // Database connection
//
mongoose
    .connect('mongodb://localhost:27017/capstone-project')
    .catch(function (err) {
        console.log('MongoDB: connection error');
    });
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('MongoDB: ' + err.message);
});

db.on('connected', function() {
    console.log('MongoDB: successfully connected');
});

db.on('disconnected', function() {
    console.log('MongoDB: disconnected');
});


//
  // Error handling
//
app.use(function (req, res, next) {
    var err = new Error('Document not found');
    err.status = 404;
    return next(err);
});

// global error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message || 'Something went wrong' });
});



//
  // Start the application server
//
var server = app.listen(app.get('port'), function () {
    console.log('Express: server listening on port ' + server.address().port);
});
