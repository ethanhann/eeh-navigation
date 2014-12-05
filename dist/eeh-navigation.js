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
                scope._navbarBrand = eehNavigation._navbarBrand;
                scope._sidebarTextCollapse = eehNavigation._sidebarTextCollapse;
                scope._sidebarSearch = eehNavigation._sidebarSearch;
                scope.isNavbarCollapsed = false;
                scope._navbarMenuItems = eehNavigation._navbarMenuItems;
                scope.$watch("_navbarMenuItems", function() {
                    var navbarMenuItems = eehNavigation.navbarMenuItems();
                    scope.leftNavbarMenuItems = navbarMenuItems.filter(function(item) {
                        return !item.isHeavy();
                    });
                    scope.rightNavbarMenuItems = navbarMenuItems.filter(function(item) {
                        return item.isHeavy();
                    });
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
                scope.toggleSidebarTextCollapse = function() {
                    eehNavigation.sidebarTextCollapseToggleCollapsed();
                    setTextCollapseState();
                };
                function setTextCollapseState() {
                    var sidebarMenuItemTextElements = element.find(".sidebar .menu-item-text");
                    var sidebarElement = element.find(".sidebar");
                    if (eehNavigation.sidebarTextCollapseIsCollapsed()) {
                        transcludedWrapper.addClass("sidebar-text-collapsed");
                        sidebarElement.addClass("sidebar-text-collapsed");
                        sidebarMenuItemTextElements.addClass("hidden");
                    } else {
                        transcludedWrapper.removeClass("sidebar-text-collapsed");
                        sidebarElement.removeClass("sidebar-text-collapsed");
                        sidebarMenuItemTextElements.removeClass("hidden");
                    }
                }
                scope.$on("$includeContentLoaded", function() {
                    setTextCollapseState();
                });
            }
        };
    };
    angular.module("eehNavigation").directive("eehNavigation", [ "$window", "eehNavigation", NavigationDirective ]);
    var ActiveParentMenuItemDirective = function($location) {
        return {
            restrict: "A",
            link: function(scope, element) {
                var parent = element.parent().parent().prev();
                var activeClass = "active";
                scope.$watch(function() {
                    return $location.url();
                }, function() {
                    parent.toggleClass(activeClass, element.hasClass(activeClass));
                });
            }
        };
    };
    angular.module("eehNavigation").directive("eehActiveParentMenuItem", ActiveParentMenuItemDirective);
    "use strict";
    var MenuItem = function(config) {
        this.weight = 0;
        angular.extend(this, config);
    };
    MenuItem.prototype.children = function() {
        var children = [];
        angular.forEach(this, function(property) {
            if (angular.isObject(property) && property instanceof MenuItem) {
                children.push(property);
            }
        });
        return children;
    };
    MenuItem.prototype.hasChildren = function() {
        return this.children().length > 0;
    };
    MenuItem.prototype._isVisible = function() {
        var hasVisibleChildren = this.children().filter(function(child) {
            return child._isVisible() !== false;
        }).length > 0;
        if (!hasVisibleChildren && angular.isUndefined(this.state) && angular.isUndefined(this.href) && angular.isUndefined(this.click) && !this.isDivider) {
            return false;
        }
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
    MenuItem.prototype.isHeavy = function() {
        if (this.hasOwnProperty("weight")) {
            return this.weight >= 0;
        }
    };
    "use strict";
    var NavigationService = function() {
        this._sidebarSearch = {
            isVisible: true,
            model: "",
            submit: function() {}
        };
        this._sidebarTextCollapse = {
            isVisible: true,
            isCollapsed: false
        };
        this.navbarBrand = this._navbarBrand = {
            text: "",
            state: "",
            href: "",
            src: ""
        };
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
    NavigationService.prototype.searchIsVisible = function(value) {
        if (angular.isUndefined(value)) {
            return this._sidebarSearch.isVisible;
        }
        this._sidebarSearch.isVisible = value;
        return this;
    };
    NavigationService.prototype.searchModel = function(value) {
        if (angular.isUndefined(value)) {
            return this._sidebarSearch.model;
        }
        this._sidebarSearch.model = value;
        return this;
    };
    NavigationService.prototype.searchSubmit = function(value) {
        if (angular.isUndefined(value)) {
            return this._sidebarSearch.submit;
        }
        this._sidebarSearch.submit = value;
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
            if (angular.isUndefined(this._sidebarMenuItems[name])) {
                throw name + " is not a sidebar menu item";
            }
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
            if (angular.isUndefined(this._navbarMenuItems[name])) {
                throw name + " is not a navbar menu item";
            }
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
    NavigationService.prototype.sidebarTextCollapseIsVisible = function(value) {
        if (angular.isUndefined(value)) {
            return this._sidebarTextCollapse.isVisible;
        }
        this._sidebarTextCollapse.isVisible = value;
        return this;
    };
    NavigationService.prototype.sidebarTextCollapseIsCollapsed = function(value) {
        if (angular.isUndefined(value)) {
            return this._sidebarTextCollapse.isCollapsed;
        }
        this._sidebarTextCollapse.isCollapsed = value;
        return this;
    };
    NavigationService.prototype.sidebarTextCollapseToggleCollapsed = function() {
        this._sidebarTextCollapse.isCollapsed = !this._sidebarTextCollapse.isCollapsed;
        return this;
    };
    angular.module("eehNavigation").provider("eehNavigation", NavigationService);
})({}, function() {
    return this;
}());