'use strict';

var SidebarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/search-input/eeh-navigation-search-input.html',
        scope: {
            searchIconClass: '@',
            submit: '=',
            classes: '=',
            isCollapsed: '='
        },
        link: function (scope) {
            scope.model = {
                query: ''
            };
            scope.searchIconClass = scope.searchIconClass || 'glyphicon-search';
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationSearchInput', ['$window', 'eehNavigation', SidebarDirective]);
