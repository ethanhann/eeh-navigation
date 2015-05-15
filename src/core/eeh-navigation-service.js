'use strict';
/* global MenuItem */

var NavigationService = function () {
    this._iconBaseClass = 'glyphicon';
    this._sidebarTextCollapse = {
        isVisible: true,
        isCollapsed: false
    };
    this.navbarBrand = this._navbarBrand = {
        text: '',
        state: '',
        href: '',
        src: ''
    };
    this._menuItems = {};
    this._navbarMenuItems = {};
    this._sidebarMenuItems = {};
    this._toArray = function (items) {
        var arr = [];
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                arr.push(items[key]);
            }
        }
        return arr;
    };
};

NavigationService.prototype.$get = function () {
    return this;
};

NavigationService.prototype.iconBaseClass = function (value) {
    if (angular.isUndefined(value)) {
        return this._iconBaseClass;
    }
    this._iconBaseClass = value;
    return this;
};



/**
 * Recursively map a flat array of menu items to a nested object suitable to generate hierarchical HTML from.
 */
NavigationService.prototype.buildAncestorChain = function (name, items, config) {
    var keys = name.split('.');
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
    this.buildAncestorChain(keys.join('.'), items[key], config);
};

NavigationService.prototype.menuItemTree = function (rootMenuName) {
    var items = {};
    var self = this;
    var menuItemsToTransform = {};
    if (angular.isDefined(rootMenuName)) {
        var rootMenuNameRegex = new RegExp('^' + rootMenuName + '.');
        angular.forEach(this._menuItems, function (menuItem, menuItemName) {
            if (menuItemName.match(rootMenuNameRegex) !== null) {
                menuItemsToTransform[menuItemName.replace(rootMenuNameRegex, '')] = menuItem;
            }
        });
    } else {
        menuItemsToTransform = this._menuItems;
    }
    angular.forEach(menuItemsToTransform, function (config, name) {
        self.buildAncestorChain(name, items, config);
    });
    return this._toArray(items);
};

NavigationService.prototype.menuItem = function (name, config) {
    if (angular.isUndefined(config)) {
        if (angular.isUndefined(this._menuItems[name])) {
            throw name + ' is not a menu item';
        }
        return this._menuItems[name];
    }
    this._menuItems[name] = new MenuItem(config);
    return this;
};

NavigationService.prototype.menuItems = function () {
    return this._menuItems;
};

NavigationService.prototype.sidebarTextCollapseIsVisible = function (value) {
    if (angular.isUndefined(value)) {
        return this._sidebarTextCollapse.isVisible;
    }
    this._sidebarTextCollapse.isVisible = value;
    return this;
};

NavigationService.prototype.sidebarTextCollapseIsCollapsed = function (value) {
    if (angular.isUndefined(value)) {
        return this._sidebarTextCollapse.isCollapsed;
    }
    this._sidebarTextCollapse.isCollapsed = value;
    return this;
};

NavigationService.prototype.sidebarTextCollapseToggleCollapsed = function () {
    this._sidebarTextCollapse.isCollapsed = !this._sidebarTextCollapse.isCollapsed;
    return this;
};

angular.module('eehNavigation').provider('eehNavigation', NavigationService);
