'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
       
//         $scope.templates=  {
//                    "1":"templates/blank.html",
//                    "2":"templates/001scifi.html",
//                    "3":"templates/002scifi.html"
//            }
        
//        $scope.nextTemplate = function () {
//            return $scope.templates["1"];
//          }();
//        

        $scope.advanceform = function (templateName) {
            return templateProvider(templateName);
//            return templateProvider.findMatchingTemplate(templateName);
//            if (templatename.length >=1){
//                $scope.nextTemplate = function () {
//                return $scope.templates[templatename];
//            }();
//            } 
        }
                               

    
  }])
  