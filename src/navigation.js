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
.directive('eehNavigation', ['$window', 'eehNavigation', function ($window, eehNavigation) {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'template/eeh-navigation/navigation.html',
        link: function (scope, element) {
            scope.navbarBrand = eehNavigation.navbarBrand;
            scope.navbarDropdowns = eehNavigation.navbarDropdowns;
            scope.items = eehNavigation.sidebarItems;
            scope.isNavbarCollapsed = false;

            var windowElement = angular.element($window);
            windowElement.bind('resize', function () {
                scope.$apply();
            });

            var getWindowDimensions = function () {
                return {
                    height: windowElement.height(),
                    width: windowElement.width(),
                    innerHeight: windowElement.innerHeight(),
                    innerWidth: windowElement.innerWidth()
                };
            };

            var topOffset = 50;
            scope.$watch(getWindowDimensions, function (newValue) {
                var width = (newValue.innerWidth > 0) ? newValue.innerWidth : $window.screen.width;
                if (width < 768) {
                    scope.isNavbarCollapsed = true;
                    topOffset = 100; // 2-row-menu
                } else {
                    scope.isNavbarCollapsed = false;
                }
                var height = (newValue.innerHeight > 0) ? newValue.innerHeight : $window.screen.height;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    element.find("#eeh-navigation-page-wrapper").css("min-height", (height) + "px");
                }
            }, true);
        }
    }
}]);
