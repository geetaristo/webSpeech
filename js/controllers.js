'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
        $scope.synthesis = new SpeechSynthesisUtterance();
        $scope.startOpeningThemeOnIdx = 3;  // index of dialog item where the opening theme starts
        $scope.hal_silly;                   // variable for holding the hal silly audio
        $scope.openingTheme;                // variable for holding the opening theme audio
        
        $scope.hal_silly = document.createElement('audio');
        $scope.hal_silly.setAttribute('src', '../audio/silly_hal.wav');
        $scope.hal_silly.load();

        $scope.openingTheme = document.createElement('audio');
        $scope.openingTheme.setAttribute('src', '../audio/2001ASpaceOdysseyOpening.wav');
        $scope.openingTheme.load();
        var playTheme = function (){
            $scope.hal_silly.play();
            $scope.hal_silly.addEventListener('ended', function(event){
                $scope.openingTheme.play();
            });
        }

        $scope.templates=  [
            "templates/welcome.html",
            "templates/console.html",
            "templates/console2.html",
            "templates/hal.html",
            "templates/001scifi.html",
            "templates/console3.html",
            "templates/draftdoc.html",
            "templates/finaldoc.html",
            "templates/browsersupport.html",
            "templates/speech-synth-snip1.html",
            "templates/speech-synth-snip2.html",
            "templates/fin.html"//,
//            "templates/blank.html",
//            "templates/hal2.html",
//            "templates/blank.html"
        ];
       
        //START hal = 10;
        //START ongallery=11;

    $scope.templateIdx = 0;
    $scope.nextTemplate = function () {
        return $scope.templates[$scope.templateIdx++];
      }();
    $scope.advanceform = function () {
            $scope.nextTemplate = function () {
                if($scope.templateIdx == $scope.startOpeningThemeOnIdx)
                    playTheme();
                    
                return $scope.templates[$scope.templateIdx++];
            }();
    };

    $scope.images = [
            {src: "/images/scifi/01-metropolis.jpg",  delay: 2900},
            {src: "/images/scifi/02-aztecmummyvshumanrobot.jpg",  delay: 2300},
            {src: "/images/scifi/03-oldGermanRobot.jpg",  delay: 1900},
            {src: "/images/scifi/04-oldEurpeanRobot.jpg",  delay: 1300},
            {src: "/images/scifi/05-evil-robot.jpg",  delay: 1500},
            {src: "/images/scifi/06-RobbyTheRobotAndGirl.jpg",  delay: 1500},
            {src: "/images/scifi/07-lostinspace2.jpg",  delay: 1500},
            {src: "/images/scifi/08-TheDayTheEarthStoodStill.jpg",  delay: 1500},
            {src: "/images/scifi/09-starwars.jpg",  delay: 1500},
            {src: "/images/scifi/10-jetsons.jpg",  delay: 1500},
            {src: "/images/scifi/11-shortCircuit.jpg",  delay: 1500},
            {src: "/images/scifi/12-terminator.jpg",  delay: 1500},
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

// try to change the voice.
//    $scope.voices = speechSynthesis.getVoices();
//    $scope.$watch('voices',function(){
//        $scope.voices.forEach(function(voice){
//            if(voice.name == 'Alex')
//                $scope.synthesis.voice = voice;
//        });
//
//    });
    
  }])
  