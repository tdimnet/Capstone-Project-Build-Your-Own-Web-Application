'use strict';

function config($httpProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      // TODO: will have to change the name of the main controller
      controller: 'MainController',
      controllerAs: 'vm',
      templateUrl : 'templates/main.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}

module.exports = config;
