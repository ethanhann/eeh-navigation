angular.module('eehMenu').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/eeh-menu/eeh-menu.html',
    "<nav ng-class=\"navClass\">\r" +
    "\n" +
    "    <ul>\r" +
    "\n" +
    "        <li ng-repeat=\"item in menuItems | orderBy:'weight'\"\r" +
    "\n" +
    "            ng-include=\"'template/eeh-menu/list-menu-item.html'\"\r" +
    "\n" +
    "            ng-class=\"{ 'leaf': !item.hasChildren() }\"\r" +
    "\n" +
    "            ng-if=\"item.isVisible()\"\r" +
    "\n" +
    "            eeh-menu-active-menu-item=\"item\"></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</nav>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-menu/list-menu-item.html\">\r" +
    "\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\">\r" +
    "\n" +
    "        <span eeh-menu-menu-item-content=\"item\"></span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\r" +
    "\n" +
    "        <span eeh-menu-menu-item-content=\"item\"></span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\r" +
    "\n" +
    "        <span eeh-menu-menu-item-content=\"item\"></span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <a ng-if=\"!item.state && item.hasChildren()\">\r" +
    "\n" +
    "        <span eeh-menu-menu-item-content=\"item\"></span>\r" +
    "\n" +
    "        <span class=\"float-right icon-fw {{ iconBaseClass() }}\"\r" +
    "\n" +
    "              ng-class=\"item.isCollapsed ? menuItemCollapsedIconClass : menuItemExpandedIconClass\"></span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <ul ng-if=\"!item.state && item.hasChildren()\">\r" +
    "\n" +
    "        <li ng-repeat=\"item in item.children()\"\r" +
    "\n" +
    "            ng-include=\"'template/eeh-menu/list-menu-item.html'\"\r" +
    "\n" +
    "            ng-if=\"item.isVisible()\"\r" +
    "\n" +
    "            eeh-menu-active-menu-item=\"item\"></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</script>\r" +
    "\n"
  );


  $templateCache.put('template/eeh-menu/eeh-menu.menu-item-content.html',
    "<span class=\"menu-item-icon icon-fw {{ iconBaseClass() }} {{ menuItem.iconClass}}\"></span>\r" +
    "\n" +
    "<span class=\"menu-item-text\"> {{ menuItem.text|translate }}</span>\r" +
    "\n"
  );

}]);
