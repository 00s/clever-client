'use strict';

(function () {
  // Objeto para facilitar a exportação dos módulos
  var exports = {};

  /*
      Função que configura os dados relativos à integração com
      o Facebook
  */
  var ezfb = function (ezfbProvider) {
    ezfbProvider.setInitParams({
      appId: '1521052684875334',
    });
  };

  exports.ezfb = ['ezfbProvider', ezfb];

  /*
    Factory responsável pelo workflow de Login
    @factory
  */
  var LoginFactory = function (ezfb, $http, $q) {
    var factory = { fb: {}, clever: {} };

    /*
        Retorna o token do usuário no Face
    */
    factory.fb.token = function () {
      return ezfb
        .getLoginStatus()
        .then(function (res) {
          // Se o Usuário não estiver logado, peça pra ele logar
          if(res.status != 'connected'){
            return ezfb.login();
          }
          // Se ele estiver logado, ignore esse passo
          return $q.when(res);
        })
        .then(function (res) {
          // Retorna o Token
          return $q.when(res.authResponse.accessToken);
        });
    };

    /*
        Atualiza o token expirado do Clever
    */
    factory.clever.refresh = function () {
      var url = "http://cleverest.herokuapp.com/v1/refreshtoken";

      var refreshToken = localStorage.getItem('refreshToken');
      return $http
        .post(url)
        .then(function (res) {
          var timeNow = Date.now().getMilliseconds();

          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('refreshToken', res.data.refresh_token);
          localStorage.setItem('expireTime', timeNow + res.data.expires_in);

          return $q.when(res);
        });
    };

    /*
        Retorna o token do usuário no Clever
    */
    factory.clever.token = function (tokenFB) {
      var url = "http://cleverest.herokuapp.com/v1/loginorcreate";

      return $http
        .post(url, {user_access_token: tokenFB})
        .then(function (res) {

          var timeNow = Date.now()  ;

          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('refreshToken', res.data.refresh_token);
          localStorage.setItem('expireTime', timeNow + res.data.expires_in);

          return $q.when(res);
        });
    };

    /*
      Helper function pra executar todo o flow de Login
      (não faz refresh)
    */
    factory.login = function () {
      return factory
        .fb.token()
        .then(function (fbToken) {
          return factory.clever.token(fbToken);
        });
    };

    factory.isLoggedIn = function () {
      var timeNow = Date.now();
      console.log(localStorage.getItem('expireTime'));
      return
        localStorage.getItem('accessToken') &&
        localStorage.getItem('expireTime') > timeNow;
    };

    return factory;
  };

  exports.LoginFactory = ['ezfb', '$http', '$q', LoginFactory];

  // Instanciação do Módulo

  angular
    .module('clever.login', ['ezfb'])
    .factory('LoginFactory', exports.LoginFactory)
    .config(exports.ezfb);

})();
