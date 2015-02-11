---
currentMenu: getting-started
---

# Getting Started

Install, include, configure.

## Install (via bower)
```
bower install eeh-navigation
```

## Include CSS
```
<link rel="stylesheet" href="bower_components/eeh-navigation/dist/eeh-navigation.css"/>
```

## Include JavaScript
```
    <script src="bower_components/eeh-navigation/dist/eeh-navigation.js"></script>
    <script src="bower_components/eeh-navigation/dist/eeh-navigation.tpl.js"></script>
```

## Use the "eeh-navigation" Directive

The directive should wrap some set of nested sub controllers.

```html
<eeh-navigation>
    ... my sub controllers ...
</eeh-navigation>
```

If ui-router is used, which is recommended, then the directive should wrap a _ui-view_ directive.
It should also be in a template that is at the top of the state hierarchy.

```html
<eeh-navigation>
    <ui-view></ui-view>
</eeh-navigation>
```

## Configuration Example
```
angular.module('myApp', ['eehNavigation']).config(['eehNavigationProvider',
function (eehNavigationProvider) {
    // Configure navbar branding and the link to navigate to when clicked.
    eehNavigationProvider.navbarBrand = {
        text: 'My Product',
        href: '/home'
    };

    // Add a drowndown menu for user links to the navbar.
    eehNavigationProvider
        .navbarMenuItem('user', {
            text: 'Me',
            iconClass: 'fa-user'
        })
        .navbarMenuItem('user.profile', {
            text: 'User Profile',
            iconClass: 'fa-user',
            href: '/user-profile'
        });

    // Add a menu item for /home to the sidebar.
    eehNavigationProvider
        .sidebarMenuItem('home', {
            text: 'Home',
            iconClass: 'fa-home',
            href: '/home'
        });
}]);
```
