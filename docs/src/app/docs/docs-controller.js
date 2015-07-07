/**
 * Created by Ethan Hann on 6/3/2015.
 */
'use strict';

angular.module('docs').controller('DocsController', function ($scope) {
    $scope.navbarBrand = {
        src: 'app/main/logo-alt.png',
        text: 'eeh-navigation',
        state: 'home'
    };
});
