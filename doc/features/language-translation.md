---
currentMenu: language-translation
---

# Language Translation

Language translation is an optional feature. To use it, do the following.

## Install angular-translate (via bower)

```
bower install angular-translate
```

## Include angular-translate JavaScript

```
<script src="bower_components/angular-translate/angular-translate.js"></script>
```

## Enable angular-translate Module

```
angular.module('myApp', ['pascalprecht.translate']);
```

## Add Menu Items to Translate

```
angular.module('myApp').config(['eehNavigationProvider',
function (eehNavigationProvider) {
    eehNavigationProvider
        .sidebarMenuItem('home', {
            text: 'Home',   // Will be translated.
            href: '/home',
        })
        .sidebarMenuItem('logout', {
            text: 'Logout', // Will be translated.
            href: '/logout',
        });
}]);
```

## Add Translations

```
angular.module('myApp').config(['$translateProvider', 'eehNavigationProvider',
function ($translateProvider, eehNavigationProvider) {
    // ...

    // English translation
    $translateProvider
        .translations('en', {
            'Home': 'Home',
            'Logout': 'Logout'
        });

    // German translation
    $translateProvider
        .translations('de', {
            'Home': 'Zuhause',
            'Logout': 'Abmelden'
        });
}]);
```

## Add Dropdown to Toggle Between Languages

```
angular.module('myApp').config(['$translateProvider', 'eehNavigationProvider',
function ($translateProvider, eehNavigationProvider) {
    // ...
    
    // Switch languages via dropdown
    eehNavigationProvider
        .navbarMenuItem('language', {
            text: 'Language',
            iconClass: 'fa-language'
        })
        .navbarMenuItem('language.en', {
            text: 'English',
            click: function () {
                $translateProvider.use('en');
            }
        })
        .navbarMenuItem('language.de', {
            text: 'Deutsch',
            click: function () {
                $translateProvider.use('de');
            }
        });
}]);
```