(function () {
  var exports = {};

  var Router = function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('search', {
        url: '/',
        views: {
          form: {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
          },
          result: {
            templateUrl: 'views/result.html',
            controller: 'ResultCtrl'
          },
          home: {
            templateUrl: 'views/landing.html'
          },
          navbar: {
            templateUrl: 'views/navbar.html',
            controller: 'UserCtrl'
          }
        }
      });
  };

  exports.Router = ['$stateProvider', '$urlRouterProvider', Router];

  angular
    .module('clever.config', ['ui.router'])
    .config(exports.Router);

})();
