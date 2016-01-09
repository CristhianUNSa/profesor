'use strict';
 
angular.module('miApp.AddHorarios', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/AddHorarios', {
        templateUrl: 'addHorario/AddHorarios.html',
        controller: 'AddHorariosCtrl'
    });
}])
 
.controller('AddHorariosCtrl', ['$scope','$firebaseArray','CommonProp','$location', function($scope,$firebaseArray,CommonProp,$location) {
	var refProfesores=new Firebase("https://tutsplusangular.firebaseio.com/Profesores");
	var refMaterias=new Firebase("https://tutsplusangular.firebaseio.com/Materias");
	$scope.profesores=$firebaseArray(refProfesores);
	$scope.materias=$firebaseArray(refMaterias);
	if(!CommonProp.getUser()){
		$location.path('/home');
	}
	$scope.AgregarHorarios=function(){
		var dia=$scope.horario.dia;
		var horaDesde=$scope.horario.horaDesde;
		var horaHasta=$scope.horario.horaHasta;
		var idMateria=$scope.horario.idMateria;
		var idProfesor=$scope.horario.idProfesor;
		var ref = new Firebase("https://tutsplusangular.firebaseio.com/Horarios");
		var fb = $firebaseArray(ref);
		fb.$add({
			dia:dia,
			horaDesde:horaDesde,
			horaHasta:horaHasta,
			idMateria:idMateria,
			idProfesor:idProfesor,
		}).then(function(ref){
			console.log(ref);
			toastr.success('Se agregó el horario');
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