angular.module('eehNavigation', [])
.provider('eehNavigation', function () {
    var self = this;
    self.sidebarItems = [];
    self.navbarBrand = {};
    self.navbarDropdowns = [];
    self.$get = function () {
        return {
            navbarBrand: self.navbarBrand,
            navbarDropdowns: self.navbarDropdowns,
            sidebarItems: self.sidebarItems
        };
    };
})
.directive('eehNavigation', function (eehNavigation) {
    return {
        restrict: 'AE',
        templateUrl: 'navigation/navigation.html',
        link: function (scope) {
            scope.navbarBrand = eehNavigation.navbarBrand;
            scope.navbarDropdowns = eehNavigation.navbarDropdowns;
            scope.items = eehNavigation.sidebarItems;
        }
    }
});
