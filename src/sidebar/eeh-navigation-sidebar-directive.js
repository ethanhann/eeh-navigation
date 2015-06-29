'use strict';

/**
 * @ngdoc directive
 * @name eeh-navigation-sidebar
 * @restrict AE
 *
 * @description
 * This directive adds a sidebar, based on the Twitter Bootstrap navbar component, to the template.
 * If Angular UI Router is used (which is recommended), then the sidebar directive should wrap a __ui-view__ element.
 * It should also be in a template that is at or near the top of the state hierarchy.
 *
 * @param {string=} menuName Sets the name of the menu that the directive will render.
 * @param {string=} [navClass=navbar-default] Sets the ng-class attribute of the top-level nav element.
 * @param {number=} [topOffset=51]
 * This attribute offsets the top position of the sidebar.
 * It should equal the height of the navbar, or 0 if there is no navbar.
 * This attribute should be used if the navbar's height is something different or if the navbar is not used.
 * @param {string=} [menuItemCollapsedIconClass="glyphicon-chevron-left"]
 * This attribute sets the icon used to indicate that a parent of a nested menu item is collapsed.
 * @param {string=} [menuItemExpandedIconClass="glyphicon-chevron-down"]
 * This attribute sets the icon used to indicate that a parent of a nested menu item is expanded.
 * @param {string=} [sidebarCollapsedIconClass="glyphicon-arrow-right"]
 * This attribute sets the icon used to indicate that the sidebar is collapsed.
 * @param {string=} [sidebarExpandedIconClass="glyphicon-arrow-left"]
 * This attribute sets the icon used to indicate that the search input is use for searching.
 * @param {string=} [searchInputIconClass="glyphicon-search"]
 * This attribute sets the icon used to indicate that the sidebar is collapsed.
 * @param {boolean=} [searchInputIsVisible=true]
 * This attribute causes the search input to be shown or hidden.
 * @param {boolean=} [sidebarCollapsedButtonIsVisible=true]
 * This attribute causes the text collapse toggle button to be shown or hidden.
 * @param {boolean=} [sidebarIsCollapsed=false]
 * This attribute sets the state of the text collapse button.
 */
var SidebarDirective = function ($document, $window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/sidebar/eeh-navigation-sidebar.html',
        scope: {
            menuName: '=',
            navClass: '=?',
            topOffset: '=?',
            menuItemCollapsedIconClass: '=?',
            menuItemExpandedIconClass: '=?',
            sidebarCollapsedIconClass: '=?',
            sidebarExpandedIconClass: '=?',
            searchInputIconClass: '=?',
            searchInputIsVisible: '=?',
            searchInputSubmit: '=',
            sidebarCollapsedButtonIsVisible: '=?',
            sidebarIsCollapsed: '=?'
        },
        link: function (scope, element) {
            scope.topOffset = scope.topOffset || 51; // 51 is the default height of the navbar component
            scope.navClass = scope.navClass || 'navbar-default';
            scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || 'glyphicon-chevron-left';
            scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || 'glyphicon-chevron-down';
            scope.sidebarCollapsedIconClass = scope.sidebarCollapsedIconClass || 'glyphicon-arrow-right';
            scope.sidebarExpandedIconClass = scope.sidebarExpandedIconClass || 'glyphicon-arrow-left';
            scope.searchInputIconClass = scope.searchInputIconClass || 'glyphicon-search';
            if (scope.sidebarCollapsedButtonIsVisible !== false)  {
                scope.sidebarCollapsedButtonIsVisible = true;
            }
            scope.sidebarIsCollapsed = scope.sidebarIsCollapsed || false;
            if (scope.searchInputIsVisible !== false)  {
                scope.searchInputIsVisible = true;
            }

            scope.iconBaseClass = function () {
                return eehNavigation.iconBaseClass();
            };
            var menuItems = function () {
                return eehNavigation.menuItems();
            };
            scope.$watch(menuItems, function () {
                if (angular.isUndefined(scope.menuName)) {
                    return;
                }
                scope.sidebarMenuItems = eehNavigation.menuItemTree(scope.menuName);
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
                scope.sidebarIsCollapsed = !scope.sidebarIsCollapsed;
                setTextCollapseState();
            };
            function setTextCollapseState() {
                var menuItemSelectorBase = 'ul.sidebar-nav:not(.sidebar-nav-nested) > li > a > ';
                var topLevelMenuItemTextSelector = menuItemSelectorBase + 'span > .menu-item-text';
                var topLevelSidebarArrowSelector = menuItemSelectorBase + '.sidebar-arrow';
                var sidebarMenuItemTextElements = element.find(topLevelMenuItemTextSelector + ',' + topLevelSidebarArrowSelector);
                var sidebarElement = element.find('.eeh-navigation-sidebar');
                if (scope.sidebarIsCollapsed) {
                    transcludedWrapper.addClass('sidebar-text-collapsed');
                    sidebarElement.addClass('sidebar-text-collapsed');
                    sidebarMenuItemTextElements.addClass('hidden');
                    scope.sidebarMenuItems.forEach(function (menuItem) {
                        menuItem.isCollapsed = true;
                    });
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
                return scope.searchInputIsVisible || (angular.isArray(scope.sidebarMenuItems) && scope.sidebarMenuItems
                        .filter(function (item) { return item._isVisible(); })
                        .length > 0);
            };

            scope.topLevelMenuItemClickHandler = function (clickedMenuItem) {
                if (!scope.sidebarIsCollapsed || !clickedMenuItem.hasChildren()) {
                    return;
                }
                scope.sidebarMenuItems
                .filter(function (menuItem) {
                    return menuItem.hasChildren() && clickedMenuItem !== menuItem;
                })
                .forEach(function (menuItem) {
                    menuItem.isCollapsed = true;
                });
            };
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationSidebar', SidebarDirective);
