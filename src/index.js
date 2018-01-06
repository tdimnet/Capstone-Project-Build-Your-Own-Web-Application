'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var user = require('./routes/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/capstone-project');
var db = mongoose.connection

// handling mongo error
db.on('error', function(err) {
  console.error('connection error', err);
});

db.on('connected', function() {
    console.log('MongoDB: successfully connected');
});

db.on('disconnected', function() {
    console.log('MongoDB: disconnected');
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
var port = process.env.PORT || 5000;

app.use('/', express.static('public'));
app.use('/api/user', user);

// vendor scripts
app.get(
  '/vendor/angular.js',
  function(req, res) {
    res.sendFile(path.join(__dirname, '../node_modules', 'angular', 'angular.js'));
  }
);

app.get(
  '/vendor/angular-route.js',
  function(req, res) {
    res.sendFile(path.join(__dirname, '../node_modules', 'angular-route', 'angular-route.js'));
  }
);

app.listen(port);
console.log('Magic is happening on port ' + port);
