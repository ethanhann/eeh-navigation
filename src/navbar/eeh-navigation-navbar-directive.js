'use strict';

var NavbarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/navbar/eeh-navigation-navbar.html',
        scope: {
            rootMenuName: '=',
            brandText: '=',
            brandState: '=',
            brandHref: '=',
            brandTarget: '=',
            brandSrc: '=',
            brandClick: '='
        },
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
            scope._navbarBrand = eehNavigation._navbarBrand;
            scope.isNavbarCollapsed = false;
            var menuItems = function () {
                return eehNavigation.menuItems();
            };
            scope.$watch(menuItems, function () {
                var menuItems = eehNavigation.menuItemTree(scope.rootMenuName);
                scope.leftNavbarMenuItems = menuItems.filter(function (item) { return !item.isHeavy(); });
                scope.rightNavbarMenuItems = menuItems.filter(function (item) { return item.isHeavy(); });
            });
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

            scope.$watch(getWindowDimensions, function (newValue) {
                if (angular.isUndefined(newValue)) {
                    return;
                }
                var width = (newValue.innerWidth > 0) ? newValue.innerWidth : $window.screen.width;
                if (width >= 768) {
                    scope.isNavbarCollapsed = false;
                }
            }, true);
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationNavbar', ['$window', 'eehNavigation', NavbarDirective]);
