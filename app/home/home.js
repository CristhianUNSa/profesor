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
    var login = {};
    $scope.login=login;
	var firebaseObj = new Firebase("https://tutsplusangular.firebaseio.com"); 
 	var loginObj = $firebaseAuth(firebaseObj);
 	$scope.SignIn = function(event){
 		debugger;
 		event.preventDefault();
        login.loading = true;
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
            login.loading = false;
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
            toastr.error('Ha proporcionado datos incorrectos');
            login.loading = false;
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
})
.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);