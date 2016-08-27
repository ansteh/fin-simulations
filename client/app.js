var app = (function(angular) {

  var app = angular.module('app', ['ngMaterial']);

  app.factory('Request', function($http) {
    function get(url){
      return new Promise(function(resolve, reject){
        $http({ method: 'GET', url: url })
        .then(function (response) {
          resolve(response.data);
        }, function (err) {
          reject(err);
        });
      });
    };

    return {
      get: get
    };
  });

  return app;
}(angular));
