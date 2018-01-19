'use strict';

var angular   = require('angular');
var app       = angular.module('app');

app.service('dataService', require('./data'));
app.service('authService', require('./auth'));
app.service('errorHandlerService', require('./error-handler'));
app.service('sessionService', require('./session'));
app.service('validationService', require('./validation'));
app.service('toastService', require('./toast'));
