angular.module('demo', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router'
]).config(['$stateProvider', '$translateProvider', '$urlRouterProvider', 'eehNavigationProvider',
function ($stateProvider, $translateProvider, $urlRouterProvider, eehNavigationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('demo', {
            abstract: true,
            templateUrl: 'app.html'
        })
        .state('demo.authenticated', {
            abstract: true,
            controller: 'AuthenticatedCtrl',
            templateUrl: 'authenticated/authenticated.html'
        })
        .state('demo.authenticated.home', {
            url: '/',
            templateUrl: 'partials/home.html'
        })
        .state('demo.authenticated.blank', {
            url: '/blank',
            templateUrl: 'partials/blank.html'
        })
        .state('demo.authenticated.alpha', {
            url: '/alpha',
            templateUrl: 'partials/alpha.html'
        })
        .state('demo.authenticated.beta', {
            url: '/beta',
            templateUrl: 'partials/beta.html'
        });

    eehNavigationProvider.navbarBrand = {
        text: 'eeh-navigation demo',
        state: 'demo.home'
    };

    eehNavigationProvider
        .navbarMenuItem('user', {
            text: 'me',
            iconClass: 'fa-user'
        })
        .navbarMenuItem('user.profile', {
            text: 'User Profile',
            iconClass: 'fa-user',
            state: 'demo.authenticated.home'
        })
        .navbarMenuItem('user.example-com', {
            text: 'example.com',
            iconClass: 'fa-external-link',
            href: 'http://example.com'
        })
        .navbarMenuItem('user.divider1', {
            isDivider: true
        })
        .navbarMenuItem('user.visible', {
            text: 'Visible',
            iconClass: 'fa-eye',
            href: 'http://example.com',
            isVisible: true
        })
        .navbarMenuItem('user.hidden', {
            text: 'Hidden',
            iconClass: 'fa-eye-slash',
            href: 'http://example.com',
            isVisible: false
        });

    eehNavigationProvider
        .navbarMenuItem('language', {
            text: 'Language',
            iconClass: 'fa-language'
        })
        .navbarMenuItem('language.en', {
            text: 'English'
        })
        .navbarMenuItem('language.de', {
            text: 'Deutsch'
        });

    eehNavigationProvider
        .sidebarMenuItem('home', {
            text: 'Home',
            iconClass: 'fa-home',
            state: 'demo.authenticated.home',
            weight: 0
        })
        .sidebarMenuItem('blank', {
            text: 'Blank',
            iconClass: 'fa-star',
            state: 'demo.authenticated.blank'
        })
        .sidebarMenuItem('click', {
            text: 'Click',
            iconClass: 'fa-asterisk'
        })
        .sidebarMenuItem('external', {
            text: 'Link to example.com',
            iconClass: 'fa-external-link',
            href: 'http://example.com'
        })
        .sidebarMenuItem('visible', {
            text: 'Visible',
            iconClass: 'fa-eye',
            href: 'http://example.com',
            isVisible: true
        })
        .sidebarMenuItem('hidden', {
            text: 'Hidden',
            iconClass: 'fa-eye-slash',
            href: 'http://example.com',
            isVisible: false
        })
        .sidebarMenuItem('multilevel', {
            text: 'Multi level',
            iconClass: 'fa-sitemap',
            isCollapsed: true
        })
        .sidebarMenuItem('multilevel.firstlevel1', {
            text: 'First level - 1',
            iconClass: 'fa-file-o',
            state: 'demo.authenticated.blank'
        })
        .sidebarMenuItem('multilevel.firstlevel2', {
            text: 'First level - 2',
            iconClass: 'fa-file-o',
            state: 'demo.authenticated.blank'
        })
        .sidebarMenuItem('multilevel.firstlevel3', {
            text: 'First level - 3',
            iconClass: 'fa-folder-o',
            isCollapsed: false
        })
        .sidebarMenuItem('multilevel.firstlevel3.secondlevel1', {
            text: 'Second level - 1',
            iconClass: 'fa-file-o',
            state: 'demo.authenticated.blank'
        })
        .sidebarMenuItem('multilevel.firstlevel3.secondlevel2', {
            text: 'Second level - 2',
            iconClass: 'fa-file-o',
            state: 'demo.authenticated.blank'
        });

    $translateProvider
        .translations('de', {
            'Blank': 'Leer',
            'Home': 'Zuhause',
            'Click': 'Klicken',
            'Link to example.com': 'Link zu example.com',
            'Visible': 'Sichtbar',
            'Multi level': 'Mehrere Ebenen',
            'First level - 1': 'Erste Ebene - 1',
            'First level - 2': 'Erste Ebene - 2',
            'First level - 3': 'Erste Ebene - 3',
            'Second level - 1': 'Zweite Ebene - 1',
            'Second level - 2': 'Zweite Ebene - 2',
            'User Profile': 'Benutzerprofil',
            'Logout': 'Abmelden'
        });

    $translateProvider.preferredLanguage('en');
}]);
