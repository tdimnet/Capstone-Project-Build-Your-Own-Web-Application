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
    .when('/signup', {
      controller: 'SignUpController',
      controllerAs: 'vm',
      templateUrl: 'templates/sign-up.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}

module.exports = config;
