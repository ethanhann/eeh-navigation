(function(exports, global) {
    global["eeh-navigation"] = exports;
    "use strict";
    angular.module("eehNavigation", [ "pascalprecht.translate" ]);
    "use strict";
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
    var ActiveMenuItemDirective = function($state) {
        return {
            restrict: "A",
            scope: {
                menuItem: "=eehNavigationActiveMenuItem"
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
    };
    ActiveMenuItemDirective.$inject = [ "$state" ];
    angular.module("eehNavigation").directive("eehNavigationActiveMenuItem", ActiveMenuItemDirective);
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
        this._iconBaseClass = "glyphicon";
        this._menuItems = {};
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
    NavigationService.prototype.iconBaseClass = function(value) {
        if (angular.isUndefined(value)) {
            return this._iconBaseClass;
        }
        this._iconBaseClass = value;
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
    NavigationService.prototype.menuItemTree = function(menuName) {
        var items = {};
        var self = this;
        var menuItemsToTransform = {};
        if (angular.isDefined(menuName)) {
            var menuNameRegex = new RegExp("^" + menuName + ".");
            angular.forEach(this._menuItems, function(menuItem, menuItemName) {
                if (menuItemName.match(menuNameRegex) !== null) {
                    menuItemsToTransform[menuItemName.replace(menuNameRegex, "")] = menuItem;
                }
            });
        } else {
            menuItemsToTransform = this._menuItems;
        }
        angular.forEach(menuItemsToTransform, function(config, name) {
            self.buildAncestorChain(name, items, config);
        });
        return this._toArray(items);
    };
    NavigationService.prototype.menuItem = function(name, config) {
        if (angular.isUndefined(config)) {
            if (angular.isUndefined(this._menuItems[name])) {
                throw name + " is not a menu item";
            }
            return this._menuItems[name];
        }
        this._menuItems[name] = new MenuItem(config);
        return this;
    };
    NavigationService.prototype.menuItems = function() {
        return this._menuItems;
    };
    angular.module("eehNavigation").provider("eehNavigation", NavigationService);
    "use strict";
    var MenuItemContentDirective = function(eehNavigation) {
        return {
            restrict: "A",
            scope: {
                menuItem: "=eehNavigationMenuItemContent"
            },
            templateUrl: "template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html",
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
            }
        };
    };
    MenuItemContentDirective.$inject = [ "eehNavigation" ];
    angular.module("eehNavigation").directive("eehNavigationMenuItemContent", MenuItemContentDirective);
    "use strict";
    var MenuDirective = function(eehNavigation) {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-navigation/menu/eeh-navigation-menu.html",
            scope: {
                menuName: "=",
                navClass: "=?"
            },
            link: function(scope) {
                scope.navClass = scope.navClass || "navigation-menu";
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                scope.$watch(eehNavigation.menuItems, function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    scope.menuItems = eehNavigation.menuItemTree(scope.menuName);
                }, true);
            }
        };
    };
    MenuDirective.$inject = [ "eehNavigation" ];
    angular.module("eehNavigation").directive("eehNavigationMenu", MenuDirective);
    "use strict";
    var NavbarBrandDirective = function() {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-navigation/navbar/eeh-navigation-navbar-brand.html",
            scope: {
                text: "=",
                state: "=",
                href: "=",
                target: "=",
                src: "=",
                click: "="
            }
        };
    };
    angular.module("eehNavigation").directive("eehNavigationNavbarBrand", NavbarBrandDirective);
    "use strict";
    var NavbarDirective = function($window, eehNavigation) {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-navigation/navbar/eeh-navigation-navbar.html",
            scope: {
                menuName: "=",
                navClass: "=?",
                brandText: "=",
                brandState: "=",
                brandHref: "=",
                brandTarget: "=",
                brandSrc: "=",
                brandClick: "="
            },
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                scope.navClass = scope.navClass || "navbar-default navbar-static-top";
                scope.isNavbarCollapsed = false;
                scope.$watch(eehNavigation.menuItems, function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    var menuItems = eehNavigation.menuItemTree(scope.menuName);
                    scope.leftNavbarMenuItems = menuItems.filter(function(item) {
                        return !item.isHeavy();
                    });
                    scope.rightNavbarMenuItems = menuItems.filter(function(item) {
                        return item.isHeavy();
                    });
                }, true);
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
                scope.$watch(getWindowDimensions, function(newValue) {
                    if (angular.isUndefined(newValue)) {
                        return;
                    }
                    var width = newValue.innerWidth > 0 ? newValue.innerWidth : $window.screen.width;
                    if (width >= 768) {
                        scope.isNavbarCollapsed = false;
                    }
                }, true);
            }
        };
    };
    angular.module("eehNavigation").directive("eehNavigationNavbar", [ "$window", "eehNavigation", NavbarDirective ]);
    "use strict";
    var SearchInputDirective = function($window, eehNavigation) {
        return {
            restrict: "AE",
            transclude: true,
            templateUrl: "template/eeh-navigation/search-input/eeh-navigation-search-input.html",
            scope: {
                iconClass: "=",
                submit: "=",
                classes: "=",
                isCollapsed: "="
            },
            link: function(scope) {
                scope.model = {
                    query: ""
                };
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
            }
        };
    };
    SearchInputDirective.$inject = [ "$window", "eehNavigation" ];
    angular.module("eehNavigation").directive("eehNavigationSearchInput", SearchInputDirective);
    "use strict";
    var SidebarDirective = function($document, $window, eehNavigation) {
        return {
            restrict: "AE",
            transclude: true,
            templateUrl: "template/eeh-navigation/sidebar/eeh-navigation-sidebar.html",
            scope: {
                menuName: "=",
                navClass: "=?",
                topOffset: "=?",
                menuItemCollapsedIconClass: "=?",
                menuItemExpandedIconClass: "=?",
                sidebarCollapsedIconClass: "=?",
                sidebarExpandedIconClass: "=?",
                searchInputIconClass: "=?",
                searchInputIsVisible: "=?",
                searchInputSubmit: "=",
                sidebarCollapsedButtonIsVisible: "=?",
                sidebarIsCollapsed: "=?"
            },
            link: function(scope, element) {
                scope.topOffset = scope.topOffset || 51;
                scope.navClass = scope.navClass || "navbar-default";
                scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || "glyphicon-chevron-left";
                scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || "glyphicon-chevron-down";
                scope.sidebarCollapsedIconClass = scope.sidebarCollapsedIconClass || "glyphicon-arrow-right";
                scope.sidebarExpandedIconClass = scope.sidebarExpandedIconClass || "glyphicon-arrow-left";
                scope.searchInputIconClass = scope.searchInputIconClass || "glyphicon-search";
                if (scope.sidebarCollapsedButtonIsVisible !== false) {
                    scope.sidebarCollapsedButtonIsVisible = true;
                }
                scope.sidebarIsCollapsed = scope.sidebarIsCollapsed || false;
                if (scope.searchInputIsVisible !== false) {
                    scope.searchInputIsVisible = true;
                }
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                var menuItems = function() {
                    return eehNavigation.menuItems();
                };
                scope.$watch(menuItems, function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    scope.sidebarMenuItems = eehNavigation.menuItemTree(scope.menuName);
                }, true);
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
                var transcludedWrapper = element.find("#eeh-navigation-page-wrapper");
                scope.$watch(getWindowDimensions, function(newValue) {
                    if (angular.isUndefined(newValue)) {
                        return;
                    }
                    var height = newValue.innerHeight > 0 ? newValue.innerHeight : $window.screen.height;
                    height = height - scope.topOffset;
                    if (height < 1) {
                        height = 1;
                    }
                    if (height > scope.topOffset) {
                        transcludedWrapper.css("min-height", height + "px");
                    }
                }, true);
                scope.toggleSidebarTextCollapse = function() {
                    scope.sidebarIsCollapsed = !scope.sidebarIsCollapsed;
                    setTextCollapseState();
                };
                function setTextCollapseState() {
                    var menuItemSelectorBase = "ul.sidebar-nav:not(.sidebar-nav-nested) > li > a > ";
                    var topLevelMenuItemTextSelector = menuItemSelectorBase + "span > .menu-item-text";
                    var topLevelSidebarArrowSelector = menuItemSelectorBase + ".sidebar-arrow";
                    var sidebarMenuItemTextElements = element.find(topLevelMenuItemTextSelector + "," + topLevelSidebarArrowSelector);
                    var sidebarElement = element.find(".eeh-navigation-sidebar");
                    if (scope.sidebarIsCollapsed) {
                        transcludedWrapper.addClass("sidebar-text-collapsed");
                        sidebarElement.addClass("sidebar-text-collapsed");
                        sidebarMenuItemTextElements.addClass("hidden");
                        scope.sidebarMenuItems.forEach(function(menuItem) {
                            menuItem.isCollapsed = true;
                        });
                    } else {
                        transcludedWrapper.removeClass("sidebar-text-collapsed");
                        sidebarElement.removeClass("sidebar-text-collapsed");
                        sidebarMenuItemTextElements.removeClass("hidden");
                    }
                }
                scope.$on("$includeContentLoaded", function() {
                    setTextCollapseState();
                });
                scope.isSidebarVisible = function() {
                    return scope.searchInputIsVisible || angular.isArray(scope.sidebarMenuItems) && scope.sidebarMenuItems.filter(function(item) {
                        return item._isVisible();
                    }).length > 0;
                };
                scope.topLevelMenuItemClickHandler = function(clickedMenuItem) {
                    if (!scope.sidebarIsCollapsed || !clickedMenuItem.hasChildren()) {
                        return;
                    }
                    scope.sidebarMenuItems.filter(function(menuItem) {
                        return menuItem.hasChildren() && clickedMenuItem !== menuItem;
                    }).forEach(function(menuItem) {
                        menuItem.isCollapsed = true;
                    });
                };
            }
        };
    };
    SidebarDirective.$inject = [ "$document", "$window", "eehNavigation" ];
    angular.module("eehNavigation").directive("eehNavigationSidebar", SidebarDirective);
})({}, function() {
    return this;
}());