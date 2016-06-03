(function(exports, global) {
    global["eeh-menu"] = exports;
    "use strict";
    angular.module("eehMenu", [ "pascalprecht.translate" ]);
    "use strict";
    angular.module("eehMenu").factory("menuJsMenu", MenuService);
    function MenuService($window) {
        return new $window.MenuJs.Menu();
    }
    MenuService.$inject = [ "$window" ];
    "use strict";
    angular.module("eehMenu").directive("eehMenuActiveMenuItem", ActiveMenuItemDirective);
    function isMenuItemActive(menuItem, $state) {
        if (!menuItem.hasChildren()) {
            return angular.isDefined(menuItem.state) && $state.includes(menuItem.state);
        }
        var children = menuItem.children();
        for (var i = 0; i < children.length; i++) {
            if (angular.isDefined(children[i].state) && $state.includes(children[i].state)) {
                return true;
            }
            if (isMenuItemActive(children[i], $state)) {
                return true;
            }
        }
        return false;
    }
    function ActiveMenuItemDirective($state) {
        return {
            restrict: "A",
            scope: {
                menuItem: "=eehMenuActiveMenuItem"
            },
            link: function(scope, element) {
                var checkIsActive = function() {
                    var isActive = isMenuItemActive(scope.menuItem, $state);
                    element.toggleClass("active", isActive);
                };
                scope.$on("$stateChangeSuccess", checkIsActive);
                checkIsActive();
            }
        };
    }
    ActiveMenuItemDirective.$inject = [ "$state" ];
    "use strict";
    angular.module("eehMenu").directive("eehMenu", MenuDirective);
    function MenuDirective(eehMenu) {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-menu/eeh-menu.html",
            scope: {
                menuName: "=",
                navClass: "=?",
                menuItemCollapsedIconClass: "=?",
                menuItemExpandedIconClass: "=?"
            },
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehMenu.iconBaseClass();
                };
                scope.defaultIconClassPrefix = function() {
                    return eehMenu.defaultIconClassPrefix();
                };
                scope.navClass = scope.navClass || "navigation-menu";
                scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || scope.defaultIconClassPrefix() + "-chevron-left";
                scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || scope.defaultIconClassPrefix() + "-chevron-down";
                scope.$watch(eehMenu.menuItems, function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    scope.menuItems = eehMenu.menuItemTree(scope.menuName);
                }, true);
            }
        };
    }
    MenuDirective.$inject = [ "eehMenu" ];
    "use strict";
    angular.module("eehMenu").directive("eehMenuMenuItemContent", MenuItemContentDirective);
    function MenuItemContentDirective(eehMenu) {
        return {
            restrict: "A",
            scope: {
                menuItem: "=eehMenuMenuItemContent"
            },
            templateUrl: "template/eeh-menu/eeh-menu.menu-item-content.html",
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehMenu.iconBaseClass();
                };
            }
        };
    }
    MenuItemContentDirective.$inject = [ "eehMenu" ];
    "use strict";
    angular.module("eehMenu").provider("eehMenu", NavigationProvider);
    function NavigationProvider() {
        this._iconBaseClass = "glyphicon";
        this._defaultIconClassPrefix = "glyphicon";
        this._menuItems = {};
    }
    NavigationProvider.prototype.iconBaseClass = function(value) {
        if (angular.isUndefined(value)) {
            return this._iconBaseClass;
        }
        this._iconBaseClass = value;
        return this;
    };
    NavigationProvider.prototype.defaultIconClassPrefix = function(value) {
        if (angular.isUndefined(value)) {
            return this._defaultIconClassPrefix;
        }
        this._defaultIconClassPrefix = value;
        return this;
    };
    NavigationProvider.prototype.menuItem = function(name, config) {
        this._menuItems[name] = config;
        return this;
    };
    NavigationProvider.prototype.$get = function(menuJsMenu) {
        return new NavigationService(menuJsMenu, this._menuItems, this._iconBaseClass, this._defaultIconClassPrefix);
    };
    NavigationProvider.prototype.$get.$inject = [ "menuJsMenu" ];
    function NavigationService(menu, menuItems, iconBaseClass, defaultIconClassPrefix) {
        this._menu = menu;
        this._iconBaseClass = iconBaseClass;
        this.defaultIconClassPrefix = defaultIconClassPrefix;
        var self = this;
        this.menuItems = function() {
            return self._menu._menuItems;
        };
        angular.forEach(menuItems, function(menuItem, menuItemName) {
            self.menuItem(menuItemName, menuItem);
        });
    }
    NavigationService.prototype.iconBaseClass = function() {
        return this._iconBaseClass;
    };
    NavigationService.prototype.defaultIconClassPrefix = function() {
        return this._defaultIconClassPrefix;
    };
    NavigationService.prototype.menuItemTree = function(menuName) {
        return this._menu.menuItemTree(menuName);
    };
    NavigationService.prototype.menuItem = function(name, config) {
        if (angular.isUndefined(config)) {
            return this._menu.menuItem(name);
        }
        if (angular.isUndefined(config.isVisible)) {
            config.isVisible = function() {
                return this.hasVisibleChildren() || (angular.isDefined(this.state) || angular.isDefined(this.href) || angular.isDefined(this.click) || this.isDivider);
            };
        }
        this._menu.menuItem(name, config);
        return this;
    };
})({}, function() {
    return this;
}());