'use strict';

/**
 * @deprecated Will be removed in 4.0.0
 */
var NavigationDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/deprecated/eeh-navigation.html',
        link: function (scope, element) {
            scope._navbarBrand = eehNavigation._navbarBrand;
            scope._sidebarTextCollapse = eehNavigation._sidebarTextCollapse;
            scope._sidebarSearch = eehNavigation._sidebarSearch;
            scope.isNavbarCollapsed = false;
            scope._navbarMenuItems = eehNavigation._navbarMenuItems;
            scope.$watch('_navbarMenuItems', function () {
                var navbarMenuItems = eehNavigation.navbarMenuItems();
                scope.leftNavbarMenuItems = navbarMenuItems.filter(function (item) { return !item.isHeavy(); });
                scope.rightNavbarMenuItems = navbarMenuItems.filter(function (item) { return item.isHeavy(); });
            });
            scope._sidebarMenuItems = eehNavigation._sidebarMenuItems;
            scope.$watch('_sidebarMenuItems', function () {
                scope.sidebarMenuItems = eehNavigation.sidebarMenuItems();
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

            scope.toggleSidebarTextCollapse = function() {
                eehNavigation.sidebarTextCollapseToggleCollapsed();
                setTextCollapseState();
            };
            function setTextCollapseState() {
                var sidebarMenuItemTextElements = element.find('.sidebar .menu-item-text');
                var sidebarElement = element.find('.sidebar');
                if (eehNavigation.sidebarTextCollapseIsCollapsed()) {
                    transcludedWrapper.addClass('sidebar-text-collapsed');
                    sidebarElement.addClass('sidebar-text-collapsed');
                    sidebarMenuItemTextElements.addClass('hidden');
                } else {
                    transcludedWrapper.removeClass('sidebar-text-collapsed');
                    sidebarElement.removeClass('sidebar-text-collapsed');
                    sidebarMenuItemTextElements.removeClass('hidden');
                }
            }
            /**
             * $includeContentLoaded is emitted when ng-include templates are finished loading.
             * The text collapse state needs to be evaluated after the sidebar menu templates (which are loaded via
             * ng-include) are loaded. If not, the sidebar menu item will not be hidden if the initial state of the
             * sidebar text is collapsed as the menu items will not exist when the state is initially evaluated.
             */
            scope.$on('$includeContentLoaded', function () {
                setTextCollapseState();
            });

            scope.isSidebarVisible = function () {
                return eehNavigation.isSidebarVisible();
            };
        }
    };
};

angular.module('eehNavigation').directive('eehNavigation', ['$window', 'eehNavigation', NavigationDirective]);
