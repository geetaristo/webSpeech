'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
        $scope.current = 0;
        $scope.max = 4;  

        $scope.nextTemplate = function () {
              return templateProvider(1);
          }();

        $scope.advanceform = function () {

        }

    
  }])
  