'use strict';

(function () {
  var exports = {};

  /*

  */
  var UserCtrl = function ($scope, LoginFactory) {
    $scope.loginorcreate = function () {
      LoginFactory
        .login()
        .then(function (res) {
          console.log(res);
        });
    };
  };

  exports.UserCtrl = ['$scope', 'LoginFactory', UserCtrl];

  var SearchCtrl = function ($scope) {
    $scope.lowerPrice = 50;
    $scope.upperPrice = 90;

    $scope.datePicker = {
      m: [false, false, false, false, false],
      t: [false, false, false, false, false],
      n: [false, false, false, false, false]
    };

    $scope.buscar = function () {
      var $form = $('#formScreen');
      var $result = $('#resultScreen');

      console.log($result.css('display'));

      if($result.css('display') == 'none'){
        $form.addClass('slideOutLeft');
        $form.css('display', 'none');

        $result.css('display', 'block');
        $result.addClass('slideInRight');
      }
    };
  };

  exports.SearchCtrl = ["$scope", SearchCtrl];

  /*

  */

  var ResultCtrl = function ($scope) {
    $scope.datePicker = {
      m: [false, true, false, true, false],
      t: [false, false, false, false, false],
      n: [false, false, false, false, false]
    };

    $scope.teachers = [
      {
        nome: 'Nirvana Dantas',
        materia: 'Matemática',
        desc: 'Eu sou uma péssima professora! Posso estragar o futuro do seu filho?',
        img: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10685559_764307550308157_743760048530199555_n.jpg?oh=a4aa2436a60d01565b1e85e5b27dec31&oe=57F7D27D&__gda__=1475139136_ab977c0fff1fc8c8c734aa731daf6275',
        valor: 150
      },
      {
        nome: 'Daniel Bastos',
        materia: 'Matemática',
        desc: 'An Ugly Myspace Profile Will Sure Ruin Your Reputation An Ugly Myspace Profile Will Sure Ruin Your Reputation',
        img: 'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/13001103_1119760978082535_6893232842262746209_n.jpg?oh=59f0060bf101fb371d9005b1432aa1c3&oe=57F7FB90',
        valor: 80
      },
      {
        nome: 'Pedro Arthur',
        materia: 'Física',
        desc: 'Método de ensino inovador! Palmatórias de última geração! Mande inbox.',
        img: 'https://scontent-gru2-1.xx.fbcdn.net/t31.0-8/13246344_1004346659679696_1484908967915763442_o.jpg',
        valor: 50
      },
      {
        nome: 'Adolfo Mello',
        materia: 'Física',
        desc: 'Método de ensino inovador! Palmatórias de última geração! Mande inbox.',
        img: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfa1/t31.0-8/12888627_817544588352023_5616328719886418799_o.jpg',
        valor: 30
      }
    ];

    var cardWidth = 300, cardPadding = 20;
    var cardSize = cardWidth + cardPadding * 2;

    $(document).ready(function () {
      var $row = $('.row').first();
      cardCount = Math.floor($row.width() / cardSize);

      $('.ui.clever.card .more').click(function () {
        $this = $(this);
        $card = $this.closest('.card');

        if($card.hasClass('expanded')){
          $card.removeClass('expanded');
          $this.html('Ver mais');
        } else {
          $card.addClass('expanded');
          $this.html('Ver menos');
        }
      });
    });
  }

  exports.ResultCtrl = ['$scope', ResultCtrl];

  /*

    Instanciação do Módulo

  */

  angular
    .module('clever', [
                        'clever.login', 'clever.config',
                        'clever.directives'
                      ])
    .controller('UserCtrl', exports.UserCtrl)
    .controller('SearchCtrl', exports.SearchCtrl)
    .controller('ResultCtrl', exports.ResultCtrl);

})();
