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
            scope.advanceForm();
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
                                $timeout(scope.advanceform, attrs.pause);
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
            $timeout(scope.advanceform, attrs.timewait);
        }
    }
});