'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.templates']).
  controller('mainFormController', ['$scope','templateProvider', 
    function($scope,templateProvider) {
        $scope.synthesis = new SpeechSynthesisUtterance();
        $scope.recognizer = new webkitSpeechRecognition();
        
        $scope.startOpeningThemeOnIdx = 3;  // index of dialog item where the opening theme starts
        $scope.hal_silly;                   // variable for holding the hal silly audio
        $scope.openingTheme;                // variable for holding the opening theme audio
        $scope.goodbyeHalOnIdx = 22;  // index of dialog item where the opening theme starts
        
        $scope.hal_silly = document.createElement('audio');
        $scope.hal_silly.setAttribute('src', '../audio/silly_hal.wav');
        $scope.hal_silly.load();

        $scope.hal_goodbye = document.createElement('audio');
        $scope.hal_goodbye.setAttribute('src', '../audio/goodbye_hal.wav');
        $scope.hal_goodbye.load();

        $scope.openingTheme = document.createElement('audio');
        $scope.openingTheme.setAttribute('src', '../audio/2001ASpaceOdysseyOpening.wav');
        $scope.openingTheme.load();
        var playTheme = function (){
            $scope.hal_silly.play();
            $scope.hal_silly.addEventListener('ended', function(event){
                $scope.openingTheme.play();
            });
        }
        var sayGoodByeHal = function(){$scope.hal_goodbye.play();}

        $scope.templates=  [
            "templates/welcome.html",
            "templates/console.html",
            "templates/console2.html",
            "templates/hal.html",
            "templates/001scifi.html",
            "templates/console3.html",
            "templates/draftdoc.html",
            "templates/finaldoc.html",
            "templates/browsersupport.html", // TODO:Needs to be enhanced
            "templates/speech-synth-overview.html",
            "templates/speech-synth-snip1.html",
            "templates/speech-synth-snip2.html",
            "templates/speech-synth-snip3.html",
            "templates/speech-synth-snip4.html",    // TODO: if we can do the VOICES... do that part here.
                                                    // TODO: speechSynthesis is a little bit of a novelty..
                                                    // accessibility... mobile
                                                    // one advantage is it is dynamic... so the speech will
                                                    // always match the content....
                                                    // as opposed to pre-recorded audio that would need to
                                                    // be re-recorded... 
                                                    /// it can do things like read e-mail.
            "templates/speech-recog-repeat.html",
            "templates/speech-recog-conversation.html",
                                                    // TODO: Form example
                                                    // TODO: Nav example
                                                    // TODO: This app's code overview.
            "templates/speech-rec-overview.html",
            "templates/speech-rec-snip1.html",
            "templates/speech-rec-snip2.html",
            "templates/speech-rec-snip3.html",
            "templates/blank.html",
            "templates/fin.html",
            "templates/hal2.html",
            "templates/blank.html",
            "templates/credits.html"
        ];
       
        $scope.templateIdx = 14; // Change this value to start on a new template
        $scope.nextTemplate = function () {
            return $scope.templates[$scope.templateIdx++];
          }();
        $scope.advanceform = function () {
                $scope.nextTemplate = function () {
                    if($scope.templateIdx == $scope.startOpeningThemeOnIdx)
                        playTheme();
                    if($scope.templateIdx == $scope.goodbyeHalOnIdx){
                        sayGoodByeHal();
                    }

                    return $scope.templates[$scope.templateIdx++];
                }();
        };

        $scope.images = [
                {src: "/images/scifi/01-metropolis.jpg",  delay: 3100},
                {src: "/images/scifi/02-aztecmummyvshumanrobot.jpg",  delay: 2300},
                {src: "/images/scifi/03-oldGermanRobot.jpg",  delay: 2600},
                {src: "/images/scifi/04-oldEurpeanRobot.jpg",  delay: 1800},
                {src: "/images/scifi/05-evil-robot.jpg",  delay: 2700},
                {src: "/images/scifi/07-lostinspace2.jpg",  delay: 2000},
                {src: "/images/scifi/06-RobbyTheRobotAndGirl.jpg",  delay: 2500},
                {src: "/images/scifi/08-TheDayTheEarthStoodStill.jpg",  delay: 1900},
                {src: "/images/scifi/10-jetsons.jpg",  delay: 2500},
                {src: "/images/scifi/sleeper.jpg",  delay: 2000},
                {src: "/images/scifi/09-starwars.jpg",  delay: 3000},
                {src: "/images/scifi/11-shortCircuit.jpg",  delay: 600},
                {src: "/images/scifi/12-terminator.jpg",  delay: 1000},
                {src: "/images/scifi/13-scotty.jpg",  delay: 4000},
                {src: "/images/scifi/15-Rocky_4_robot.jpg",  delay: 350},
                {src: "/images/scifi/17-OptimusPrime1.jpg",  delay: 800},
                {src: "/images/scifi/16-Data_intoxicated.jpg",  delay: 1950},
                {src: "/images/scifi/18-HitchhikersGuideToTheGalaxy.jpg",  delay: 1000},
                {src: "/images/scifi/19-iRobot.jpg",  delay: 1300},
                {src: "/images/scifi/20-Jarvis.IronManSuit.jpg",  delay: 1300},
                {src: "/images/scifi/21-her-joaquin-phoenix.jpg",  delay: 1400},
                {src: "/images/scifi/14-cylon_replaced1.jpg",  delay: 3000}

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
  