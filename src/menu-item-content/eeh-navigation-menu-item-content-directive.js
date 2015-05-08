'use strict';

var MenuItemContentDirective = function () {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationMenuItemContent'
        },
        templateUrl: 'template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html'
    };
};

angular.module('eehNavigation').directive('eehNavigationMenuItemContent', MenuItemContentDirective);
