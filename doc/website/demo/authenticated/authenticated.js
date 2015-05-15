angular.module('demo')
.controller('AuthenticatedCtrl', function ($scope, $state, $window, eehNavigation) {
    'use strict';
    eehNavigation.menuItem('menuOne.user').text = 'Ethan';

    eehNavigation.menuItem('menuOne.user.logout', {
        text: 'Logout',
        iconClass: 'glyphicon-log-out',
        click: function () {
            $window.alert('Faux logout');
        }
    });

    eehNavigation.menuItem('menuTwo.click').click = function () {
        $window.alert('Tada');
    };

    $scope.searchModel = '';
    $scope.searchSubmit = function () {
        $state.go('demo.authenticated.search', { query: $scope.searchModel });
    };
});
