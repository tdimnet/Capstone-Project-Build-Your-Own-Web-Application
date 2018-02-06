'use strict';

function DataService($http) {

  this.getUser = function() {
    return $http.get('http://localhost:5000/user');
  };

  this.createUser = function(user) {
    return $http.post('http://localhost:5000/user', user);
  };

}

module.exports = DataService;
