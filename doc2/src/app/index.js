'use strict';

angular.module('doc2', ['eehNavigation', 'hc.marked', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap']);
angular.module('doc2').config(function ($stateProvider, $translateProvider, $urlRouterProvider, eehNavigationProvider, markedProvider) {
    markedProvider.setOptions({
        gfm: true,
        highlight: function (code, language) {
            return hljs.highlight(language, code).value;
        }
    });
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
            template: '<marked ng-include="\'content/getting-started.md\'"></marked>'
        })
        .state('docs.changeLog', {
            url: '/change-log',
            template: '<marked ng-include="\'content/change-log.md\'"></marked>'
        })
        .state('docs.icons', {
            url: '/icons',
            template: '<marked ng-include="\'content/icons.md\'"></marked>'
        })
        .state('docs.languageTranslation', {
            url: '/language-translation',
            template: '<marked ng-include="\'content/language-translation.md\'"></marked>'
        })
        .state('docs.eehNavigationService', {
            url: '/eeh-navigation-service',
            template: '<marked ng-include="\'content/eeh-navigation-service.md\'"></marked>'
        })
        .state('docs.eehNavigationSidebar', {
            url: '/eeh-navigation-sidebar',
            templateUrl: 'partials/api/sidebar/directive/eeh-navigation-sidebar.html'
            //template: '<marked ng-include="\'content/eeh-navigation-sidebar.md\'"></marked>'
        })
        .state('docs.sidebarSearchMenuItem', {
            url: '/sidebar-search-menu-item',
            template: '<marked ng-include="\'content/sidebar-search-menu-item.md\'"></marked>'
        });

    eehNavigationProvider
        .iconBaseClass('fa')
        .menuItem('nav.gettingStarted', {
            text: 'Getting Started',
            state: 'docs.gettingStarted',
            iconClass: 'fa-power-off'
        })
        .menuItem('nav.changeLog', {
            text: 'Change Log',
            state: 'docs.changeLog',
            iconClass: 'fa-refresh'
        })
        .menuItem('nav.configuration', {
            text: 'Configuration',
            iconClass: 'fa-book'
        })
        .menuItem('nav.configuration.eehNavigationService', {
            text: 'eehNavigation Service',
            state: 'docs.eehNavigationService'
        })
        .menuItem('nav.configuration.eehNavigationSidebar', {
            text: 'Sidebar Directive',
            state: 'docs.eehNavigationSidebar'
        })
        //.menuItem('nav.configuration.nestedSidebarMenuItems', {
        //    text: 'Nested Sidebar Menu Items',
        //    state: 'docs.nestedSidebarMenuItems'
        //})
        //.menuItem('nav.configuration.sidebarTextCollapseMenuItem', {
        //    text: 'Sidebar Text Collapse Menu Item',
        //    state: 'docs.sidebarTextCollapseMenuItem'
        //})
        //.menuItem('nav.configuration.sidebarSearchMenuItem', {
        //    text: 'Sidebar Search Menu Item',
        //    state: 'docs.sidebarSearchMenuItem'
        //})
        .menuItem('nav.configuration.languageTranslation', {
            text: 'Language Translation',
            state: 'docs.languageTranslation'
        })
        .menuItem('nav.configuration.icons', {
            text: 'Icons',
            state: 'docs.icons'
        })
        ;
});
