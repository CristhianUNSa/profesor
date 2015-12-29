'use strict';
 
angular.module('miApp.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
 
.controller('WelcomeCtrl', ['$scope','CommonProp','$firebase', function($scope,CommonProp,$firebase) {
	debugger;
	$scope.username = CommonProp.getUser();
	var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Materias");
	var sync=$firebase(firebaseObj);
	$scope.materias=sync.$asArray();
	$scope.editarMateria=function(id){
		debugger;
		var firebaseObj=new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+id);
		var sync=$firebase(firebaseObj);
		$scope.materiaUpdate=sync.$asObject();
		$("#editModal").modal();
	};
	$scope.update=function(){
		var fb=new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+$scope.materiaUpdate.$id);
		var materia=$firebase(fb);
		materia.$update({
			titulo: $scope.materiaUpdate.titulo,
			descripcion: $scope.materiaUpdate.descripcion,
			email: $scope.materiaUpdate.email
		}).then(function(ref){
			$('#editModal').modal('hide');
			toastr.success('Se guardó la materia con éxito');
		},function(error){
			console.log(error);
		});
	};
	$scope.confirmarBorrado=function(id){
		var fb= new Firebase("https://tutsplusangular.firebaseio.com/Materias/"+id);
		var materia=$firebase(fb);
		$scope.materiaABorrar=materia.$asObject();
		$('#deleteModal').modal();
	};
	$scope.borrarMateria = function() {
        var fb = new Firebase("https://tutsplusangular.firebaseio.com/Materias/" + $scope.materiaABorrar.$id);
        var materia = $firebase(fb);
        materia.$remove().then(function(ref) {
        	toastr.success('Se eliminó la materia con éxito');
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
            toastr.error('Hubo un problema en su solicitud');
        });
    }
}]);