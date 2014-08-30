(function(exports, global) {
    global["navigation"] = exports;
    "use strict";
    angular.module("eehNavigation", []).provider("eehNavigation", function() {
        var self = this;
        self.sidebarSearch = {
            isVisible: true,
            model: "",
            click: function() {}
        };
        self.sidebarItems = [];
        self.navbarBrand = {};
        self.navbarDropdowns = [];
        self.$get = function() {
            return {
                sidebarSearch: self.sidebarSearch,
                navbarBrand: self.navbarBrand,
                navbarDropdowns: self.navbarDropdowns,
                sidebarItems: self.sidebarItems
            };
        };
    }).directive("eehNavigation", [ "$window", "eehNavigation", function($window, eehNavigation) {
        return {
            restrict: "AE",
            transclude: true,
            templateUrl: "template/eeh-navigation/navigation.html",
            link: function(scope, element) {
                scope.navbarBrand = eehNavigation.navbarBrand;
                scope.navbarDropdowns = eehNavigation.navbarDropdowns;
                scope.items = eehNavigation.sidebarItems;
                scope.sidebarSearch = eehNavigation.sidebarSearch;
                scope.isNavbarCollapsed = false;
                var windowElement = angular.element($window);
                windowElement.bind("resize", function() {
                    scope.$apply();
                });
                var getWindowDimensions = function() {
                    return {
                        height: windowElement.height(),
                        width: windowElement.width(),
                        innerHeight: windowElement.innerHeight(),
                        innerWidth: windowElement.innerWidth()
                    };
                };
                var topOffset = 50;
                var transcludedWrapper = element.find("#eeh-navigation-page-wrapper");
                scope.$watch(getWindowDimensions, function(newValue) {
                    if (angular.isUndefined(newValue)) {
                        return;
                    }
                    var width = newValue.innerWidth > 0 ? newValue.innerWidth : $window.screen.width;
                    if (width < 768) {
                        scope.isNavbarCollapsed = true;
                        topOffset = 100;
                    } else {
                        scope.isNavbarCollapsed = false;
                    }
                    var height = newValue.innerHeight > 0 ? newValue.innerHeight : $window.screen.height;
                    height = height - topOffset;
                    if (height < 1) {
                        height = 1;
                    }
                    if (height > topOffset) {
                        transcludedWrapper.css("min-height", height + "px");
                    }
                }, true);
                scope.isVisible = function(item) {
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
                    transcludedWrapper.toggleClass("sidebar-text-collapsed");
                    element.find(".sidebar").toggleClass("sidebar-text-collapsed");
                    element.find(".sidebar .menu-item-text").toggleClass("hidden");
                };
            }
        };
    } ]);
})({}, function() {
    return this;
}());