'use strict';

var MenuItemContentDirective = function (eehNavigation) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationMenuItemContent'
        },
        templateUrl: 'template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html',
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationMenuItemContent', MenuItemContentDirective);
