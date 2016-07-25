'use strict';

(function () {
  // Objeto para facilitar a exportação dos módulos
  var exports = {};

  var SearchCtrl = function ($scope, $state, $stateParams) {
    $scope.price_start = $stateParams.price_start || 50;
    $scope.price_end = $stateParams.price_end || 90;

    $scope.discipline = $stateParams.discipline;
    $scope.location = $stateParams.location;

    $scope.datePicker = [
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false
    ];

    $scope.buscar = function () {
      var schedules = [];

      $scope.datePicker.forEach(function (val, index) {
        if(val){
          schedules.push(index);
        }
      });

      $state.go('search', {
        price_end: $scope.price_end,
        price_start: $scope.price_start,
        discipline: $scope.discipline,
        location: $scope.location,
        schedules: schedules.join(',')
      });
    };
  };

  exports.SearchCtrl = ["$scope", "$state", '$stateParams', SearchCtrl];


  // SearchFactory

  var SearchFactory = function ($http) {
    var url = "http://cleverest.herokuapp.com/v1/searchteacher";
    search = {};

    search.buscar = function (query) {
      return $http
        .post(url, query);
    };

    return search;
  };

  exports.SearchFactory = ['$http', SearchFactory];


  // ResultCtrl

  var ResultCtrl = function ($scope, $stateParams, SearchFactory) {
    $scope.datePicker = {
      m: [false, true, false, true, false],
      t: [false, false, false, false, false],
      n: [false, false, false, false, false]
    };

    $scope.buscar = function () {
      SearchFactory
        .buscar({
          price_end: $stateParams.price_end,
          price_start: $stateParams.price_start,
          discipline: $stateParams.discipline,
          location: $stateParams.location,
          schedules: $stateParams.schedules
        })
        .then(function (data) {
          $scope.teachers = data.data;
        });
    };

    $scope.$on('$stateChangeSuccess', function (event, toState) {
      $scope.buscar();
    });
  }

  exports.ResultCtrl = ['$scope', '$stateParams', 'SearchFactory', ResultCtrl];

  // Instanciação do Módulo

  angular
    .module('clever.search', [])
    .factory('SearchFactory', exports.SearchFactory)
    .controller('SearchCtrl', exports.SearchCtrl)
    .controller('ResultCtrl', exports.ResultCtrl);

})();
