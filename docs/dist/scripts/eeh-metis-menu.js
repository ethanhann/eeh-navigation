(function (angular) {
    'use strict';

    angular.module('eehMetisMenu', [])
    .directive('eehMetisMenu', ['$timeout', MetisMenuDirective]);

    function MetisMenuDirective($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var menuElement = element.find('> nav > ul');
                menuElement.addClass('metismenu');
                var config = attributes.eehMetisMenu !== '' ? angular.fromJson(attributes.eehMetisMenu) : {};
                $timeout(function () {
                    menuElement.metisMenu(config);
                });
            }
        };
    }
})(angular);
