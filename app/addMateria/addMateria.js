'use strict';
 
angular.module('miApp.addMateria', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addMateria', {
        templateUrl: 'addMateria/addMateria.html',
        controller: 'AddMateriaCtrl'
    });
}])
 
.controller('AddMateriaCtrl', ['$scope','$firebase','CommonProp','$location', function($scope,$firebase,CommonProp,$location) {
	debugger;
	
	$scope.AgregarMateria=function(){
		debugger;
		var titulo=$scope.materia.titulo;
		var descripcion=$scope.materia.descripcion;
		var email=CommonProp.getUser();
		var firebaseObj = new Firebase("https://tutsplusangular.firebaseio.com/Materias");
		var fb = $firebase(firebaseObj);
		fb.$push({
			titulo:titulo,
			descripcion:descripcion,
			email:email
		}).then(function(ref){
			console.log(ref);
			toastr.success('Se agregó la materia');
			$location.path("/welcome");
		},function(error){
			console.log(error);
		});
	}
}]);