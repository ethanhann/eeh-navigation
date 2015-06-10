'use strict';
/* global MenuItem */

/**
 * @ngdoc service
 * @name eehNavigation
 *
 * @description
 * Menus are built using this service.
 *
 * ## Creating Menu Items
 *
 * A menu item is added to a menu by using the service's __menuItem__ method.
 * In the code below "foo" is the name of the menu.
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('foo.home', {
 *     text: 'Home',
 *     href: '/home'
 * });
 * ```
 *
 * ## Accessing Menu Items in Controllers, Services, and Directives
 *
 * Menu items can be accessed wherever __eehNavigation__ is injected - namely in controllers, services, and directives.
 * Menu items are accessed by referencing the menu item name after injecting the **eehNavigation** service.
 *
 * ```javascript
 * angular.module('myApp')
 * .controller('MyCtrl', ['eehNavigation', function (eehNavigation) {
 *     // "foo.home" was defined elsewhere.
 *     eehNavigation.menuItem('foo.home').text = 'New Menu Item Text;
 * }]);
 * ```
 *
 * It is possible to create a menu item with the __eehNavigation__ service, but it is not recommended.
 * Instead, create the menu item in __.config__ and only do minimal wiring/contextual configuration elsewhere
 * with the __eehNavigation__ service.
 *
 * ```javascript
 * // In .config, setup a logout menu item.
 * eehNavigationProvider
 * .menuItem('foo.logout', {
 *     text: 'Logout'
 * });
 *
 * // ...
 *
 * // In a controller or service, set the click property of the menu item.
 * eehNavigation
 * .menuItem('foo.logout').click = function () {
 *     // Call custom logout code (e.g. destroy a cookie, delete user object, send logout request to server).
 * };
 * ```
 *
 * ## Menu Item Link Actions
 *
 * There are three mutually exclusive, configurable menu item actions:
 * __href__, __click__, and __state__. These actions are available for both navbar and sidebar menu items.
 *
 * ### href
 *
 * A good old fashioned anchor link. This value is plugged into a __ng-href__ attribute behind the scenes.
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('foo.home', {
 *     text: 'Home',
 *     href: '/home'
 * });
 * ```
 *
 * To make the link open in a new tab, set the __target__ property to '_blank' (the default value is '_self').
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('foo.home', {
 *     text: 'Home',
 *     href: '/home',
 *     target: '_blank'
 * });
 * ```
 *
 * ### click
 *
 * A parameterless function should be assigned to the click property.
 * This value is plugged into a __ng-click__ attribute behind the scenes.
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('foo.myMenuItem', {
 *     text: 'My Sidebar Item',
 *     click: function () {}
 * });
 * ```
 *
 * ### state
 *
 * The name of an Angular UI Router state. This value is plugged into an ui-sref attribute behind the scenes.
 *
 * ```javascript
 * $stateProvider
 * .state('myState', {
 *     controller: 'MyCtrl',
 *     templateUrl: 'my-template.html'
 * });
 *
 * // ...
 *
 * eehNavigationProvider
 * .menuItem('foo.myMenuItem', {
 *     text: 'My Sidebar Item',
 *     state: 'myState'    // This is a ui-router state.
 * });
 * ```
 *
 * ## Menu Item Ordering
 *
 * Menu items are ordered based on their __weight__.
 *
 * ### weight
 *
 * An integer value. Items that are heavier (i.e. greater weight value) sink to the bottom.
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('foo.bottomMenuItem', {
 *     text: 'Bottom Sidebar Item',
 *     href: '/bottom-sidebar-item'
 *     weight: 1
 *  })
 * .menuItem('foo.topSidebarMenuItem', {
 *     text: 'Top Sidebar Item',
 *     href: '/top-sidebar-item'
 *     weight: -1
 * });
 * ```
 *
 * ## Menu Item Visibility
 *
 * Menu items are made shown or hidden according to their __isVisible__ property.
 *
 * ### isVisible
 *
 * A boolean value or callback function that returns a boolean value.
 *
 * ```javascript
 * eehNavigationProvider
 * .menuItem('myHiddenMenuItem', {
 *     text: 'My Hidden Menu Item',
 *     isVisible: false
 * });
 * ```
 *
 * It is often necessary to contextually hide or show menu items.
 * For example, it is common to hide an "admin" menu item for non-admins.
 * This would probably happen in a controller or service,
 * hence the use of __eehNavigation__ instead of __eehNavigationProvider__ in the following example.
 *
 * ```javascript
 * var isAdmin = function () {
 *     // We are going to assume user and user.hasRole are defined and that user.hasRole evaluates to a boolean value.
 *     return user.hasRole('admin');
 * };
 * eehNavigation
 * .menuItem('admin', {
 *     text: 'Admin',
 *     isVisible: isAdmin
 * });
 * ```
 * ## Menu Item Icons
 *
 * Menu items are decorated with icons based on their __iconClass__.
 *
 * ### iconClass
 *
 * A CSS class that corresponds to an icon in a library like
 * [Glyphicons](http://getbootstrap.com/components/#glyphicons) or
 * [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).
 *
 * ```javascript
 * eehNavigationProvider
 * .sidebarMenuItem('foo.home', {
 *     text: 'Home',
 *     href: '/home'
 *     iconClass: 'glyphicon-home'
 * });
 * ```
 *
 * Glyphicons are supported by default.
 * To use another library like Font Awesome, the base icon class needs to be set.
 * For example, "fa" is the base icon class of font awesome.
 *
 * ```javascript
 * eehNavigationProvider.iconBaseClass('fa');
 * ```
 */
var NavigationService = function () {
    this._iconBaseClass = 'glyphicon';
    this._menuItems = {};
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

angular.module('eehNavigation').provider('eehNavigation', NavigationService);
