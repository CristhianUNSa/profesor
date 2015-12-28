'use strict';
 
angular.module('miApp.home', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
.controller('HomeCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
	var firebaseObj = new Firebase("https://tutsplusangular.firebaseio.com"); 
 	var loginObj = $firebaseAuth(firebaseObj);
 	$scope.SignIn = function(event){
 		debugger;
 		event.preventDefault();
 		var username= $scope.user.email;
 		var password= $scope.user.password;
 		
 		loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
            CommonProp.setUser(user.password.email);//user.password se llama porque usamos el metodo del password de Firebase
            $location.path('/welcome');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
        });
 	}
}])
.service('CommonProp', function() {//usado para mantener información de loggeo
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});