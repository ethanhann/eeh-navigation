'use strict';
/* global MenuItem */

var NavigationService = function () {
    this._sidebarSearch = {
        isVisible: true,
        model: '',
        submit: function () {}
    };
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

NavigationService.prototype.searchIsVisible = function (value) {
    if (angular.isUndefined(value)) {
        return this._sidebarSearch.isVisible;
    }
    this._sidebarSearch.isVisible = value;
    return this;
};

NavigationService.prototype.searchModel = function (value) {
    if (angular.isUndefined(value)) {
        return this._sidebarSearch.model;
    }
    this._sidebarSearch.model = value;
    return this;
};

NavigationService.prototype.searchSubmit = function (value) {
    if (angular.isUndefined(value)) {
        return this._sidebarSearch.submit;
    }
    this._sidebarSearch.submit = value;
    return this;
};

/**
 * Recursively map a flat array of menu items to a nested object suitable to generate HTML lists from.
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

NavigationService.prototype.sidebarMenuItem = function (name, config) {
    if (angular.isUndefined(config)) {
        if (angular.isUndefined(this._sidebarMenuItems[name])) {
            throw name + ' is not a sidebar menu item';
        }
        return this._sidebarMenuItems[name];
    }
    this._sidebarMenuItems[name] = new MenuItem(config);
    return this;
};

NavigationService.prototype.sidebarMenuItems = function () {
    var items = {};
    var self = this;
    angular.forEach(this._sidebarMenuItems, function (config, name) {
        self.buildAncestorChain(name, items, config);
    });
    return this._toArray(items);
};

NavigationService.prototype.navbarMenuItem = function (name, config) {
    if (angular.isUndefined(config)) {
        if (angular.isUndefined(this._navbarMenuItems[name])) {
            throw name + ' is not a navbar menu item';
        }
        return this._navbarMenuItems[name];
    }
    this._navbarMenuItems[name] = new MenuItem(config);
    return this;
};

NavigationService.prototype.navbarMenuItems = function () {
    var items = {};
    var self = this;
    angular.forEach(this._navbarMenuItems, function (config, name) {
        self.buildAncestorChain(name, items, config);
    });
    return this._toArray(items);
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

NavigationService.prototype.isSidebarVisible = function () {
    return this.searchIsVisible() || this.sidebarMenuItems()
            .filter(function (item) { return item._isVisible(); })
            .length > 0;
};

angular.module('eehNavigation').provider('eehNavigation', NavigationService);
