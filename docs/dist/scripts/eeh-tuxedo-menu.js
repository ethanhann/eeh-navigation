(function (angular) {
    'use strict';

    var TuxedoMenuDirective = function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var navElement = element.find('> nav');
                navElement.addClass('tuxedo-menu');
                var config = attributes.eehTuxedoMenu !== '' ? angular.fromJson(attributes.eehTuxedoMenu) : {};
                $timeout(function () {
                    navElement.tuxedoMenu(config);
                });
            }
        };
    };

    angular.module('eehTuxedoMenu', []).directive('eehTuxedoMenu', ['$timeout', TuxedoMenuDirective]);
})(angular);
