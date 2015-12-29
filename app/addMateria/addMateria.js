'use strict';
 
angular.module('miApp.addMateria', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addMateria', {
        templateUrl: 'addMateria/addMateria.html',
        controller: 'AddMateriaCtrl'
    });
}])
 
.controller('AddMateriaCtrl', ['$scope','$firebaseArray','CommonProp','$location', function($scope,$firebaseArray,CommonProp,$location) {
	if(!CommonProp.getUser()){
		$location.path('/home');
	}
	$scope.AgregarMateria=function(){
		var titulo=$scope.materia.titulo;
		var descripcion=$scope.materia.descripcion;
		var email=CommonProp.getUser();
		var ref = new Firebase("https://tutsplusangular.firebaseio.com/Materias");
		var fb = $firebaseArray(ref);
		fb.$add({
			titulo:titulo,
			descripcion:descripcion,
			email:email,
			'.priority': email
		}).then(function(ref){
			console.log(ref);
			toastr.success('Se agregó la materia');
			$location.path("/welcome");
		},function(error){
			console.log(error);
			toastr.error('Ha ocurrido un error. Intente nuevamente');
		});
	};
	$scope.logout = function(){
	    CommonProp.logoutUser();
	};
}]);