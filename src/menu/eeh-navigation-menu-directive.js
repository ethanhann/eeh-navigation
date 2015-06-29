'use strict';

/**
 * @ngdoc directive
 * @name eeh-navigation-menu
 * @restrict AE
 *
 * @description
 * This directive allows for the creation of a framework-agnostic menu.
 * It is encouraged for users to create their own directive that adds behavior to, or otherwise manipulates, this directive.
 * Third party jQuery menu plugins, such as Superfish and MetisMenu, can easily be used to style and add behavior to the
 * bare-bones menu that this directive generates.
 *
 * @param {string} menuName Sets the name of the menu that the directive will render.
 * @param {string=} [navClass=navigation-menu] Sets the ng-class attribute of the top-level nav element.
 */
var MenuDirective = function (eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/menu/eeh-navigation-menu.html',
        scope: {
            menuName: '=',
            navClass: '=?'
        },
        link: function (scope) {
            scope.navClass = scope.navClass || 'navigation-menu';

            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };

            scope.$watch(eehNavigation.menuItems, function () {
                if (angular.isUndefined(scope.menuName)) {
                    return;
                }
                scope.menuItems = eehNavigation.menuItemTree(scope.menuName);
            }, true);
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationMenu', MenuDirective);
