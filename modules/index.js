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


  /*

    Instanciação do Módulo

  */

  angular
    .module('clever', ['clever.login'])
    .controller('UserCtrl', exports.UserCtrl);

})();
