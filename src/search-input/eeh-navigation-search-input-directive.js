'use strict';

var SidebarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/search-input/eeh-navigation-search-input.html',
        scope: {
            searchIconClass: '@',
            searchTerm: '=',
            submit: '='
        },
        link: function (scope) {
            scope.searchIconClass = scope.searchIconClass || 'glyphicon-search';

            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };

            scope._sidebarSearch = eehNavigation._sidebarSearch;
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationSearchInput', ['$window', 'eehNavigation', SidebarDirective]);
