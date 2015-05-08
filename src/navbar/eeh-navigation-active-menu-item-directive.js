'use strict';

var ActiveParentMenuItemDirective = function ($state) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationActiveMenuItem'
        },

        link: function (scope, element) {
            var checkIsActive = function () {
                if (scope.menuItem.hasChildren()) {
                    var isActive = scope.menuItem.children().filter(function (childMenuItem) {
                            return angular.isDefined(childMenuItem.state) && $state.includes(childMenuItem.state);
                        }).length > 0;
                    element.toggleClass('active', isActive);
                }
            };
            scope.$on('$stateChangeSuccess', checkIsActive);
            checkIsActive();
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationActiveMenuItem', ActiveParentMenuItemDirective);
