'use strict';

angular.module('docs').config(function ($stateProvider, eehNavigationProvider) {
    $stateProvider
    .state('examples', {
        url: '/examples',
        templateUrl: 'app/examples/examples.html'
    })
    .state('examples.basicMenu', {
        url: '/basic-menu',
        templateUrl: 'app/examples/basic-menu.html'
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
    });

    eehNavigationProvider
    .menuItem('nav.examples', {
        text: 'Examples',
        iconClass: 'fa-magic',
        weight: -16
    })
    .menuItem('nav.examples.basicMenu', {
        text: 'Basic Menu',
        state: 'examples.basicMenu'
    })
    .menuItem('nav.examples.bootstrapNavbar', {
        text: 'Navbar (Bootstrap 3)',
        state: 'examples.bootstrapNavbar'
    })
    .menuItem('nav.examples.bootstrapSidebar', {
        text: 'Sidebar (Bootstrap 3)',
        state: 'examples.bootstrapSidebar'
    })
    .menuItem('nav.examples.bootstrapNavbarAndSidebar', {
        text: 'Navbar + Sidebar (Bootstrap 3)',
        state: 'examples.bootstrapNavbarAndSidebar'
    })
    .menuItem('nav.examples.tuxedoMenuIntegration', {
        text: 'Tuxedo Menu Integration',
        state: 'examples.tuxedoMenuIntegration'
    })
    .menuItem('nav.examples.superfishIntegration', {
        text: 'Superfish Integration',
        state: 'examples.superfishIntegration'
    })
    .menuItem('nav.examples.slideoutIntegration', {
        text: 'Slideout Integration',
        state: 'examples.slideoutIntegration'
    });
});
