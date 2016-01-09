'use strict';
 
angular.module('miApp', [
  'ngRoute',
  'miApp.home',
  'miApp.register',
  'miApp.welcome',
  'miApp.addMateria',
  'miApp.addProfesor',
  'miApp.verProfesores',
  'miApp.AddHorarios'
]).
config(['$routeProvider', function($routeProvider) {
     $routeProvider.otherwise({
     	redirectTo: '/home'
     });
}]);