'use strict';

/* Directives */
angular.module('myApp.directives', ['ngAnimate'])
.directive('appVersion', ['version',
    function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
  }]).directive('contentItem', function ($compile) {

    var linker = function ($scope, element, attrs) {
        var activeTemplate;

        $scope.$watch(attrs.contentItem, function (value) {
            activeTemplate = value;
            element.html(activeTemplate).show();
            $compile(element.contents())($scope);
        });
    }

    return {
        restrict: "EA",
        rep1ace: true,
        link: linker

    };
}).directive('slider', function($timeout) {
  return {
    restrict: 'AE',
	replace: true,
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.advanceform();
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;

		});
		
		/* Start: For Automatic slideshow*/
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				timer=$timeout(sliderFunc,scope.images[scope.currentIndex].delay);
                scope.next();
			},scope.images[scope.currentIndex].delay);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		angular.element(document.querySelectorAll('.arrow')).one('click',function(){
			$timeout.cancel(timer);
            scope.advanceform();
		});
    },
	templateUrl:'templates/scifigallery.html'    
  }
}).directive('speaker', function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            scope.commandline = ' ';
            scope.sentences = attrs.text.split("|");
            scope.sentenceIdx = 0;
            if(scope.synthesis){
                scope.synthesis.text = scope.sentences[scope.sentenceIdx];
                if(attrs.speak == "true")
                    
                if(attrs.voice){
                    scope.synthesis.voice = speechSynthesis.getVoices().filter(function (voice) {
                        return voice.name == attrs.voice;
                    })[0];
                        
                    }else {
                        scope.synthesis.voice = speechSynthesis.getVoices().filter(function (voice) {
                        return voice.name == "native";
                    })[0];
                    
                    }
                    if(attrs.speak == "true")
                        speechSynthesis.speak(scope.synthesis);
                    
            }

            if(attrs.typeit==="true"){
                scope.charpos = 0;
                scope.commandline = ' ';
                scope.nextchar=function(){
                    scope.commandline += scope.synthesis.text[scope.charpos];
                    scope.charpos++;
                };

                var texttimer;
                scope.$watch('charpos',function(){
                    if(scope.charpos == scope.synthesis.text.length){
                        $timeout.cancel(texttimer);
                        scope.sentenceIdx++;
                        if(scope.sentenceIdx < scope.sentences.length){
                            scope.synthesis.text = scope.sentences[scope.sentenceIdx];
                            $timeout(speakAndSpell, attrs.pause);
                        } else {
                            scope.sentenceIdx = 0;
                            if(attrs.advance=="true"){
                                $timeout(scope.advanceform, 4000);
                            }
                        }
                    }
                });

                var speakAndSpell = function(){
                    if(attrs.speak == "true")
                        speechSynthesis.speak(scope.synthesis);
                    scope.commandline = ' ';
                    scope.charpos = 0;
                    typeline();
                }
                
                var typeline=function(){
                    texttimer=$timeout(function(){
                        texttimer=$timeout(typeline, attrs.typespeed);
                        scope.nextchar();
                    }, attrs.typespeed);
                };

                typeline();
                
                scope.$on('$destroy',function(){
                    $timeout.cancel(texttimer);
                });

            };

        }
    }
}).directive('flippage', function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            var tmr = $timeout(scope.advanceform, Number(attrs.timewait));
            scope.$on('$destroy',function(){
                    $timeout.cancel(tmr);
            });
        }
    }
}).directive('scrolldiv', function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            var stimer = $timeout(function(){
                $('#scrolly').animate({scrollTop:elem.offset().top+1000}, Number(attrs.speed));
            }, Number(attrs.scrollwait));

            scope.$on('$destroy',function(){
                    $timeout.cancel(stimer);
            });
        }
    }
}).directive('repeat', function($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            
            var speak = function (text, advance) {
                scope.synthesis.text = text;
                scope.synthesis.onend = function(event) { listen(); }

                speechSynthesis.speak(scope.synthesis);
                if(advance) {
                    scope.synthesis.onend = function(){
                        $timeout(function(){
                            var scopeMain = angular.element($("#templateContent")).scope();
                            scopeMain.$apply(function(){ scopeMain.advanceform();});
                        }, 1500);
                    };
                }
            }
            
            var listen = function() {
                var text = '';
                scope.recognizer.stop();
                scope.recognizer.start();
                scope.recognizer.onresult = function(event) {
                    if (event.results.length > 0) {
                        text = '';
                        for(var i=0; i < event.results.length; i++) {
                            text += event.results[i][0].transcript;
                            if(i != event.results.length) {
                                text += " ";
                            }
                        }
                        
                        //TODO: add in the interim text results if we can 
                        var scopeMain = angular.element($("#templateContent")).scope();
                        scopeMain.$apply(function(){ scopeMain.commandLine = text;});
                        speak(text, true);
                    }
                }
            }

            speak(attrs.intro, false);

        }
    }
}).directive('conversation', function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        link: function (scope, elem, attrs) {
            scope.endListener = false;
            scope.conversation = JSON.parse(attrs.cmdrsp);
        
            var checkForCommand = function(text){
                // important to know that this is inside of the recognition call back scope
                var scopeMain = angular.element($("#templateContent")).scope();
                var commandLowerCase = text.toLowerCase();
                if(commandLowerCase.indexOf(attrs.advancecommand) != -1) {
                    scope.endListener = true;
                    scope.synthesis.onend = function(){};
                    scopeMain.$apply(function(){scopeMain.recognizer.stop(); scopeMain.advanceform();});

                    return;
                }

                for(var cmdRspIdx in scope.conversation){
                    if(commandLowerCase.indexOf(scope.conversation[cmdRspIdx].command.toLowerCase()) != -1) {
                        scopeMain.$apply(function(){scope.recognizer.stop();});
                        converse(scope.conversation[cmdRspIdx].response);
                        return;
                    }

                };

            }

            var converse = function (text) {
                scope.synthesis.text = text;
                scope.synthesis.onend = function(event) { scope.recognizer.abort(); scope.recognizer.start(); }
                speechSynthesis.speak(scope.synthesis);

                scope.recognizer.onresult = function(event) {
                    if (event.results.length > 0) {
                        text = '';
                        for(var i=0; i < event.results.length; i++) {
                            text += event.results[i][0].transcript;
                            if(i != event.results.length) {
                                text += " ";
                            }
                        }
                        //TODO: add in the interim text results if we can 
                        var scopeMain = angular.element($("#templateContent")).scope();
                        scopeMain.$apply(function(){ scopeMain.commandLine = text;});

                        checkForCommand(text);
                    }
                }
            }

            converse(attrs.intro);
    
        }
    }
});
