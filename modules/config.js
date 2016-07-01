(function () {
  var exports = {};

  var Router = function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'UserCtrl'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'ResultCtrl'
      });
  };

  exports.Router = ['$stateProvider', '$urlRouterProvider', Router];

  angular
    .module('clever.config', ['ui.router'])
    .config(exports.Router);

})();
