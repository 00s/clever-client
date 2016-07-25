(function () {
  var exports = {};

  var Router = function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          navbar: {
            templateUrl: 'views/navbar.html'
          },
          form: {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
          },
          main: {
            templateUrl: 'views/landing.html'
          }
        }
      })
      .state('search', {
        url: '/search?price_start&price_end&discipline&location&schedules',
        views: {
          navbar: {
            templateUrl: 'views/navbar.html'
          },
          form: {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
          },
          main: {
            templateUrl: 'views/result.html',
            controller: 'ResultCtrl'
          }
        }
      });
  };

  exports.Router = ['$stateProvider', '$urlRouterProvider', Router];

  angular
    .module('clever.config', ['ui.router'])
    .config(exports.Router);

})();
