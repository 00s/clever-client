var myApp = angular.module('clever', ['ezfb']);

myApp.config(['ezfbProvider', function (ezfbProvider) {
  ezfbProvider
  .setInitParams({
    appId: '737410249733152',
  });
}]);

myApp.controller('LoginCtrl', function(ezfb, $scope){
	
  $scope.login = function ($scope) {
    ezfb.login(function (response)
			   {scope: 'email'})
			   .then(function (response) {
					ezfb.api('/me', {fields: 'last_name'}, function(response) {
  						console.log(response);
					});
				});
  };
});
	