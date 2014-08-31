angular.module('eehNavigation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/eeh-navigation/eeh-navigation.html',
    "<nav class=\"navbar navbar-default navbar-static-top eeh-navigation\" role=\"navigation\">\n" +
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
    "        <li class=\"dropdown\" ng-repeat=\"navbarMenuItem in navbarMenuItems\">\n" +
    "            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "                <span class=\"fa fa-user fa-fw\"></span>\n" +
    "                <span> {{ navbarMenuItem.text }}</span>\n" +
    "                <span class=\"fa fa-caret-down\"></span>\n" +
    "            </a>\n" +
    "            <ul ng-if=\"hasChildren(navbarMenuItem)\" class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"item in children(navbarMenuItem)\" ng-class=\"{'divider': item.isDivider}\"\n" +
    "                    ng-if=\"isVisible(item)\">\n" +
    "                    <a ng-if=\"!item.isDivider && item.state\"\n" +
    "                       ui-sref=\"{{ item.state }}\">\n" +
    "                        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "                    </a>\n" +
    "                    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "                        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "                    </a>\n" +
    "                    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\">\n" +
    "                        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
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
    "                    <li class=\"sidebar-search\" ng-show=\"!isSidebarTextCollapsed && sidebarSearch.isVisible\">\n" +
    "                        <div class=\"input-group custom-search-form\">\n" +
    "                            <input type=\"text\" class=\"form-control\" placeholder=\"Search...\"\n" +
    "                                   ng-model=\"sidebarSearch.model\"\n" +
    "                                   ng-click=\"sidebarSearch.click()\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                                <button class=\"btn btn-default\" type=\"button\">\n" +
    "                                    <i class=\"fa fa-search\"></i>\n" +
    "                                </button>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                    <li ng-repeat=\"item in items | orderBy:'weight'\"\n" +
    "                        ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "                        ng-if=\"isVisible(item)\"></li>\n" +
    "                    <li ng-click=\"toggleSidebarTextCollapse()\">\n" +
    "                        <a>\n" +
    "                            <span class=\"fa fa-fw\"\n" +
    "                                  ng-class=\"isSidebarTextCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'\"></span>\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "<div id=\"eeh-navigation-page-wrapper\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div ng-transclude></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/sidebar-menu-item.html\">\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\" ui-sref-active=\"active\">\n" +
    "        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\">\n" +
    "        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"!item.state && hasChildren(item) && !isSidebarTextCollapsed\"\n" +
    "       ng-click=\"item.isCollapsed = !item.isCollapsed\">\n" +
    "        <span ng-include=\"'template/eeh-navigation/menu-item-content.html'\"></span>\n" +
    "        <span class=\"navbar-right sidebar-arrow fa fa-fw\"\n" +
    "              ng-class=\"item.isCollapsed ? 'fa-chevron-left' : 'fa-chevron-down'\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"!item.state && hasChildren(item) && !isSidebarTextCollapsed\" collapse=\"item.isCollapsed\" class=\"nav\">\n" +
    "        <li ng-repeat=\"item in children(item)\"\n" +
    "            ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "            ng-if=\"isVisible(item)\"></li>\n" +
    "    </ul>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/menu-item-content.html\">\n" +
    "    <span class=\"menu-item-icon fa fa-fw {{ item.iconClass}}\"></span>\n" +
    "    <span class=\"menu-item-text\"> {{ item.text }}</span>\n" +
    "</script>\n"
  );

}]);
