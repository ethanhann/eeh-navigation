'use strict';

/**
 * @ngdoc directive
 * @name eeh-navigation-list
 * @restrict AE
 *
 * @description
 * This directive allows for the creation of a framework-agnostic menu.
 *
 * @param {string} menuName Sets the name of the menu that the directive will render.
 */
var ListDirective = function (eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/list/eeh-navigation-list.html',
        scope: {
            menuName: '='
        },
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };

            scope.$watch(eehNavigation.menuItems, function () {
                if (angular.isUndefined(scope.menuName)) {
                    return;
                }
                scope.menuItems = eehNavigation.menuItemTree(scope.menuName);
            });
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationList', ListDirective);
