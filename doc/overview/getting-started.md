---
currentMenu: getting-started
---

# Getting Started

Install, include, configure.

## Install (via bower)
```sh
bower install eeh-navigation
```

## Include Dependencies

__CSS__
```html
<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css" />
<link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.css" />
``` 

__JavaScript__
```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-translate/angular-translate.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
```

## Include eeh-navigation Module

__CSS__
```html
<link rel="stylesheet" href="bower_components/eeh-navigation/dist/eeh-navigation.css"/>
```

__JavaScript__
```html
<script src="bower_components/eeh-navigation/dist/eeh-navigation.js"></script>
<script src="bower_components/eeh-navigation/dist/eeh-navigation.tpl.js"></script>
```

## Use the "eeh-navigation" Directive <small>&le; v3.3</small>

<div class="alert alert-warning"><span class="fa fa-fw fa-warning"></span>The <em>eeh-navigation</em> directive is deprecated and will be removed in version 4.0.0</div>
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

## Use the "eeh-navigation-navbar" and/or "eeh-navigation-sidebar" directives <small>&ge; v3.3</small>

Beginning with version 3.3.0, the _eeh-navigation_ directive has been decomposed into two separate directives:
the _eeh-navigation-navbar_ directive and the _eeh-navigation-sidebar_ directive.

The navbar directive is used like so:
```html
<eeh-navigation-navbar></eeh-navigation-navbar>
```

The sidebar directive is used in the same way as the deprecated _eeh-navigation_ directive.
If ui-router is used, which is recommended, then the sidebar directive should wrap a _ui-view_ directive.
It should also be in a template that is at the top of the state hierarchy.

```html
<eeh-navigation-sidebar>
    <ui-view></ui-view>
</eeh-navigation-sidebar>
```

## Configuration Example

```javascript
angular.module('myApp', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router'
])
.config(['eehNavigationProvider', function (eehNavigationProvider) {
    // Configure navbar branding and the link to navigate to when clicked.
    eehNavigationProvider.navbarBrand.text = 'My Product';
    eehNavigationProvider.navbarBrand.href = '/home';
                                                
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
