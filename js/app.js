'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.keypress',    
  'ngRoute',
  'myApp.filters',
  'myApp.directives',
  'myApp.templates',    
  'myApp.controllers'   
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'view-port.html', controller: 'mainFormController'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
