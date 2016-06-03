'use strict';
angular.module('eehMenu').directive('eehMenuMenuItemContent', MenuItemContentDirective);

/** @ngInject */
function MenuItemContentDirective(eehMenu) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehMenuMenuItemContent'
        },
        templateUrl: 'template/eeh-menu/eeh-menu.menu-item-content.html',
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehMenu.iconBaseClass();
            };
        }
    };
}
