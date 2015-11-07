'use strict';
angular.module('eehNavigation').directive('eehNavigationSearchInput', SearchInputDirective);

/** @ngInject */
function SearchInputDirective(eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/search-input/eeh-navigation-search-input.html',
        scope: {
            iconClass: '=',
            submit: '=',
            classes: '=',
            isCollapsed: '='
        },
        link: function (scope) {
            scope.model = {
                query: ''
            };
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
        }
    };
}
