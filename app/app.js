'use strict';
 
angular.module('miApp', [
  'ngRoute',
  'miApp.home'
]).
config(['$routeProvider', function($routeProvider) {
     $routeProvider.otherwise({
     	redirectTo: '/home'
     });
}]);