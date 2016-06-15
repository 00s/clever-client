var myApp = angular.module('clever', ['ezfb']);

myApp.config(['ezfbProvider', function (ezfbProvider) {
  ezfbProvider
  .setInitParams({
    appId: '1521052684875334',
  });
}]);

myApp.controller('UserCtrl', function(ezfb, $scope, $http){
	
  $scope.loginorcreate = function ($scope, $http) {
    	ezfb.login(function (response){
			if (response.authResponse != undefined){
				localStorage.setItem("fb_access_token", response.authResponse.accessToken);
				localStorage.setItem("fb_user_id", response.authResponse.userID);
				localStorage.setItem("fb_expires_in", response.authResponse.expiresIn);
			}else{
				alert("Não é possível executar o login");
			}
		});
	  
	    if(window.localStorage.getItem("fb_access_token") != undefined){
			var fb_access_token = localStorage.getItem("fb_access_token");
			var string_fb_access_token = "AcessToken: " + fb_access_token;
			console.log(string_fb_access_token);
			//url = "http://cleverest.herokuapp.com/v1/loginorcreate";
			//var cleverResponse = $http.post(url, {user_access_tokena: fb_access_token});
			//console.log(cleverResponse);
			
		}else{
			console.log("Usuário não logado!")
		}
	  
  };
	
  $scope.loginorcreateteacher = function ($scope, $http) {
    	ezfb.login(function (response){
			if (response.authResponse != undefined){
				localStorage.setItem("authResponse", response.authResponse);
			}else{
				alert("Não é possível executar o login");
			}
		});
  };
	
	
});
			


