'use strict';

var NavbarBrandDirective = function () {
    return {
        restrict: 'AE',
        templateUrl: 'template/eeh-navigation/navbar/eeh-navigation-navbar-brand.html',
        scope: {
            text: '=',
            state: '=',
            href: '=',
            target: '=',
            src: '=',
            click: '='
        }
    };
};

angular.module('eehNavigation').directive('eehNavigationNavbarBrand', NavbarBrandDirective);
