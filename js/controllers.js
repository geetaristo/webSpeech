'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
       
         $scope.templates=  {
                    "1":"templates/welcome.html",
                    "2":"templates/001scifi.html"
            }
        
        
        $scope.nextTemplate = function () {
            return $scope.templates["1"];
          }();
        
        
        

        $scope.advanceform = function () {
            
             $scope.nextTemplate = function () {
              return $scope.templates["2"];
          }();
        }
        
        
        
    
                               

    
  }])
  