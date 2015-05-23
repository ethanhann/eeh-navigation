'use strict';

function isMenuItemActive(menuItem, $state) {
    if (!menuItem.hasChildren()) {
        // Return whether or not the leaf is active.
        return angular.isDefined(menuItem.state) && $state.includes(menuItem.state);
    }
    var children = menuItem.children();
    for (var i = 0; i < children.length; i++) {
        if (angular.isDefined(children[i].state) && $state.includes(children[i].state)) {
            // Return true if the child menu item is active.
            return true;
        }
        if (isMenuItemActive(children[i], $state)) {
            // Return true if the child has at least one active child of its own.
            return true;
        }
    }
    // Return false if the menu item has no active children.
    return false;
}

var ActiveMenuItemDirective = function ($state) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationActiveMenuItem'
        },
        link: function (scope, element) {
            var checkIsActive = function () {
                var isActive = isMenuItemActive(scope.menuItem, $state);
                element.toggleClass('active', isActive);
            };
            scope.$on('$stateChangeSuccess', checkIsActive);
            checkIsActive();
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationActiveMenuItem', ActiveMenuItemDirective);
