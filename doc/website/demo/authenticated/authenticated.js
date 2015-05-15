angular.module('demo')
.controller('AuthenticatedCtrl', function ($state, $window, eehNavigation) {
    'use strict';
    eehNavigation.menuItem('menuOne.user').text = 'Ethan';

    eehNavigation.menuItem('menuOne.user.logout', {
        text: 'Logout',
        iconClass: 'glyphicon-log-out',
        click: function () {
            $window.alert('Faux logout');
        }
    });

    eehNavigation.sidebarMenuItem('click').click = function () {
        $window.alert('Tada');
    };
});
