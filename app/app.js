'use strict';

var angular = require('angular');

angular.module('app', [
  require('angular-route'),
  require('angular-sanitize')
]).run(function($rootScope, $location, sessionService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.requireLogin && !sessionService.currentUser.isAuthenthicated) {
      $location.path('/signin');
      event.preventDefault();
    }
  });
});
