angular.module('demo')
.controller('AuthenticatedCtrl', function ($state, $translate, $window, eehNavigation) {
    'use strict';
    eehNavigation.navbarMenuItem('user').text = 'Ethan';

    eehNavigation.navbarMenuItem('user.logout', {
        text: 'Logout',
        iconClass: 'fa-sign-out',
        click: function () {
            $window.alert('Faux logout');
        }
    });

    eehNavigation.sidebarMenuItem('click').click = function () {
        $window.alert('Tada');
    };
});
