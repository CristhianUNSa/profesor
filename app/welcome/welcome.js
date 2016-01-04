'use strict';
 
angular.module('miApp.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
 
.controller('WelcomeCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$location', function($scope,CommonProp,$firebaseArray,$firebaseObject,$location) {
	$scope.username = CommonProp.getUser();
	if(!$scope.username){
	    $location.path('/home');
	}
	var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Materias");
	$scope.materias=$firebaseArray(firebaseObj);
	$scope.editarMateria=function(id){
		var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+id);
		$scope.materiaUpdate=$firebaseObject(firebaseObj);
		$("#editModal").modal();
	};
	$scope.update=function(){
		var fb=new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+$scope.materiaUpdate.$id);
		var materia=$firebaseObject(fb);
		materia.titulo=$scope.materiaUpdate.titulo;
		materia.descripcion=$scope.materiaUpdate.descripcion;
		materia.email=$scope.materiaUpdate.email;
		materia.$save().then(function(ref){
			$('#editModal').modal('hide');
			toastr.success('Se guardó la materia con éxito');
		},function(error){
			console.log(error);
		});
	};
	$scope.confirmarBorrado=function(id){
		var fb= new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+id);
		$scope.materiaABorrar=$firebaseObject(fb);
		$('#deleteModal').modal();
	};
	$scope.borrarMateria = function() {
        var fb = new Firebase("https://tutsplusangular.firebaseio.com/Materias/" + $scope.materiaABorrar.$id);
        fb.remove(function(error) {
        	if(error){
        		console.log("Error:", error);
            	toastr.error('Hubo un problema en su solicitud');
        	}  else{
        		toastr.success('Se eliminó la materia con éxito');
            	$('#deleteModal').modal('hide');
        	}
        });
    };
    $scope.logout = function(){
	    CommonProp.logoutUser();
	};
}]);