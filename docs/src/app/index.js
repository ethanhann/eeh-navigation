'use strict';

angular.module('docs', [
    'eehMenu',
    'eehMenuBs3',
    'eehMetisMenu',
    'eehTuxedoMenu',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router']);
angular.module('docs').config(function ($stateProvider, $translateProvider, $uiViewScrollProvider, $urlRouterProvider, eehMenuProvider) {
    $uiViewScrollProvider.useAnchorScroll();
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController'
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
        .state('docs.eehMenuService', {
            url: '/eeh-menu-service',
            templateUrl: 'app/partials/api/core/service/eehMenu.html'
        })
        .state('docs.eehMenuMenu', {
            url: '/eeh-menu-menu',
            templateUrl: 'app/partials/api/menu/directive/eeh-menu-menu.html'
        })
        .state('docs.eehMenuSidebar', {
            url: '/eeh-menu-sidebar',
            templateUrl: 'app/partials/api/sidebar/directive/eeh-menu-sidebar.html'
        })
        .state('docs.eehMenuNavbar', {
            url: '/eeh-menu-navbar',
            templateUrl: 'app/partials/api/navbar/directive/eeh-menu-navbar.html'
        });

    eehMenuProvider
        .iconBaseClass('fa')
        .defaultIconClassPrefix('fa')
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
        .menuItem('nav.apiDocumentation', {
            text: 'API Documentation',
            iconClass: 'fa-book',
            weight: -8
        })
        .menuItem('nav.apiDocumentation.eehMenuService', {
            text: 'eehMenu',
            state: 'docs.eehMenuService'
        })
        .menuItem('nav.apiDocumentation.eehMenuMenu', {
            text: 'eehMenuMenu',
            state: 'docs.eehMenuMenu'
        })
        .menuItem('nav.apiDocumentation.eehMenuNavbar', {
            text: 'eehMenuNavbar',
            state: 'docs.eehMenuNavbar'
        })
        .menuItem('nav.apiDocumentation.eehMenuSidebar', {
            text: 'eehMenuSidebar',
            state: 'docs.eehMenuSidebar'
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
