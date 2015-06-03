---
layout: default
currentMenu: accessing-menu-items
---

# Accessing Menu Items

Menu items can be accessed where **eehNavigation** is available - namely in controllers, services, and directives.
Menu items are accessed by referencing the menu item name after injecting the **eehNavigation** service.

```
angular.module('myApp')
.controller('MyCtrl', ['eehNavigation', function (eehNavigation) {
    // "myMenuItem" was defined somewhere else.
    eehNavigation.sidebarMenuItem('myMenuItem').text = 'New Menu Item Text;
}]);
```

It is possible to create a menu item with the **eehNavigation** service, but it is not recommended.
        Instead, create the menu item in **.config** and only do minimal wiring/contextual configuration elsewhere
        with the **eehNavigation** service.

```
// In .config, setup a logout menu item.
eehNavigationProvider
    .sidebarMenuItem('logout', {
        text: 'Logout'
    });
// ...
// In a controller or service, set the click property of the menu item.
eehNavigation.sidebarMenuItem('logout').click = function () {
    // Call custom logout code (e.g. destroy a cookie, delete user object, send logout request to server).
};
```