'use strict';

function config($httpProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      controllerAs: 'vm',
      templateUrl : 'templates/main.html'
    })
    .when('/signin', {
      controller: 'SignInController',
      controllerAs: 'vm',
      templateUrl: 'templates/sign-in.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}

module.exports = config;
