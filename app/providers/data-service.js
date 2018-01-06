'use strict';

function DataService($http) {

  this.getUser = function() {
    return $http.get('/api/user');
  };

  this.createUser = function(user) {
    return $http.post('/api/user', user);
  };

}

module.exports = DataService;
