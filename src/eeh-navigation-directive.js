'use strict';

angular.module('eehNavigation')
.directive('eehNavigation', ['$window', 'eehNavigation', function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/eeh-navigation.html',
        link: function (scope, element) {
            scope.navbarBrand = eehNavigation.navbarBrand;
            scope.navbarMenuItems = eehNavigation.navbarMenuItems();
            scope.items = eehNavigation.sidebarMenuItems();
            scope.sidebarSearch = eehNavigation.sidebarSearch;
            scope.isNavbarCollapsed = false;

            var windowElement = angular.element($window);
            windowElement.bind('resize', function () {
                scope.$apply();
            });

            var getWindowDimensions = function () {
                return {
                    height: windowElement.height(),
                    width: windowElement.width(),
                    innerHeight: windowElement.innerHeight(),
                    innerWidth: windowElement.innerWidth()
                };
            };

            var topOffset = 50;
            var transcludedWrapper = element.find('#eeh-navigation-page-wrapper');
            scope.$watch(getWindowDimensions, function (newValue) {
                if (angular.isUndefined(newValue)) {
                    return;
                }
                var width = (newValue.innerWidth > 0) ? newValue.innerWidth : $window.screen.width;
                if (width < 768) {
                    scope.isNavbarCollapsed = true;
                    topOffset = 100; // 2-row-menu
                } else {
                    scope.isNavbarCollapsed = false;
                }
                var height = (newValue.innerHeight > 0) ? newValue.innerHeight : $window.screen.height;
                height = height - topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > topOffset) {
                    transcludedWrapper.css('min-height', (height) + 'px');
                }
            }, true);

            scope.isVisible = function (item) {
                if (angular.isFunction(item.isVisible)) {
                    return item.isVisible();
                }
                if (angular.isDefined(item.isVisible)) {
                    return item.isVisible;
                }
                return true;
            };

            scope.isSidebarTextCollapsed = false;
            scope.toggleSidebarTextCollapse = function() {
                scope.isSidebarTextCollapsed = !scope.isSidebarTextCollapsed;
                transcludedWrapper.toggleClass('sidebar-text-collapsed');
                element.find('.sidebar').toggleClass('sidebar-text-collapsed');
                element.find('.sidebar .menu-item-text').toggleClass('hidden');
            };

            scope.hasChildren = function (item) {
                for (var key in item) {
                    if (item.hasOwnProperty(key) && angular.isObject(item[key])) {
                        return true;
                    }
                }
                return false;
            };

            scope.children = function (item) {
                var children = [];
                angular.forEach(item, function (property) {
                    if (angular.isObject(property)) {
                        children.push(property);
                    }
                });
                return children;
            };
        }
    };
}]);
