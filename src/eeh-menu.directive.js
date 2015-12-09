'use strict';
angular.module('eehMenu').directive('eehMenu', MenuDirective);

/**
 * @ngInject
 * @ngdoc directive
 * @name eeh-menu
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
 * @param {string=} [menuItemCollapsedIconClass="glyphicon-chevron-left"]
 * This attribute sets the icon used to indicate that a parent of a nested menu item is collapsed.
 * @param {string=} [menuItemExpandedIconClass="glyphicon-chevron-down"]
 * This attribute sets the icon used to indicate that a parent of a nested menu item is expanded.
 */
function MenuDirective(eehMenu) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-menu/menu/eeh-menu.html',
        scope: {
            menuName: '=',
            navClass: '=?',
            menuItemCollapsedIconClass: '=?',
            menuItemExpandedIconClass: '=?'
        },
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehMenu.iconBaseClass();
            };
            scope.defaultIconClassPrefix = function () {
                return eehMenu.defaultIconClassPrefix();
            };

            scope.navClass = scope.navClass || 'navigation-menu';
            scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || scope.defaultIconClassPrefix()+'-chevron-left';
            scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || scope.defaultIconClassPrefix()+'-chevron-down';

            scope.$watch(eehMenu.menuItems, function () {
                if (angular.isUndefined(scope.menuName)) {
                    return;
                }
                scope.menuItems = eehMenu.menuItemTree(scope.menuName);
            }, true);
        }
    };
}
