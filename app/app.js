'use strict';
 
angular.module('miApp', [
  'ngRoute',
  'miApp.home',
  'miApp.register',
  'miApp.welcome'
]).
config(['$routeProvider', function($routeProvider) {
     $routeProvider.otherwise({
     	redirectTo: '/home'
     });
}]);