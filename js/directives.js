'use strict';

/* Directives */
angular.module('myApp.directives', [])
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
}).directive('previousQuestion', function ($compile) {

    var linker = function ($scope, element, attrs) {
        var previousTemplate;

        $scope.$watch(attrs.previousQuestion, function (value) {
            previousTemplate = value;
            var re = /input/g;
            var modified = value.replace(re,"input ng-disabled='true'").replace("autofocus=", "noFocus=");
            element.html(modified).show();
            $compile(element.contents())($scope);
        });
    }

    return {
        restrict: "EA",
        rep1ace: true,
        link: linker

    };
}).directive('nextQuestion', function ($compile) {

    var linker = function ($scope, element, attrs) {
        var nextTemplate;
        
        $scope.$watch(attrs.nextQuestion, function (value) {
            nextTemplate = value;
            var re = /input/g;
            var modified = value.replace(re,"input ng-disabled='true'").replace("autofocus=", "noFocus=");
            element.html(modified).show();
            $compile(element.contents())($scope);
        });
    }

    return {
        restrict: "EA",
        rep1ace: true,
        link: linker

    };
});