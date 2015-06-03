# Getting Started

Install, include, configure.

## Install (via bower)
```sh
bower install eeh-navigation
```

## Include Dependencies

__CSS__
```html
&lt;link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" /&gt;
&lt;link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css" /&gt;
``` 

__JavaScript__
```html
&lt;script src="bower_components/jquery/dist/jquery.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/angular/angular.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/angular-translate/angular-translate.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/angular-ui-router/release/angular-ui-router.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"&gt;&lt;/script&gt;
```

## Include eeh-navigation Module

__CSS__
```html
&lt;link rel="stylesheet" href="bower_components/eeh-navigation/dist/eeh-navigation.css"/&gt;
```

__JavaScript__
```html
&lt;script src="bower_components/eeh-navigation/dist/eeh-navigation.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/eeh-navigation/dist/eeh-navigation.tpl.js"&gt;&lt;/script&gt;
```

## Use the "eeh-navigation" Directive &lt;small&gt;&le; v3.3&lt;/small&gt;

&lt;div class="alert alert-warning"&gt;&lt;span class="fa fa-fw fa-warning"&gt;&lt;/span&gt;The &lt;em&gt;eeh-navigation&lt;/em&gt; directive is deprecated and will be removed in version 4.0.0&lt;/div&gt;
The directive should wrap some set of nested sub controllers.

```html
&lt;eeh-navigation&gt;
    ... my sub controllers ...
&lt;/eeh-navigation&gt;
```

If ui-router is used, which is recommended, then the directive should wrap a _ui-view_ directive.
It should also be in a template that is at the top of the state hierarchy.

```html
&lt;eeh-navigation&gt;
    &lt;ui-view&gt;&lt;/ui-view&gt;
&lt;/eeh-navigation&gt;
```

## Use the "eeh-navigation-navbar" and/or "eeh-navigation-sidebar" directives &lt;small&gt;&ge; v3.3&lt;/small&gt;

Beginning with version 3.3.0, the _eeh-navigation_ directive has been decomposed into two separate directives:
the _eeh-navigation-navbar_ directive and the _eeh-navigation-sidebar_ directive.

The navbar directive is used like so:
```html
&lt;eeh-navigation-navbar&gt;&lt;/eeh-navigation-navbar&gt;
```

The sidebar directive is used in the same way as the deprecated _eeh-navigation_ directive.
If ui-router is used, which is recommended, then the sidebar directive should wrap a _ui-view_ directive.
It should also be in a template that is at the top of the state hierarchy.

```html
&lt;eeh-navigation-sidebar&gt;
    &lt;ui-view&gt;&lt;/ui-view&gt;
&lt;/eeh-navigation-sidebar&gt;
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
