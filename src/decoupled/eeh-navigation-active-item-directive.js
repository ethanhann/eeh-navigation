'use strict';

var ActiveParentMenuItemDirective = function ($location, $state) {
    return {
        restrict: 'A',
        scope: {
            menuItem: '=eehNavigationActiveMenuItem'
        },
        link: function (scope, element) {
            var activeClass = 'active';
            scope.$watch(function () {
                return $location.url();
            }, function () {
                if (scope.menuItem.hasChildren()) {
                    var isActive = scope.menuItem.children().filter(function (childMenuItem) {
                            return angular.isDefined(childMenuItem.state) && $state.includes(childMenuItem.state);
                        }).length > 0;
                    element.toggleClass(activeClass, isActive);
                }
            });
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationActiveMenuItem', ActiveParentMenuItemDirective);
