'use strict';
 
angular.module('miApp.verProfesores', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/verProfesores', {
        templateUrl: 'verProfesores/verProfesores.html',
        controller: 'VerProfesoresCtrl'
    });
}])
 
.controller('VerProfesoresCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$location', function($scope,CommonProp,$firebaseArray,$firebaseObject,$location) {
	$scope.username = CommonProp.getUser();
	if(!$scope.username){
	    $location.path('/home');
	}
	var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Profesores");
	$scope.profesores=$firebaseArray(firebaseObj);
	$scope.editarProfesor=function(id){
		var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Profesores/"+id);
		$scope.profesorUpdate=$firebaseObject(firebaseObj);
		$("#editModal").modal();
	};
	$scope.update=function(){
		var fb=new Firebase("https://tutsplusangular.firebaseio.com/Profesores/"+$scope.profesorUpdate.$id);
		var profesor=$firebaseObject(fb);
		profesor.nombre=$scope.profesorUpdate.nombre;
		profesor.apellido=$scope.profesorUpdate.apellido;
		profesor.email=$scope.profesorUpdate.email;
		profesor.$save().then(function(ref){
			$('#editModal').modal('hide');
			toastr.success('Se guardó el profesor con éxito');
		},function(error){
			console.log(error);
		});
	};
	$scope.confirmarBorrado=function(id){
		var fb= new Firebase("https://tutsplusangular.firebaseio.com/Profesores/"+id);
		$scope.profesorABorrar=$firebaseObject(fb);
		$('#deleteModal').modal();
	};
	$scope.borrarProfesor = function() {
        var fb = new Firebase("https://tutsplusangular.firebaseio.com/Profesores/" + $scope.profesorABorrar.$id);
        fb.remove(function(error) {
        	if(error){
        		console.log("Error:", error);
            	toastr.error('Hubo un problema en su solicitud');
        	}  else{
        		toastr.success('Se eliminó el profesor con éxito');
            	$('#deleteModal').modal('hide');
        	}
        });
    };
    $scope.logout = function(){
	    CommonProp.logoutUser();
	};
}]);