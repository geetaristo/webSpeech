'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
       
         $scope.templates=  {
                    "1":"templates/welcome.html",
                    "2":"templates/001scifi.html",
                    "3":"templates/002scifi.html"
            }
        
        
        $scope.nextTemplate = function () {
            return $scope.templates["1"];
          }();
        

        $scope.advanceform = function (templatename) {
            
            if (templatename.length >=1){
            
             $scope.nextTemplate = function () {
              return $scope.templates[templatename];
            }();
            
          } 
        }
                               

    
  }])
  