'use strict';

var angular   = require('angular');
var app       = angular.module('app');

app.service('sessionService', require('./session'));
