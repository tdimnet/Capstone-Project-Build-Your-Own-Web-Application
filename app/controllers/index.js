'use strict';

var angular   = require('angular');
var app       = angular.module('app');

app.controller('MainController', require('./main-controller'));
app.controller('SignInController', require('./sign-in'));
app.controller('SignUpController', require('./sign-in'));
