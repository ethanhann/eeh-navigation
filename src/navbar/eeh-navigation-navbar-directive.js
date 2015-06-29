'use strict';

/**
 * @ngdoc directive
 * @name eeh-navigation-navbar
 * @restrict AE
 *
 * @description
 * This directive allows for the creation of a Twitter Bootstrap navbar component.
 *
 * @param {string=} menuName Sets the name of the menu that the directive will render.
 * @param {string=} [navClass=navbar-default navbar-static-top] Sets the ng-class attribute of the top-level nav element.
 * @param {string=} brandText Sets the text of the brand element.
 * @param {string=} brandState Sets ui-sref of the brand element.
 * @param {string=} brandHref Sets the href attribute of the brand element.
 * @param {string=} brandTarget Sets target attribute of the brand element.
 * @param {string=} brandSrc Sets the src attribute of the image in the brand element.
 * @param {function=} brandClick Sets the callback function of the brand element.
 */
var NavbarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/navbar/eeh-navigation-navbar.html',
        scope: {
            menuName: '=',
            navClass: '=?',
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
            scope.navClass = scope.navClass || 'navbar-default navbar-static-top';
            scope.isNavbarCollapsed = false;
            scope.$watch(eehNavigation.menuItems, function () {
                if (angular.isUndefined(scope.menuName)) {
                    return;
                }
                var menuItems = eehNavigation.menuItemTree(scope.menuName);
                scope.leftNavbarMenuItems = menuItems.filter(function (item) { return !item.isHeavy(); });
                scope.rightNavbarMenuItems = menuItems.filter(function (item) { return item.isHeavy(); });
            }, true);
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
