angular.module('eehNavigation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html',
    "<span class=\"menu-item-icon icon-fw {{ iconBaseClass() }} {{ menuItem.iconClass}}\"></span>\n" +
    "<span class=\"menu-item-text\"> {{ menuItem.text|translate }}</span>\n" +
    "\n"
  );


  $templateCache.put('template/eeh-navigation/navbar/eeh-navigation-navbar.html',
    "<nav class=\"navbar navbar-default navbar-static-top eeh-navigation eeh-navigation-navbar\" role=\"navigation\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" ng-click=\"isNavbarCollapsed = !isNavbarCollapsed\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <a ng-if=\"_navbarBrand.state && !_navbarBrand.href\" class=\"navbar-brand\" ui-sref=\"{{ _navbarBrand.state }}\">\n" +
    "            <span ng-include=\"'template/eeh-navigation/navbar-brand.html'\"></span>\n" +
    "        </a>\n" +
    "        <a ng-if=\"!_navbarBrand.state && _navbarBrand.href\" class=\"navbar-brand\" ng-href=\"{{ _navbarBrand.href }}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "            <span ng-include=\"'template/eeh-navigation/navbar-brand.html'\"></span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div collapse=\"isNavbarCollapsed\" class=\"navbar-collapse\">\n" +
    "        <ul class=\"nav navbar-nav navbar-left\">\n" +
    "            <li ng-repeat=\"item in leftNavbarMenuItems | orderBy:'weight'\"\n" +
    "                ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "                ng-if=\"item._isVisible()\"\n" +
    "                dropdown\n" +
    "                ui-sref-active-eq=\"active\"\n" +
    "                eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "        </ul>\n" +
    "        <ul class=\"nav navbar-nav navbar-right\">\n" +
    "            <li ng-repeat=\"item in rightNavbarMenuItems | orderBy:'weight'\"\n" +
    "                ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "                ng-if=\"item._isVisible()\"\n" +
    "                dropdown\n" +
    "                ui-sref-active-eq=\"active\"\n" +
    "                eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/navbar-brand.html\">\n" +
    "    <img ng-if=\"_navbarBrand.src\" ng-src=\"{{_navbarBrand.src}}\">\n" +
    "    <span ng-if=\"_navbarBrand.text\">{{ _navbarBrand.text|translate }}</span>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/navbar-menu-item.html\">\n" +
    "    <a ng-if=\"!item.isDivider && item.state\" ui-sref=\"{{ item.state }}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.hasChildren()\" dropdown-toggle>\n" +
    "        <span class=\"icon-fw {{ iconBaseClass() }} {{ item.iconClass }}\"></span>\n" +
    "        <span> {{ item.text|translate }}</span>\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"item.hasChildren()\" class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"item in item.children()|orderBy:'weight'\"\n" +
    "            ng-class=\"{'divider': item.isDivider}\"\n" +
    "            ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            ui-sref-active-eq=\"active\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );


  $templateCache.put('template/eeh-navigation/search-input/eeh-navigation-search-input.html',
    "<form ng-submit=\"submit()\" class=\"navbar-form navbar-right\">\n" +
    "    <div class=\"input-group\">\n" +
    "        <input type=\"text\"\n" +
    "               class=\"form-control search-input\"\n" +
    "               placeholder=\"{{'Search'|translate}}\"\n" +
    "               ng-model=\"searchTerm\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "            <button class=\"btn btn-default\" type=\"submit\">\n" +
    "                <span class=\"icon-fw {{ iconBaseClass() }} {{ searchIconClass }}\"></span>\n" +
    "            </button>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</form>"
  );


  $templateCache.put('template/eeh-navigation/sidebar/eeh-navigation-sidebar.html',
    "<nav class=\"navbar navbar-default eeh-navigation eeh-navigation-sidebar\" role=\"navigation\">\n" +
    "    <div class=\"navbar-collapse\" collapse=\"isNavbarCollapsed\">\n" +
    "        <ul class=\"nav sidebar-nav\">\n" +
    "            <li class=\"sidebar-search\" ng-show=\"!_sidebarTextCollapse.isCollapsed && _sidebarSearch.isVisible\">\n" +
    "                <eeh-navigation-search-input search-term=\"searchInputModel\" submit=\"searchInputSubmit\" ng-if=\"searchInputIsVisible\"></eeh-navigation-search-input>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"item in sidebarMenuItems | orderBy:'weight'\"\n" +
    "                ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "                ng-if=\"item._isVisible()\"\n" +
    "                ui-sref-active-eq=\"active\" eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "            <li ng-click=\"toggleSidebarTextCollapse()\" ng-if=\"_sidebarTextCollapse.isVisible && isSidebarVisible()\">\n" +
    "                <a>\n" +
    "                    <span class=\"icon-fw {{ iconBaseClass() }}\" ng-class=\"_sidebarTextCollapse.isCollapsed ? collapsedSidebarIconClass : expandedSidebarIconClass\"></span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "<div id=\"eeh-navigation-page-wrapper\" ng-class=\"{ 'sidebar-invisible': !isSidebarVisible() }\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div ng-transclude></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/sidebar-menu-item.html\">\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"!item.state && item.hasChildren() && !_sidebarTextCollapse.isCollapsed\"\n" +
    "       ng-click=\"item.isCollapsed = !item.isCollapsed\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "        <span class=\"navbar-right sidebar-arrow icon-fw {{ iconBaseClass() }}\"\n" +
    "              ng-class=\"item.isCollapsed ? collapsedMenuItemIconClass : expandedMenuItemIconClass\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"!item.state && item.hasChildren() && !_sidebarTextCollapse.isCollapsed\" collapse=\"item.isCollapsed\"\n" +
    "        class=\"nav sidebar-nav\">\n" +
    "        <li ng-repeat=\"item in item.children()\"\n" +
    "            ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            ui-sref-active-eq=\"active\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );

}]);
