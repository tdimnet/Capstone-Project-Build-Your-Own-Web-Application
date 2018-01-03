(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller : 'MainController',
        controllerAs : 'vm',
        templateUrl : 'templates/home.html'
      })
      .otherwise({
        redirectTo : '/'
      });
  }
})();
