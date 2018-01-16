'use strict';

var angular   = require('angular');
var app       = angular.module('app');

app.service('authService', require('./auth'));
app.service('sessionService', require('./session'));
app.service('validationService', require('./validation'));
