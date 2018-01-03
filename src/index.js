'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const user = require('./routes/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/capstone-project');
const db = mongoose.connection

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
const port = process.env.PORT || 3000;

app.use('/', express.static('public'));
app.use('/api/user', user);

// vendor scripts
app.get(
  '/vendor/angular.js',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules', 'angular', 'angular.js'));
  }
);

app.get(
  '/vendor/angular-route.js',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules', 'angular-route', 'angular-route.js'));
  }
);

app.listen(port);
console.log('Magic is happening on port ' + port);
