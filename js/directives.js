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
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=scope.images.length-1;
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
		});
    },
	templateUrl:'templates/scifigallery.html'    
  }
});