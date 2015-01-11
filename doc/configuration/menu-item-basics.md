---
currentMenu: menu-item-basics
---

# Menu Items

## Link Actions

There are three mutually exclusive, configurable menu item actions:
__href__, __click__, and __state__. These actions are available for both navbar and sidebar menu items.

### href

A good old fashioned anchor link. This value is plugged into a ng-href attribute behind the scenes.

```
eehNavigationProvider
    .sidebarMenuItem('mySidebarItem', {
        text: 'My Sidebar Item',
        href: '/my-sidebar-item'
    });
```

### click

A parameterless function. This value is plugged into a ng-click attribute behind the scenes.

```
eehNavigationProvider
    .sidebarMenuItem('mySidebarItem', {
        text: 'My Sidebar Item',
        click: function () {}
    });
```

### state

The name of an Angular UI Router state. This value is plugged into an ui-sref attribute behind the scenes.

```
$stateProvider
    .state('myState', {
        controller: 'MyCtrl',
        templateUrl: 'my-template.html'
    });
// ...
eehNavigationProvider
    .sidebarMenuItem('foo', {
        text: 'My Sidebar Item',
        state: 'myState'    // This is a ui-router state.
    });
```

## Ordering

Menu items are ordered based on their **weight**.

### weight

An integer value. Items that are heavier (i.e. greater weight value) sink to the bottom.

```
eehNavigationProvider
    .sidebarMenuItem('bottomSidebarItem', {
        text: 'Bottom Sidebar Item',
        href: '/bottom-sidebar-item'
        weight: 1
    })
    .sidebarMenuItem('topSidebarItem', {
        text: 'Top Sidebar Item',
        href: '/top-sidebar-item'
        weight: -1
    });
```

## Visibility

### isVisible

A boolean value or callback function that returns a boolean value.

```
eehNavigationProvider
    .sidebarMenuItem('myHiddenMenuItem', {
        text: 'My Hidden Menu Item',
        isVisible: false
    });
```

It is often necessary to contextually hide or show menu items.
        For example, it is common to hide an "admin" menu item for non-admins.
        This would probably happen in a [controller or service](#accessing-menu-items),
        hence the use of **eehNavigation** instead of
        **eehNavigationProvider** in the following example.

```
var isAdmin = function () {
    /* We are going to assume user and user.hasRole are defined
       and that user.hasRole evaluates to a boolean value. */
    return user.hasRole('admin');
};
eehNavigation
    .sidebarMenuItem('admin', {
        text: 'Admin',
        isVisible: isAdmin
    });
```
