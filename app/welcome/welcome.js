'use strict';
 
angular.module('miApp.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
 
.controller('WelcomeCtrl', ['$scope','CommonProp','$firebase', function($scope,CommonProp,$firebase) {
	$scope.username = CommonProp.getUser();
	var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Materias");
	var sync=$firebase(firebaseObj);
	$scope.materias=sync.$asArray();
}]);