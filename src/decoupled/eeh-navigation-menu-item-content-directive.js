'use strict';

var MenuItemContentDirective = function ($location, $state) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationMenuItemContent'
        },
        templateUrl: 'template/eeh-navigation/decoupled/eeh-navigation-menu-item-content.html'
    };
};

angular.module('eehNavigation').directive('eehNavigationMenuItemContent', MenuItemContentDirective);
