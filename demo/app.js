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
        .state('demo.home', {
            url: '/',
            templateUrl: 'partials/home.html'
        })
        .state('demo.alpha', {
            url: '/alpha',
            templateUrl: 'partials/alpha.html'
        })
        .state('demo.beta', {
            url: '/beta',
            templateUrl: 'partials/beta.html'
        });

    eehNavigationProvider.navbarBrand = {
        text: 'eeh-navigation demo',
        state: 'demo.home'
    };

    eehNavigationProvider.navbarDropdowns = [
        {
            text: 'me',
            iconClass: 'fa-user',
            children: [
                {
                    text: 'User Profile',
                    iconClass: 'fa-user',
                    state: 'demo.home'
                },
                {
                    text: 'example.com',
                    iconClass: 'fa-external-link',
                    href: 'http://example.com'
                },
                {
                    isDivider: true
                },
                {
                    text: 'Logout',
                    iconClass: 'fa-sign-out',
                    click: function () {
                        alert('faux log out');
                    }
                }
            ]
        }
    ];

    eehNavigationProvider.sidebarItems = [
        {
            text: 'Home',
            iconClass: 'fa-home',
            state: 'demo.home'
        },
        {
            text: 'Click',
            iconClass: 'fa-asterisk',
            click: function () {
                alert('Tada!');
            }
        },
        {
            text: 'Link to example.com',
            iconClass: 'fa-external-link',
            href: 'http://example.com'
        },
        {
            text: 'Alphabet',
            iconClass: 'fa-language',
            isCollapsed: true,
            children: [
                {
                    text: 'Alpha',
                    state: 'demo.alpha'
                },
                {
                    text: 'Beta',
                    state: 'demo.beta'
                }
            ]
        }
    ];
}]);
