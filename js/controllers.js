'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
       
     $scope.templates=  {
         "1":"templates/blank.html",
         "2":"templates/hal.html",
         "3":"templates/001scifi.html",
         "4":"templates/overview.html",
         "5":"templates/fin.html",
         "speechSynth1":"templates/speech-synth-snip1.html",
         "speechSynth2":"templates/speech-synth-snip2.html",
     };
       

    $scope.nextTemplate = function () {
        return $scope.templates["1"];
      }();
        

    $scope.advanceform = function (templateName) {
//            return templateProvider(templateName);

        if (templateName.length >=1){
            $scope.nextTemplate = function () {
                return $scope.templates[templateName];
            }();
        } 
    };

    $scope.images = [
            {src: "/images/scifi/01-metropolis.jpg",  delay: 2500},
            {src: "/images/scifi/02-aztecmummyvshumanrobot.jpg",  delay: 1800},
            {src: "/images/scifi/03-oldGermanRobot.jpg",  delay: 1600},
            {src: "/images/scifi/04-oldEurpeanRobot.jpg",  delay: 1200},
            {src: "/images/scifi/05-evil-robot.jpg",  delay: 1200},
            {src: "/images/scifi/06-RobbyTheRobotAndGirl.jpg",  delay: 1200},
            {src: "/images/scifi/07-lostinspace2.jpg",  delay: 1200},
            {src: "/images/scifi/08-TheDayTheEarthStoodStill.jpg",  delay: 1200},
            {src: "/images/scifi/09-starwars.jpg",  delay: 1200},
            {src: "/images/scifi/10-jetsons.jpg",  delay: 1200},
            {src: "/images/scifi/11-shortCircuit.jpg",  delay: 1200},
            {src: "/images/scifi/12-terminator.jpg",  delay: 1200},
            {src: "/images/scifi/13-scotty.jpg",  delay: 2200},
            {src: "/images/scifi/15-Rocky_4_robot.jpg",  delay: 1200},
            {src: "/images/scifi/16-Data_intoxicated.jpg",  delay: 1200},
            {src: "/images/scifi/17-OptimusPrime1.jpg",  delay: 1200},
            {src: "/images/scifi/18-HitchhikersGuideToTheGalaxy.jpg",  delay: 2200},
            {src: "/images/scifi/19-iRobot.jpg",  delay: 1600},
            {src: "/images/scifi/20-Jarvis.IronManSuit.jpg",  delay: 1800},
            {src: "/images/scifi/21-her-joaquin-phoenix.jpg",  delay: 2000},
            {src: "/images/scifi/14-cylon_replaced1.jpg",  delay: 4000}
            
        ];
        
    
  }])
  