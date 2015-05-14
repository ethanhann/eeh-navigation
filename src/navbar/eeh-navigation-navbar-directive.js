'use strict';

var NavbarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/navbar/eeh-navigation-navbar.html',
        link: function (scope) {
            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
            scope._navbarBrand = eehNavigation._navbarBrand;
            scope.isNavbarCollapsed = false;
            scope._navbarMenuItems = eehNavigation._navbarMenuItems;
            scope.$watch('_navbarMenuItems', function () {
                var navbarMenuItems = eehNavigation.navbarMenuItems();
                scope.leftNavbarMenuItems = navbarMenuItems.filter(function (item) { return !item.isHeavy(); });
                scope.rightNavbarMenuItems = navbarMenuItems.filter(function (item) { return item.isHeavy(); });
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
