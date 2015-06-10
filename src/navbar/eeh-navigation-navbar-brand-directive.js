'use strict';

/**
 * @ngdoc directive
 * @name eeh-navigation-navbar-brand
 * @restrict AE
 *
 * @description
 * This directive allows for the creation of a Twitter Bootstrap navbar brand element.
 *
 * @param {string=} text Sets the text of the brand element.
 * @param {string=} state Sets ui-sref of the brand element.
 * @param {string=} href Sets the href attribute of the brand element.
 * @param {string=} target Sets target attribute of the brand element.
 * @param {string=} src Sets the src attribute of the image in the brand element.
 * @param {function=} click Sets the callback function of the brand element.
 */
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
