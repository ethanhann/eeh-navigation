(function(exports, global) {
    global["eeh-navigation"] = exports;
    "use strict";
    angular.module("eehTranslate", []);
    var TranslateService = function($injector) {
        if ($injector.has("$translate")) {
            this._translate = $injector.get("$translate");
        }
    };
    TranslateService.prototype.isAvailable = function() {
        return angular.isDefined(this._translate);
    };
    TranslateService.prototype.instant = function(translationId, interpolateParams, interpolationId) {
        return this.isAvailable() ? this._translate.instant(translationId, interpolateParams, interpolationId) : translationId;
    };
    angular.module("eehTranslate").service("eehTranslate", [ "$injector", TranslateService ]);
    var TranslateFilter = function(eehTranslate) {
        var self = this;
        self.eehTranslate = eehTranslate;
        return function(text) {
            return self.eehTranslate.instant(text);
        };
    };
    angular.module("eehTranslate").filter("eehTranslate", [ "eehTranslate", TranslateFilter ]);
    "use strict";
    angular.module("eehNavigation", [ "eehTranslate" ]);
    "use strict";
    var NavigationDirective = function($window, eehNavigation) {
        return {
            restrict: "AE",
            transclude: true,
            templateUrl: "template/eeh-navigation/eeh-navigation.html",
            link: function(scope, element) {
                scope.navbarBrand = eehNavigation.navbarBrand;
                scope.sidebarSearch = eehNavigation.sidebarSearch;
                scope.isNavbarCollapsed = false;
                scope._navbarMenuItems = eehNavigation._navbarMenuItems;
                scope.$watch("_navbarMenuItems", function() {
                    scope.navbarMenuItems = eehNavigation.navbarMenuItems();
                });
                scope._sidebarMenuItems = eehNavigation._sidebarMenuItems;
                scope.$watch("_sidebarMenuItems", function() {
                    scope.sidebarMenuItems = eehNavigation.sidebarMenuItems();
                });
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
                scope.isSidebarTextCollapsed = false;
                scope.toggleSidebarTextCollapse = function() {
                    scope.isSidebarTextCollapsed = !scope.isSidebarTextCollapsed;
                    transcludedWrapper.toggleClass("sidebar-text-collapsed");
                    element.find(".sidebar").toggleClass("sidebar-text-collapsed");
                    element.find(".sidebar .menu-item-text").toggleClass("hidden");
                };
            }
        };
    };
    angular.module("eehNavigation").directive("eehNavigation", [ "$window", "eehNavigation", NavigationDirective ]);
    "use strict";
    var MenuItem = function(config) {
        angular.extend(this, config);
    };
    MenuItem.prototype.children = function() {
        var children = [];
        angular.forEach(this, function(property) {
            if (angular.isObject(property)) {
                children.push(property);
            }
        });
        return children;
    };
    MenuItem.prototype.hasChildren = function() {
        for (var key in this) {
            if (this.hasOwnProperty(key) && angular.isObject(this[key])) {
                return true;
            }
        }
        return false;
    };
    MenuItem.prototype._isVisible = function() {
        if (angular.isFunction(this.isVisible)) {
            return this.isVisible();
        }
        if (angular.isDefined(this.isVisible)) {
            return this.isVisible;
        }
        return true;
    };
    MenuItem.prototype.isVisible = function() {
        return true;
    };
    "use strict";
    var NavigationService = function() {
        this.sidebarSearch = {
            isVisible: true,
            model: "",
            click: function() {}
        };
        this.navbarBrand = {};
        this._navbarMenuItems = {};
        this._sidebarMenuItems = {};
        this._toArray = function(items) {
            var arr = [];
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    arr.push(items[key]);
                }
            }
            return arr;
        };
    };
    NavigationService.prototype.$get = function() {
        return this;
    };
    NavigationService.prototype.buildAncestorChain = function(name, items, config) {
        var keys = name.split(".");
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
        this.buildAncestorChain(keys.join("."), items[key], config);
    };
    NavigationService.prototype.sidebarMenuItem = function(name, config) {
        if (angular.isUndefined(config)) {
            return this._sidebarMenuItems[name];
        }
        this._sidebarMenuItems[name] = new MenuItem(config);
        return this;
    };
    NavigationService.prototype.sidebarMenuItems = function() {
        var items = {};
        var self = this;
        angular.forEach(this._sidebarMenuItems, function(config, name) {
            self.buildAncestorChain(name, items, config);
        });
        return this._toArray(items);
    };
    NavigationService.prototype.navbarMenuItem = function(name, config) {
        if (angular.isUndefined(config)) {
            return this._navbarMenuItems[name];
        }
        this._navbarMenuItems[name] = new MenuItem(config);
        return this;
    };
    NavigationService.prototype.navbarMenuItems = function() {
        var items = {};
        var self = this;
        angular.forEach(this._navbarMenuItems, function(config, name) {
            self.buildAncestorChain(name, items, config);
        });
        return this._toArray(items);
    };
    angular.module("eehNavigation").provider("eehNavigation", NavigationService);
})({}, function() {
    return this;
}());