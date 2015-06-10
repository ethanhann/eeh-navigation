# Getting Started

## 1. Install
```sh
bower install eeh-navigation
```

## 2. Include

### Include Dependencies
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

### Include eeh-navigation

__CSS__
```html
&lt;link rel="stylesheet" href="bower_components/eeh-navigation/dist/eeh-navigation.css"/&gt;
```

__JavaScript__
```html
&lt;script src="bower_components/eeh-navigation/dist/eeh-navigation.js"&gt;&lt;/script&gt;
&lt;script src="bower_components/eeh-navigation/dist/eeh-navigation.tpl.js"&gt;&lt;/script&gt;
```

## 3. Add Menu Items

```javascript
angular.module('myApp', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router'
])
.config(['eehNavigationProvider', function (eehNavigationProvider) {
    // Add nested user links to the "foo" menu.
    eehNavigationProvider
        .menuItem('foo.user', {
            text: 'Me',
            iconClass: 'fa-user'
        })
        .menuItem('foo.user.profile', {
            text: 'User Profile',
            iconClass: 'fa-user',
            href: '/user-profile'
        });

    // Add a menu item that links to "/home" to the "bar" menu.
    eehNavigationProvider
        .menuItem('bar.home', {
            text: 'Home',
            iconClass: 'fa-home',
            href: '/home'
        });
}]);
```

## 4. Use At Least One Navigation Directive

### eeh-navigation-navbar

This directive adds a Twitter Bootstrap based navbar to the template.
To associate the directive with the "myFirstMenu" menu defined in the previous step, use the __root-menu-name__ attribute.

The navbar directive is used like so:
```html
&lt;eeh-navigation-navbar root-menu-name="'foo'"&gt;&lt;/eeh-navigation-navbar&gt;
```

### eeh-navigation-sidebar

This directive adds a sidebar, loosely based on the Twitter Bootstrap navbar component, to the template.
If ui-router is used (which is recommended) then the sidebar directive should wrap a __ui-view__ element.
It should also be in a template that is at or near the top of the state hierarchy.

```html
&lt;eeh-navigation-sidebar root-menu-name="'bar'"&gt;
    &lt;ui-view&gt;&lt;/ui-view&gt;
&lt;/eeh-navigation-sidebar&gt;
```
