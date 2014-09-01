angular.module('demo', [
    'eehNavigation',
    'ui.bootstrap',
    'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', 'eehNavigationProvider',
function ($stateProvider, $urlRouterProvider, eehNavigationProvider) {
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
            text: 'First Level 3',
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
}]);
