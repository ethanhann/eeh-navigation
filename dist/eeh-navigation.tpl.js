angular.module('eehNavigation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/eeh-navigation/menu-item-content/eeh-navigation-menu-item-content.html',
    "<span ng-if=\"menuItem.isIconVisible\"\n" +
    "      class=\"menu-item-icon icon-fw {{ iconBaseClass() }} {{ menuItem.iconClass}}\"></span>\n" +
    "<span ng-if=\"menuItem.text\"\n" +
    "      class=\"menu-item-text\"> {{ menuItem.text|translate }}</span>\n" +
    "<span ng-if=\"menuItem._ngBindHtml()\" ng-bind-html=\"menuItem._ngBindHtml()\"></span>\n"
  );


  $templateCache.put('template/eeh-navigation/menu/eeh-navigation-menu.html',
    "<nav ng-class=\"navClass\">\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in menuItems | orderBy:'weight'\"\n" +
    "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-menu-' + item.menuItemName}}\"\n" +
    "            ng-include=\"'template/eeh-navigation/list-menu-item.html'\"\n" +
    "            ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "    </ul>\n" +
    "</nav>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/list-menu-item.html\">\n" +
    "    <p ng-if=\"item.isReadOnly\" class=\"read-only-menu-item\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </p>\n" +
    "    <span ng-if=\"item.ngInclude\" ng-include=\"item.ngInclude\"></span>\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"!item.state && item.hasChildren()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "        <span class=\"float-right icon-fw {{ iconBaseClass() }}\"\n" +
    "              ng-class=\"item.isCollapsed ? menuItemCollapsedIconClass : menuItemExpandedIconClass\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"!item.state && item.hasChildren()\">\n" +
    "        <li ng-repeat=\"item in item.children()\"\n" +
    "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-menu-' + item.menuItemName}}\"\n" +
    "            ng-include=\"'template/eeh-navigation/list-menu-item.html'\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );


  $templateCache.put('template/eeh-navigation/navbar/eeh-navigation-navbar-brand.html',
    "<a ng-if=\"state && !href && (text || src)\"\n" +
    "   class=\"navbar-brand\"\n" +
    "   ng-click=\"click()\"\n" +
    "   ui-sref=\"{{ state }}\">\n" +
    "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" +
    "</a>\n" +
    "\n" +
    "<a ng-if=\"!state && href && (text || src)\"\n" +
    "   class=\"navbar-brand\"\n" +
    "   ng-click=\"click()\"\n" +
    "   ng-href=\"{{ href }}\"\n" +
    "   target=\"{{ target ? target : '_self'}}\">\n" +
    "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" +
    "</a>\n" +
    "\n" +
    "<span ng-if=\"!state && !href && (text || src)\"\n" +
    "      ng-click=\"click()\"\n" +
    "      class=\"navbar-brand\">\n" +
    "    <span ng-include=\"'template/eeh-navigation/navbar-brand-content.html'\"></span>\n" +
    "</span>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/navbar-brand-content.html\">\n" +
    "    <img ng-if=\"src\" ng-src=\"{{ src }}\">\n" +
    "    <span ng-if=\"text\">{{ text|translate }}</span>\n" +
    "</script>\n" +
    "\n"
  );


  $templateCache.put('template/eeh-navigation/navbar/eeh-navigation-navbar.html',
    "<nav class=\"navbar eeh-navigation eeh-navigation-navbar\"\n" +
    "     ng-class=\"navClass\"\n" +
    "     role=\"navigation\">\n" +
    "    <div ng-class=\"containerClass\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" ng-click=\"isNavbarCollapsed = !isNavbarCollapsed\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <eeh-navigation-navbar-brand text=\"brandText\"\n" +
    "                                         state=\"brandState\"\n" +
    "                                         href=\"brandHref\"\n" +
    "                                         target=\"brandTarget\"\n" +
    "                                         src=\"brandSrc\"\n" +
    "                                         click=\"brandClick\"></eeh-navigation-navbar-brand>\n" +
    "        </div>\n" +
    "        <div uib-collapse=\"isNavbarCollapsed\" class=\"navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav navbar-left\">\n" +
    "                <li ng-repeat=\"item in leftNavbarMenuItems | orderBy:'weight'\"\n" +
    "                    ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" +
    "                    ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "                    ng-if=\"item._isVisible()\"\n" +
    "                    uib-dropdown\n" +
    "                    ui-sref-active-eq=\"active\"\n" +
    "                    eeh-navigation-active-menu-item=\"item\">\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li ng-repeat=\"item in rightNavbarMenuItems | orderBy:'weight'\"\n" +
    "                    ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" +
    "                    ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "                    ng-if=\"item._isVisible()\"\n" +
    "                    uib-dropdown\n" +
    "                    ui-sref-active-eq=\"active\"\n" +
    "                    eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/navbar-menu-item.html\">\n" +
    "    <p ng-if=\"item.isReadOnly\" class=\"navbar-text\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </p>\n" +
    "    <span ng-if=\"item.ngInclude\" ng-include=\"item.ngInclude\"></span>\n" +
    "    <a ng-if=\"!item.isDivider && item.state\" ui-sref=\"{{ item.state }}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.hasChildren()\" uib-dropdown-toggle=\"\">\n" +
    "        <span class=\"icon-fw {{ iconBaseClass() }} {{ item.iconClass }}\"></span>\n" +
    "        <span> {{ item.text|translate }}</span>\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"item.hasChildren()\" class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"item in item.children()|orderBy:'weight'\"\n" +
    "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-navbar-' + item.menuItemName}}\"\n" +
    "            ng-class=\"{'divider': item.isDivider}\"\n" +
    "            ng-include=\"'template/eeh-navigation/navbar-menu-item.html'\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            ui-sref-active-eq=\"active\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );


  $templateCache.put('template/eeh-navigation/search-input/eeh-navigation-search-input.html',
    "<div ng-include=\"'template/eeh-navigation/search-input.html'\"\n" +
    "     ng-if=\"!isCollapsed\"\n" +
    "     class=\"eeh-navigation-search-input\"></div>\n" +
    "\n" +
    "<a class=\"eeh-navigation-search-input\" ng-href=\"\" ng-if=\"isCollapsed\"\n" +
    "   popover-placement=\"right\"\n" +
    "   popover-append-to-body=\"'true'\"\n" +
    "   uib-popover-template=\"'template/eeh-navigation/search-input-popover.html'\">\n" +
    "    <span class=\"menu-item-icon icon-fw {{ iconBaseClass() }} {{ iconClass }}\"></span>\n" +
    "</a>\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/search-input-popover.html\">\n" +
    "    <div class=\"row search-input-popover\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div ng-include=\"'template/eeh-navigation/search-input.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"template/eeh-navigation/search-input.html\">\n" +
    "    <form ng-submit=\"submit(model.query)\" class=\"navbar-form\" ng-class=\"classes\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <input type=\"text\"\n" +
    "                   class=\"form-control\"\n" +
    "                   placeholder=\"{{'Search'|translate}}\"\n" +
    "                   ng-model=\"model.query\">\n" +
    "        <span class=\"input-group-btn\" ng-if=\"!isCollapsed\">\n" +
    "            <button class=\"btn btn-default\">\n" +
    "                <span class=\"icon-fw {{ iconBaseClass() }} {{ iconClass }}\"></span>\n" +
    "            </button>\n" +
    "        </span>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</script>\n"
  );


  $templateCache.put('template/eeh-navigation/sidebar/eeh-navigation-sidebar.html',
    "<nav class=\"navbar navbar-default eeh-navigation eeh-navigation-sidebar\" role=\"navigation\"\n" +
    "    ng-class=\"navClass\">\n" +
    "    <div class=\"navbar-collapse\" uib-collapse=\"isNavbarCollapsed\">\n" +
    "        <ul class=\"nav sidebar-nav\">\n" +
    "            <li class=\"sidebar-search\" ng-if=\"searchInputIsVisible\">\n" +
    "                <eeh-navigation-search-input class=\"sidebar-search-input\"\n" +
    "                                             icon-class=\"searchInputIconClass\"\n" +
    "                                             submit=\"searchInputSubmit\"\n" +
    "                                             is-collapsed=\"sidebarIsCollapsed\"></eeh-navigation-search-input>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"item in sidebarMenuItems | orderBy:'weight'\"\n" +
    "                ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-sidebar-' + item.menuItemName}}\"\n" +
    "                ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "                ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" +
    "                ng-if=\"item._isVisible()\"\n" +
    "                ng-click=\"topLevelMenuItemClickHandler(item)\"\n" +
    "                ui-sref-active-eq=\"active\"\n" +
    "                eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "            <li ng-click=\"toggleSidebarTextCollapse()\" ng-if=\"sidebarCollapsedButtonIsVisible && isSidebarVisible()\">\n" +
    "                <a>\n" +
    "                    <span class=\"icon-fw {{ iconBaseClass() }}\" ng-class=\"sidebarIsCollapsed ? sidebarCollapsedIconClass : sidebarExpandedIconClass\"></span>\n" +
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
    "    <p ng-if=\"item.isReadOnly\" class=\"navbar-text\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </p>\n" +
    "    <span ng-if=\"item.ngInclude\" ng-include=\"item.ngInclude\"></span>\n" +
    "    <a ng-if=\"item.state\" ui-sref=\"{{item.state}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.click\" ng-click=\"item.click()\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"item.href\" ng-href=\"{{item.href}}\" target=\"{{item.target ? item.target : '_self'}}\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"!item.state && item.hasChildren()\"\n" +
    "       ng-click=\"item.isCollapsed = !item.isCollapsed\">\n" +
    "        <span eeh-navigation-menu-item-content=\"item\"></span>\n" +
    "        <span class=\"navbar-right sidebar-arrow icon-fw {{ iconBaseClass() }}\"\n" +
    "              ng-class=\"item.isCollapsed ? menuItemCollapsedIconClass : menuItemExpandedIconClass\"></span>\n" +
    "    </a>\n" +
    "    <ul ng-if=\"!item.state && item.hasChildren()\" uib-collapse=\"item.isCollapsed\"\n" +
    "        ng-class=\"{ 'text-collapsed': sidebarIsCollapsed }\"\n" +
    "        class=\"nav sidebar-nav sidebar-nav-nested\">\n" +
    "        <li ng-repeat=\"item in item.children() | orderBy:'weight'\"\n" +
    "            ng-attr-id=\"{{item.id ? item.id : 'eeh-navigation-sidebar-' + item.menuItemName}}\"\n" +
    "            ng-include=\"'template/eeh-navigation/sidebar-menu-item.html'\"\n" +
    "            ng-class=\"{ 'leaf': !item.hasChildren() }\"\n" +
    "            ng-if=\"item._isVisible()\"\n" +
    "            ui-sref-active-eq=\"active\"\n" +
    "            eeh-navigation-active-menu-item=\"item\"></li>\n" +
    "    </ul>\n" +
    "</script>\n"
  );

}]);
