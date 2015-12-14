'use strict';

angular.module('eehMenu').factory('menuJsMenu', MenuService);

/** @ngInject */
function MenuService ($window) {
  return new $window.MenuJs.Menu();
}
