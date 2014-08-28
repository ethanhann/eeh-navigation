angular.module('eehNavigation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/eeh-navigation/navigation.html',
    "<nav class=\"navbar navbar-default navbar-static-top\" role=\"navigation\" style=\"margin-bottom: 0\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" ng-click=\"isNavbarCollapsed = !isNavbarCollapsed\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <a ng-if=\"navbarBrand.state\" class=\"navbar-brand\" ui-sref=\"{{ navbarBrand.state }}\" href=\"#\">{{ navbarBrand.text }}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"nav navbar-top-links navbar-right\">\n" +
    "        <li class=\"dropdown\" ng-repeat=\"dropdown in navbarDropdowns\">\n" +
    "            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n" +
    "                <span class=\"fa fa-user fa-fw\"></span>\n" +
    "                <span> {{ dropdown.text }}</span>\n" +
    "                <span class=\"fa fa-caret-down\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu dropdown-user\">\n" +
    "                <li ng-repeat=\"item in dropdown.children\" ng-class=\"{'divider': item.isDivider}\">\n" +
    "                    <a ng-if=\"!item.isDivider && item.state\"\n" +
    "                       ui-sref=\"{{ item.state }}\"\n" +
    "                       href=\"#\">\n" +
    "                        <span class=\"fa fa-fw {{ item.iconClass }}\"></span>\n" +
    "                        <span> {{ item.text }}</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div collapse=\"isNavbarCollapsed\">\n" +
    "        <div class=\"navbar-default sidebar\" role=\"navigation\">\n" +
    "            <div class=\"sidebar-nav navbar-collapse\">\n" +
    "                <ul class=\"nav\">\n" +
    "                    <li class=\"sidebar-search\">\n" +
    "                        <div class=\"input-group custom-search-form\">\n" +
    "                            <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                            <button class=\"btn btn-default\" type=\"button\">\n" +
    "                                <i class=\"fa fa-search\"></i>\n" +
    "                            </button>\n" +
    "                        </span>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                    <li ng-repeat=\"item in items\" ng-include=\"'sidebar-menu-item.html'\"></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "<div id=\"eeh-navigation-page-wrapper\" ng-transclude></div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"sidebar-menu-item.html\">\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\" ui-sref-active=\"active\">\n" +
    "        <span class=\"fa fa-fw {{ item.iconClass}}\"></span>\n" +
    "        <span> {{ item.text }}</span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"!item.state && item.children\"\n" +
    "       ng-click=\"item.isCollapsed = !item.isCollapsed\">\n" +
    "        <span class=\"fa fa-fw {{ item.iconClass}}\"></span>\n" +
    "        <span> {{ item.text }}</span>\n" +
    "        <span class=\"pull-right fa fa-fw\" ng-class=\"item.isCollapsed ? 'fa-chevron-left' : 'fa-chevron-down'\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"!item.state && item.children\" collapse=\"item.isCollapsed\" class=\"nav nav-third-level\">\n" +
    "        <li ng-repeat=\"item in item.children\" ng-include=\"'sidebar-menu-item.html'\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );

}]);
