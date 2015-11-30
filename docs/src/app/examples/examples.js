'use strict';

angular.module('docs').config(function ($stateProvider, eehNavigationProvider) {
    $stateProvider
    .state('examples', {
        url: '/examples',
        abstract: true,
        templateUrl: 'app/examples/examples.html'
    })
    .state('examples.index', {
        url: '/examples',
        templateUrl: 'app/examples/examples-index.html'
    })
    .state('examples.basicMenu', {
        url: '/basic-menu',
        templateUrl: 'app/examples/basic-menu.html'
    })
    .state('examples.menuFromUiRouterStates', {
        url: '/menu-from-ui-router-states',
        templateUrl: 'app/examples/menu-from-ui-router-states.html'
    })
    .state('examples.bootstrapNavbar', {
        url: '/bootstrap-navbar',
        templateUrl: 'app/examples/bootstrap-navbar.html'
    })
    .state('examples.bootstrapSidebar', {
        url: '/bootstrap-sidebar',
        templateUrl: 'app/examples/bootstrap-sidebar.html'
    })
    .state('examples.bootstrapNavbarAndSidebar', {
        url: '/bootstrap-navbar-and-sidebar',
        templateUrl: 'app/examples/bootstrap-navbar-and-sidebar.html'
    })
    .state('examples.tuxedoMenuIntegration', {
        url: '/tuxedo-menu-integration',
        templateUrl: 'app/examples/tuxedo-menu-integration.html'
    })
    .state('examples.superfishIntegration', {
        url: '/superfish-integration',
        templateUrl: 'app/examples/superfish-integration.html'
    })
    .state('examples.slideoutIntegration', {
        url: '/slideout-integration',
        templateUrl: 'app/examples/slideout-integration.html'
    })
    .state('examples.metisMenuIntegration', {
        url: '/metis-menu-integration',
        templateUrl: 'app/examples/metis-menu-integration.html'
    })
    .state('examples.metisMenuFolderView', {
        url: '/metis-menu-folder-view',
        templateUrl: 'app/examples/metis-menu-folder-view.html'
    })
    .state('examples.metisMenuAndBootstrapNavbar', {
        url: '/metis-menu-and-bootstrap-navbar',
        templateUrl: 'app/examples/metis-menu-and-bootstrap-navbar.html'
    });

    eehNavigationProvider
    .menuItem('nav.examples', {
        text: 'Examples',
        iconClass: 'fa-magic',
        state: 'examples.index',
        weight: -16
    })
    .menuItem('examples.basics', {
        text: 'Menu Creation Essentials'
    })
    .menuItem('examples.basics.basicMenu', {
        text: 'Basic Menu',
        state: 'examples.basicMenu'
    })
    .menuItem('examples.basics.menuFromUiRouterStates', {
        text: 'Menu from UI Router States',
        state: 'examples.menuFromUiRouterStates'
    })
    .menuItem('examples.bootstrap', {
        text: 'Bootstrap 3'
    })
    .menuItem('examples.bootstrap.navbar', {
        text: 'Navbar',
        state: 'examples.bootstrapNavbar'
    })
    .menuItem('examples.bootstrap.sidebar', {
        text: 'Sidebar',
        state: 'examples.bootstrapSidebar'
    })
    .menuItem('examples.bootstrap.navbarAndSidebar', {
        text: 'Navbar + Sidebar',
        state: 'examples.bootstrapNavbarAndSidebar'
    })
    .menuItem('examples.integrations', {
        text: '3rd Party Integrations'
    })
    .menuItem('examples.integrations.tuxedoMenu', {
        text: 'Tuxedo Menu',
        state: 'examples.tuxedoMenuIntegration'
    })
    .menuItem('examples.integrations.superfish', {
        text: 'Superfish',
        state: 'examples.superfishIntegration'
    })
    .menuItem('examples.integrations.slideout', {
        text: 'Slideout',
        state: 'examples.slideoutIntegration'
    })
    .menuItem('examples.integrations.metisMenu', {
        text: 'metisMenu',
        state: 'examples.metisMenuIntegration'
    })
    .menuItem('examples.integrations.metisMenuFolderView', {
        text: 'metisMenu Folder View',
        state: 'examples.metisMenuFolderView'
    })
    .menuItem('examples.integrations.metisMenuAndBootstrapNavbar', {
        text: 'metisMenu + BS3 Navbar',
        state: 'examples.metisMenuAndBootstrapNavbar'
    });
});
