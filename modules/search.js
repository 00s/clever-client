'use strict';

(function () {
  // Objeto para facilitar a exportação dos módulos
  var exports = {};

  var SearchCtrl = function ($scope, $state, $stateParams) {
    $scope.price_start = $stateParams.price_start || 50;
    $scope.price_end = $stateParams.price_end || 90;

    $scope.discipline = $stateParams.discipline;
    $scope.location = $stateParams.location;

    $scope.datePicker = {
      data: [],
      has: function (pos) {
        return $scope.datePicker.data.indexOf(pos + '') != -1;
      },
      toggle: function (pos) {
        dataPicker = $scope.datePicker.data;
        var index = dataPicker.indexOf(pos + '');

        if(index == -1){
          dataPicker.push(pos + '');
        } else {
          dataPicker.splice(index, 1);
        }
      }
    };

    if($stateParams.schedules){
      $scope.datePicker.data = $stateParams.schedules.split(',');
    }

    $scope.buscar = function () {
      var schedules = $scope.datePicker.data.join(',');

      $state.go('search', {
        price_end: $scope.price_end,
        price_start: $scope.price_start,
        discipline: $scope.discipline,
        location: $scope.location,
        schedules: schedules
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
    // $scope.buscar = function () {
    //   SearchFactory
    //     .buscar({
    //       price_end: $stateParams.price_end,
    //       price_start: $stateParams.price_start,
    //       discipline: $stateParams.discipline,
    //       location: $stateParams.location,
    //       schedules: $stateParams.schedules
    //     })
    //     .then(function (data) {
    //       $scope.teachers = data.data;
    //     });
    // };
    //
    // $scope.$on('$stateChangeSuccess', function (event, toState) {
    //   $scope.buscar();
    // });

    $scope.teachers = [
      {
        fullname: 'Nirvana Dantas',
        discipline: 'Matemática',
        desc: 'Eu sou uma péssima professora! Posso estragar o futuro do seu filho?',
        profile_pic_url: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10685559_764307550308157_743760048530199555_n.jpg?oh=a4aa2436a60d01565b1e85e5b27dec31&oe=57F7D27D&__gda__=1475139136_ab977c0fff1fc8c8c734aa731daf6275',
        price: 150
      },
      {
        fullname: 'Daniel Bastos',
        discipline: 'Matemática',
        desc: 'An Ugly Myspace Profile Will Sure Ruin Your Reputation An Ugly Myspace Profile Will Sure Ruin Your Reputation',
        profile_pic_url: 'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/13001103_1119760978082535_6893232842262746209_n.jpg?oh=59f0060bf101fb371d9005b1432aa1c3&oe=57F7FB90',
        price: 80
      },
      {
        fullname: 'Pedro Arthur',
        discipline: 'Física',
        desc: 'Método de ensino inovador! Palmatórias de última geração! Mande inbox.',
        profile_pic_url: 'https://scontent-gru2-1.xx.fbcdn.net/t31.0-8/13246344_1004346659679696_1484908967915763442_o.jpg',
        price: 50
      },
      {
        fullname: 'Adolfo Mello',
        discipline: 'Física',
        desc: 'Método de ensino inovador! Palmatórias de última geração! Mande inbox.',
        profile_pic_url: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfa1/t31.0-8/12888627_817544588352023_5616328719886418799_o.jpg',
        price: 30
      }
    ];

    $('document').ready(function () {
      $('.ui.clever.card .more').on('click', function () {
        $more = $(this);
        $card = $more.closest('.card');

        if($card.hasClass('expanded')){
          $card.removeClass('expanded');
          $more.html('Ver mais');
        } else {
          $card.addClass('expanded');
          $more.html('Ver menos');
        }
      });
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
