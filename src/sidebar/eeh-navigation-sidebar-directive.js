'use strict';

var SidebarDirective = function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/sidebar/eeh-navigation-sidebar.html',
        scope: {
            topOffset: '@topOffset',
            collapsedMenuItemIconClass: '@collapsedMenuItemIconClass',
            expandedMenuItemIconClass: '@expandedMenuItemIconClass',
            collapsedSidebarIconClass: '@collapsedSidebarIconClass',
            expandedSidebarIconClass: '@expandedSidebarIconClass',
            searchIconClass: '@searchIconClass'
        },
        link: function (scope, element) {
            scope.topOffset = scope.topOffset || 51; // 51 is the default height of the navbar component
            scope.collapsedMenuItemIconClass = scope.collapsedMenuItemIconClass || 'glyphicon-chevron-left';
            scope.expandedMenuItemIconClass = scope.expandedMenuItemIconClass || 'glyphicon-chevron-down';
            scope.collapsedSidebarIconClass = scope.collapsedSidebarIconClass || 'glyphicon-arrow-right';
            scope.expandedSidebarIconClass = scope.expandedSidebarIconClass || 'glyphicon-arrow-left';
            scope.searchIconClass = scope.searchIconClass || 'glyphicon-search';

            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
            scope._sidebarTextCollapse = eehNavigation._sidebarTextCollapse;
            scope._sidebarSearch = eehNavigation._sidebarSearch;
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

            var transcludedWrapper = element.find('#eeh-navigation-page-wrapper');
            scope.$watch(getWindowDimensions, function (newValue) {
                if (angular.isUndefined(newValue)) {
                    return;
                }
                var height = (newValue.innerHeight > 0) ? newValue.innerHeight : $window.screen.height;
                height = height - scope.topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > scope.topOffset) {
                    transcludedWrapper.css('min-height', (height) + 'px');
                }
            }, true);

            scope.toggleSidebarTextCollapse = function() {
                eehNavigation.sidebarTextCollapseToggleCollapsed();
                setTextCollapseState();
            };
            function setTextCollapseState() {
                var sidebarMenuItemTextElements = element.find('.menu-item-text');
                var sidebarElement = element.find('.eeh-navigation-sidebar');
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

angular.module('eehNavigation').directive('eehNavigationSidebar', ['$window', 'eehNavigation', SidebarDirective]);
