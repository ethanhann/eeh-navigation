'use strict';

angular.module('docs', [
    'eehNavigation',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router']);
angular.module('docs').config(function ($stateProvider, $translateProvider, $uiViewScrollProvider, $urlRouterProvider, eehNavigationProvider) {
    $uiViewScrollProvider.useAnchorScroll();
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController'
        })
        .state('examples', {
            url: '/examples',
            templateUrl: 'app/examples/examples.html'
        })
        .state('examples.bootstrapNavbar', {
            url: '/navbar',
            templateUrl: 'app/examples/navbar.html'
        })
        .state('examples.bootstrapSidebar', {
            url: '/sidebar',
            templateUrl: 'app/examples/sidebar.html'
        })
        .state('docs', {
            url: '/docs',
            templateUrl: 'app/docs/docs.html',
            controller: 'DocsController'
        })
        .state('docs.gettingStarted', {
            url: '/getting-started',
            templateUrl: 'app/partials/getting-started.html'
        })
        .state('docs.changeLog', {
            url: '/change-log',
            templateUrl: 'app/partials/change-log.html'
        })
        .state('docs.eehNavigationService', {
            url: '/eeh-navigation-service',
            templateUrl: 'app/partials/api/core/service/eehNavigation.html'
        })
        .state('docs.eehNavigationMenu', {
            url: '/eeh-navigation-menu',
            templateUrl: 'app/partials/api/menu/directive/eeh-navigation-menu.html'
        })
        .state('docs.eehNavigationSidebar', {
            url: '/eeh-navigation-sidebar',
            templateUrl: 'app/partials/api/sidebar/directive/eeh-navigation-sidebar.html'
        })
        .state('docs.eehNavigationNavbar', {
            url: '/eeh-navigation-navbar',
            templateUrl: 'app/partials/api/navbar/directive/eeh-navigation-navbar.html'
        });

    eehNavigationProvider
        .iconBaseClass('fa')
        .menuItem('nav.home', {
            text: 'Home',
            state: 'home',
            iconClass: 'fa-home',
            weight: -20
        })
        .menuItem('nav.gettingStarted', {
            text: 'Getting Started',
            state: 'docs.gettingStarted',
            iconClass: 'fa-power-off',
            weight: -18
        })
        .menuItem('nav.examples', {
            text: 'Examples',
            iconClass: 'fa-magic',
            weight: -16
        })
        .menuItem('nav.examples.bootstrapNavbar', {
            text: 'Navbar',
            state: 'examples.bootstrapNavbar'
        })
        .menuItem('nav.examples.bootstrapSidebar', {
            text: 'Sidebar',
            state: 'examples.bootstrapSidebar'
        })
        .menuItem('nav.changeLog', {
            text: 'Change Log',
            state: 'docs.changeLog',
            iconClass: 'fa-refresh',
            weight: -9
        })
        .menuItem('nav.apiDocumentation', {
            text: 'API Documentation',
            iconClass: 'fa-book',
            weight: -8
        })
        .menuItem('nav.apiDocumentation.eehNavigationService', {
            text: 'eehNavigation',
            state: 'docs.eehNavigationService'
        })
        .menuItem('nav.apiDocumentation.eehNavigationMenu', {
            text: 'eehNavigationMenu',
            state: 'docs.eehNavigationMenu'
        })
        .menuItem('nav.apiDocumentation.eehNavigationNavbar', {
            text: 'eehNavigationNavbar',
            state: 'docs.eehNavigationNavbar'
        })
        .menuItem('nav.apiDocumentation.eehNavigationSidebar', {
            text: 'eehNavigationSidebar',
            state: 'docs.eehNavigationSidebar'
        });
});

angular.module('docs').directive('pre', function ($window) {
    return {
        restrict: 'E',
        link: function postLink(scope, element) {
            scope.$on('$viewContentLoaded', function () {
                element.addClass('prettyprint');
                element.html($window.prettyPrint(element.html(), '', true));
            });
        }
    };
});
