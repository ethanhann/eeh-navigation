'use strict';

angular.module('eehMenu').factory('menu', MenuService);

/** @ngInject */
function MenuService ($window) {
  return new $window.MenuJs.Menu();
}
