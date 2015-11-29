'use strict';

angular.module('eehNavigation').factory('menu', MenuService);

/** @ngInject */
function MenuService ($window) {
  return new $window.MenuJs.Menu();
}
