'use strict';

angular.module('eehNavigation', [])
.provider('eehNavigation', function () {
    var self = this;
    self.sidebarSearch = {
        isVisible: true,
        model: '',
        click: function () {}
    };
    self.navbarBrand = {};

    /**
     * Recursively map a flat array of menu items to a nested object suitable to generate HTML lists from.
     */
    self.buildAncestorChain = function (name, items, config) {
        var keys = name.split('.');
        if (name.length === 0 || keys.length === 0) {
            return;
        }
        var key = keys.shift();
        if (angular.isUndefined(items[key])) {
            items[key] = keys.length === 0 ? config : {};
            if (keys.length === 0) {
                items[key] = config;
            }
        }
        self.buildAncestorChain(keys.join('.'), items[key], config);
    };

    // ------------------------------------------------------------------------
    // Navbar items
    // ------------------------------------------------------------------------
    var _navbarMenuItems = {};
    self.navbarMenuItem = function (name, config) {
        _navbarMenuItems[name] = config;
        return self;
    };
    self.navbarMenuItems = function () {
        var items = {};
        angular.forEach(_navbarMenuItems, function (config, name) {
            self.buildAncestorChain(name, items, config);
        });
        return items;
    };
    // ------------------------------------------------------------------------
    // Sidebar items
    // ------------------------------------------------------------------------
    var _sidebarMenuItems = {};
    self.sidebarMenuItem = function (name, config) {
        _sidebarMenuItems[name] = config;
        return self;
    };
    self.sidebarMenuItems = function () {
        var items = {};
        angular.forEach(_sidebarMenuItems, function (config, name) {
            self.buildAncestorChain(name, items, config);
        });
        return items;
    };

    // ------------------------------------------------------------------------
    // API
    // ------------------------------------------------------------------------
    self.$get = function () {
        return {
            sidebarMenuItem: self.sidebarMenuItem,
            sidebarMenuItems: self.sidebarMenuItems,
            sidebarSearch: self.sidebarSearch,
            navbarBrand: self.navbarBrand,
            navbarMenuItem: self.navbarMenuItem,
            navbarMenuItems: self.navbarMenuItems

        };
    };
})
.directive('eehNavigation', ['$window', 'eehNavigation', function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/navigation.html',
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
