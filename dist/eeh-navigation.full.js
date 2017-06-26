(function(exports, global) {
    "use strict";
    ActiveMenuItemDirective.$inject = [ "$state" ];
    MenuItemContentDirective.$inject = [ "eehNavigation" ];
    MenuDirective.$inject = [ "eehNavigation" ];
    SearchInputDirective.$inject = [ "eehNavigation" ];
    SidebarDirective.$inject = [ "$window", "eehNavigation" ];
    angular.module("eehNavigation", [ "pascalprecht.translate" ]);
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationActiveMenuItem", ActiveMenuItemDirective);
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
    }
    "use strict";
    var MenuItem = function(config) {
        this.weight = 0;
        this.isIconVisible = true;
        this.isDivider = false;
        this.isReadOnly = false;
        this.ngBindHtml = "";
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
        if (!hasVisibleChildren && !this.isDivider && angular.isUndefined(this.state) && angular.isUndefined(this.href) && angular.isUndefined(this.click) && angular.isUndefined(this.ngInclude) && !this.isReadOnly) {
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
    MenuItem.prototype._ngBindHtml = function() {
        return angular.isFunction(this.ngBindHtml) ? this.ngBindHtml() : this.ngBindHtml;
    };
    "use strict";
    angular.module("eehNavigation").provider("eehNavigation", NavigationService);
    function NavigationService() {
        this._iconBaseClass = "glyphicon";
        this._defaultIconClassPrefix = "glyphicon";
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
    }
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
    NavigationService.prototype.defaultIconClassPrefix = function(value) {
        if (angular.isUndefined(value)) {
            return this._defaultIconClassPrefix;
        }
        this._defaultIconClassPrefix = value;
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
        config.menuItemName = name;
        this._menuItems[name] = new MenuItem(config);
        return this;
    };
    NavigationService.prototype.menuItems = function() {
        return angular.isDefined(this) ? this._menuItems : {};
    };
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationMenuItemContent", MenuItemContentDirective);
    function MenuItemContentDirective(eehNavigation) {
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
    }
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationMenu", MenuDirective);
    function MenuDirective(eehNavigation) {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-navigation/menu/eeh-navigation-menu.html",
            scope: {
                menuName: "=",
                navClass: "=?",
                menuItemCollapsedIconClass: "=?",
                menuItemExpandedIconClass: "=?",
                refresh: "=?"
            },
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                scope.defaultIconClassPrefix = function() {
                    return eehNavigation.defaultIconClassPrefix();
                };
                scope.navClass = scope.navClass || "navigation-menu";
                scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || scope.defaultIconClassPrefix() + "-chevron-left";
                scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || scope.defaultIconClassPrefix() + "-chevron-down";
                scope.refresh = function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    scope.menuItems = eehNavigation.menuItemTree(scope.menuName);
                };
                scope.$watch(eehNavigation.menuItems, scope.refresh, true);
            }
        };
    }
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationNavbarBrand", NavbarBrandDirective);
    function NavbarBrandDirective() {
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
    }
    "use strict";
    var NavbarDirective = function($window, eehNavigation) {
        return {
            restrict: "AE",
            templateUrl: "template/eeh-navigation/navbar/eeh-navigation-navbar.html",
            scope: {
                menuName: "=",
                navClass: "=?",
                containerClass: "=?",
                brandText: "=",
                brandState: "=",
                brandHref: "=",
                brandTarget: "=",
                brandSrc: "=",
                brandClick: "=",
                refresh: "=?"
            },
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                scope.navClass = scope.navClass || "navbar-default navbar-static-top";
                scope.isNavbarCollapsed = true;
                scope.refresh = function() {
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
                };
                scope.$watch(eehNavigation.menuItems, scope.refresh, true);
                var windowElement = angular.element($window);
                windowElement.bind("resize", function() {
                    scope.$apply();
                });
                var getWindowDimensions = function() {
                    return {
                        innerHeight: windowElement[0].innerHeight,
                        innerWidth: windowElement[0].innerWidth
                    };
                };
                scope.$watch(getWindowDimensions, function(newValue) {
                    if (angular.isUndefined(newValue)) {
                        return;
                    }
                    var width = newValue.innerWidth > 0 ? newValue.innerWidth : $window.screen.width;
                    if (width >= 768) {
                        scope.isNavbarCollapsed = true;
                    }
                }, true);
            }
        };
    };
    angular.module("eehNavigation").directive("eehNavigationNavbar", [ "$window", "eehNavigation", NavbarDirective ]);
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationSearchInput", SearchInputDirective);
    function SearchInputDirective(eehNavigation) {
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
    }
    "use strict";
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
    }
    "use strict";
    angular.module("eehNavigation").directive("eehNavigationSidebar", SidebarDirective);
    function SidebarDirective($window, eehNavigation) {
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
                sidebarIsCollapsed: "=?",
                refresh: "=?"
            },
            link: function(scope) {
                scope.iconBaseClass = function() {
                    return eehNavigation.iconBaseClass();
                };
                scope.defaultIconClassPrefix = function() {
                    return eehNavigation.defaultIconClassPrefix();
                };
                scope.topOffset = scope.topOffset || 51;
                scope.navClass = scope.navClass || "navbar-default";
                scope.menuItemCollapsedIconClass = scope.menuItemCollapsedIconClass || scope.defaultIconClassPrefix() + "-chevron-left";
                scope.menuItemExpandedIconClass = scope.menuItemExpandedIconClass || scope.defaultIconClassPrefix() + "-chevron-down";
                scope.sidebarCollapsedIconClass = scope.sidebarCollapsedIconClass || scope.defaultIconClassPrefix() + "-arrow-right";
                scope.sidebarExpandedIconClass = scope.sidebarExpandedIconClass || scope.defaultIconClassPrefix() + "-arrow-left";
                scope.searchInputIconClass = scope.searchInputIconClass || scope.defaultIconClassPrefix() + "-search";
                if (scope.sidebarCollapsedButtonIsVisible !== false) {
                    scope.sidebarCollapsedButtonIsVisible = true;
                }
                scope.sidebarIsCollapsed = scope.sidebarIsCollapsed || false;
                if (scope.searchInputIsVisible !== false) {
                    scope.searchInputIsVisible = true;
                }
                var menuItems = function() {
                    return eehNavigation.menuItems();
                };
                scope.refresh = function() {
                    if (angular.isUndefined(scope.menuName)) {
                        return;
                    }
                    scope.sidebarMenuItems = eehNavigation.menuItemTree(scope.menuName);
                };
                scope.$watch(menuItems, scope.refresh, true);
                var windowElement = angular.element($window);
                windowElement.bind("resize", function() {
                    scope.$apply();
                });
                var getWindowDimensions = function() {
                    return {
                        innerHeight: windowElement[0].innerHeight,
                        innerWidth: windowElement[0].innerWidth
                    };
                };
                var transcludedWrapper = angular.element(document.querySelectorAll("#eeh-navigation-page-wrapper"));
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
                    var sidebarMenuItems = angular.element(document.querySelectorAll("ul.sidebar-nav:not(.sidebar-nav-nested) > li > a > span"));
                    var sidebarMenuItemText = sidebarMenuItems.find("span");
                    var allMenuItemTextElements = Array.prototype.filter.call(sidebarMenuItemText, function(item) {
                        return item.matches(".menu-item-text");
                    });
                    var arrowIconElements = Array.prototype.filter.call(sidebarMenuItems, function(item) {
                        return item.matches(".sidebar-arrow");
                    });
                    var sidebarElement = angular.element(document.querySelectorAll(".eeh-navigation-sidebar"));
                    if (scope.sidebarIsCollapsed) {
                        transcludedWrapper.addClass("sidebar-text-collapsed");
                        sidebarElement.addClass("sidebar-text-collapsed");
                        allMenuItemTextElements.forEach(function(menuItem) {
                            angular.element(menuItem).addClass("hidden");
                        });
                        arrowIconElements.forEach(function(menuItem) {
                            angular.element(menuItem).addClass("hidden");
                        });
                        angular.forEach(menuItems(), function(menuItem) {
                            menuItem.isCollapsed = true;
                        });
                    } else {
                        transcludedWrapper.removeClass("sidebar-text-collapsed");
                        sidebarElement.removeClass("sidebar-text-collapsed");
                        allMenuItemTextElements.forEach(function(menuItem) {
                            angular.element(menuItem).removeClass("hidden");
                        });
                        arrowIconElements.forEach(function(menuItem) {
                            angular.element(menuItem).removeClass("hidden");
                        });
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
    }
    angular.module("eehNavigation").run([ "$templateCache", function($templateCache) {
        "use strict";
        $templateCache.put("template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html", '<span ng-if="menuItem.isIconVisible"\n' + '      class="menu-item-icon icon-fw {{ iconBaseClass() }} {{ menuItem.iconClass}}"></span>\n' + '<span ng-if="menuItem.text"\n' + '      class="menu-item-text"> {{ menuItem.text|translate }}</span>\n' + '<span ng-if="menuItem._ngBindHtml()" ng-bind-html="menuItem._ngBindHtml()"></span>\n');
        $templateCache.put("template/eeh-navigation/menu/eeh-navigation-menu.html", '<nav ng-class="navClass">\n' + "    <ul>\n" + "        <li ng-repeat=\"item in menuItems | orderBy:'weight'\"\n" + "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-menu-' + item.menuItemName}}\"\n" + "            ng-include=\"'template/eeh-navigation/list-menu-item.html'\"\n" + "            ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" + '            ng-if="item._isVisible()"\n' + '            eeh-navigation-active-menu-item="item"></li>\n' + "    </ul>\n" + "</nav>\n" + "\n" + '<script type="text/ng-template" id="template/eeh-navigation/list-menu-item.html">\n' + '    <p ng-if="item.isReadOnly" class="read-only-menu-item">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </p>\n" + '    <span ng-if="item.ngInclude" ng-include="item.ngInclude"></span>\n' + '    <a ng-if="item.state" ui-sref="{{item.state}}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.click" ng-click="item.click()">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.href" ng-href="{{item.href}}" target="{{item.target ? item.target : \'_self\'}}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="!item.state && item.hasChildren()">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + '        <span class="float-right icon-fw {{ iconBaseClass() }}"\n' + '              ng-class="item.isCollapsed ? menuItemCollapsedIconClass : menuItemExpandedIconClass"></span>\n' + "    </a>\n" + '    <ul ng-if="!item.state && item.hasChildren()">\n' + '        <li ng-repeat="item in item.children()"\n' + "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-menu-' + item.menuItemName}}\"\n" + "            ng-include=\"'template/eeh-navigation/list-menu-item.html'\"\n" + '            ng-if="item._isVisible()"\n' + '            eeh-navigation-active-menu-item="item"></li>\n' + "    </ul>\n" + "<\/script>\n");
        $templateCache.put("template/eeh-navigation/navbar/eeh-navigation-navbar-brand.html", '<a ng-if="state && !href && (text || src)"\n' + '   class="navbar-brand"\n' + '   ng-click="click()"\n' + '   ui-sref="{{ state }}">\n' + "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" + "</a>\n" + "\n" + '<a ng-if="!state && href && (text || src)"\n' + '   class="navbar-brand"\n' + '   ng-click="click()"\n' + '   ng-href="{{ href }}"\n' + "   target=\"{{ target ? target : '_self'}}\">\n" + "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" + "</a>\n" + "\n" + '<span ng-if="!state && !href && (text || src)"\n' + '      ng-click="click()"\n' + '      class="navbar-brand">\n' + "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" + "</span>\n" + "\n" + '<script type="text/ng-template" id="template/eeh-navigation/navbar-brand-content.html">\n' + '    <img ng-if="src" ng-src="{{ src }}">\n' + '    <span ng-if="text">{{ text|translate }}</span>\n' + "<\/script>\n" + "\n");
        $templateCache.put("template/eeh-navigation/navbar/eeh-navigation-navbar.html", '<nav class="navbar eeh-navigation eeh-navigation-navbar"\n' + '     ng-class="navClass"\n' + '     role="navigation">\n' + '    <div ng-class="containerClass">\n' + '        <div class="navbar-header">\n' + '            <button type="button" class="navbar-toggle" ng-click="isNavbarCollapsed = !isNavbarCollapsed">\n' + '                <span class="sr-only">Toggle navigation</span>\n' + '                <span class="icon-bar"></span>\n' + '                <span class="icon-bar"></span>\n' + '                <span class="icon-bar"></span>\n' + "            </button>\n" + '            <eeh-navigation-navbar-brand text="brandText"\n' + '                                         state="brandState"\n' + '                                         href="brandHref"\n' + '                                         target="brandTarget"\n' + '                                         src="brandSrc"\n' + '                                         click="brandClick"></eeh-navigation-navbar-brand>\n' + "        </div>\n" + '        <div uib-collapse="isNavbarCollapsed" class="navbar-collapse">\n' + '            <ul class="nav navbar-nav navbar-left">\n' + "                <li ng-repeat=\"item in leftNavbarMenuItems | orderBy:'weight'\"\n" + "                    ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" + "                    ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" + '                    ng-if="item._isVisible()"\n' + "                    uib-dropdown\n" + '                    ui-sref-active-eq="active"\n' + '                    eeh-navigation-active-menu-item="item">\n' + "                </li>\n" + "            </ul>\n" + '            <ul class="nav navbar-nav navbar-right">\n' + "                <li ng-repeat=\"item in rightNavbarMenuItems | orderBy:'weight'\"\n" + "                    ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" + "                    ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" + '                    ng-if="item._isVisible()"\n' + "                    uib-dropdown\n" + '                    ui-sref-active-eq="active"\n' + '                    eeh-navigation-active-menu-item="item"></li>\n' + "            </ul>\n" + "        </div>\n" + "    </div>\n" + "</nav>\n" + "\n" + '<script type="text/ng-template" id="template/eeh-navigation/navbar-menu-item.html">\n' + '    <p ng-if="item.isReadOnly" class="navbar-text">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </p>\n" + '    <span ng-if="item.ngInclude" ng-include="item.ngInclude"></span>\n' + '    <a ng-if="!item.isDivider && item.state" ui-sref="{{ item.state }}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.click" ng-click="item.click()">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.href" ng-href="{{item.href}}" target="{{item.target ? item.target : \'_self\'}}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.hasChildren()" uib-dropdown-toggle="">\n' + '        <span class="icon-fw {{ iconBaseClass() }} {{ item.iconClass }}"></span>\n' + "        <span> {{ item.text|translate }}</span>\n" + '        <span class="caret"></span>\n' + "    </a>\n" + '    <ul ng-if="item.hasChildren()" class="dropdown-menu">\n' + "        <li ng-repeat=\"item in item.children()|orderBy:'weight'\"\n" + "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" + "            ng-class=\"{'divider': item.isDivider}\"\n" + "            ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" + '            ng-if="item._isVisible()"\n' + '            ui-sref-active-eq="active"></li>\n' + "    </ul>\n" + "<\/script>\n");
        $templateCache.put("template/eeh-navigation/search-input/eeh-navigation-search-input.html", "<div ng-include=\"'template/eeh-navigation/search-input.html'\"\n" + '     ng-if="!isCollapsed"\n' + '     class="eeh-navigation-search-input"></div>\n' + "\n" + '<a class="eeh-navigation-search-input" ng-href="" ng-if="isCollapsed"\n' + '   popover-placement="right"\n' + "   popover-append-to-body=\"'true'\"\n" + "   uib-popover-template=\"'template/eeh-navigation/search-input-popover.html'\">\n" + '    <span class="menu-item-icon icon-fw {{ iconBaseClass() }} {{ iconClass }}"></span>\n' + "</a>\n" + '<script type="text/ng-template" id="template/eeh-navigation/search-input-popover.html">\n' + '    <div class="row search-input-popover">\n' + '        <div class="col-xs-12">\n' + "            <div ng-include=\"'template/eeh-navigation/search-input.html'\"></div>\n" + "        </div>\n" + "    </div>\n" + "<\/script>\n" + "\n" + '<script type="text/ng-template" id="template/eeh-navigation/search-input.html">\n' + '    <form ng-submit="submit(model.query)" class="navbar-form" ng-class="classes">\n' + '        <div class="input-group">\n' + '            <input type="text"\n' + '                   class="form-control"\n' + "                   placeholder=\"{{'Search'|translate}}\"\n" + '                   ng-model="model.query">\n' + '        <span class="input-group-btn" ng-if="!isCollapsed">\n' + '            <button class="btn btn-default">\n' + '                <span class="icon-fw {{ iconBaseClass() }} {{ iconClass }}"></span>\n' + "            </button>\n" + "        </span>\n" + "        </div>\n" + "    </form>\n" + "<\/script>\n");
        $templateCache.put("template/eeh-navigation/sidebar/eeh-navigation-sidebar.html", '<nav class="navbar navbar-default eeh-navigation eeh-navigation-sidebar" role="navigation"\n' + '    ng-class="navClass">\n' + '    <div class="navbar-collapse" uib-collapse="isNavbarCollapsed">\n' + '        <ul class="nav sidebar-nav">\n' + '            <li class="sidebar-search" ng-if="searchInputIsVisible">\n' + '                <eeh-navigation-search-input class="sidebar-search-input"\n' + '                                             icon-class="searchInputIconClass"\n' + '                                             submit="searchInputSubmit"\n' + '                                             is-collapsed="sidebarIsCollapsed"></eeh-navigation-search-input>\n' + "            </li>\n" + "            <li ng-repeat=\"item in sidebarMenuItems | orderBy:'weight'\"\n" + "                ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-sidebar-' + item.menuItemName}}\"\n" + "                ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" + "                ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" + '                ng-if="item._isVisible()"\n' + '                ng-click="topLevelMenuItemClickHandler(item)"\n' + '                ui-sref-active-eq="active"\n' + '                eeh-navigation-active-menu-item="item"></li>\n' + '            <li ng-click="toggleSidebarTextCollapse()" ng-if="sidebarCollapsedButtonIsVisible && isSidebarVisible()">\n' + "                <a>\n" + '                    <span class="icon-fw {{ iconBaseClass() }}" ng-class="sidebarIsCollapsed ? sidebarCollapsedIconClass : sidebarExpandedIconClass"></span>\n' + "                </a>\n" + "            </li>\n" + "        </ul>\n" + "    </div>\n" + "</nav>\n" + "\n" + '<div id="eeh-navigation-page-wrapper" ng-class="{ \'sidebar-invisible\': !isSidebarVisible() }">\n' + '    <div class="row">\n' + '        <div class="col-lg-12">\n' + "            <div ng-transclude></div>\n" + "        </div>\n" + "    </div>\n" + "</div>\n" + "\n" + '<script type="text/ng-template" id="template/eeh-navigation/sidebar-menu-item.html">\n' + '    <p ng-if="item.isReadOnly" class="navbar-text">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </p>\n" + '    <span ng-if="item.ngInclude" ng-include="item.ngInclude"></span>\n' + '    <a ng-if="item.state" ui-sref="{{item.state}}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.click" ng-click="item.click()">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="item.href" ng-href="{{item.href}}" target="{{item.target ? item.target : \'_self\'}}">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + "    </a>\n" + '    <a ng-if="!item.state && item.hasChildren()"\n' + '       ng-click="item.isCollapsed = !item.isCollapsed">\n' + '        <span eeh-navigation-menu-item-content="item"></span>\n' + '        <span class="navbar-right sidebar-arrow icon-fw {{ iconBaseClass() }}"\n' + '              ng-class="item.isCollapsed ? menuItemCollapsedIconClass : menuItemExpandedIconClass"></span>\n' + "    </a>\n" + '    <ul ng-if="!item.state && item.hasChildren()" uib-collapse="item.isCollapsed"\n' + "        ng-class=\"{ 'text-collapsed': sidebarIsCollapsed }\"\n" + '        class="nav sidebar-nav sidebar-nav-nested">\n' + "        <li ng-repeat=\"item in item.children() | orderBy:'weight'\"\n" + "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-sidebar-' + item.menuItemName}}\"\n" + "            ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" + "            ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" + '            ng-if="item._isVisible()"\n' + '            ui-sref-active-eq="active"\n' + '            eeh-navigation-active-menu-item="item"></li>\n' + "    </ul>\n" + "<\/script>\n");
    } ]);
    global["eeh-navigation"] = exports;
})({}, function() {
    return this;
}());