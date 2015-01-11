angular.module('demo')
.controller('SearchCtrl', function ($scope, $stateParams) {
    'use strict';
    $scope.searchTerm = $stateParams.query;
});
