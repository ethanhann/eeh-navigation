---
currentMenu: sidebar-text-collapse-menu-item
---

# Sidebar Text Collapse Menu Item

The text collapse menu item toggles the visiblity of the text in the sidebar items.

## sidebarTextCollapseIsCollapsed

A function that takes a boolean value which sets the collapsed state of the sidebar menu items' text.

```
// Collapse/hide text
eehNavigationProvider.sidebarTextCollapseIsCollapsed(true);
// Expand/show text
eehNavigationProvider.sidebarTextCollapseIsCollapsed(false);
```

## sidebarTextCollapseIsVisible

A function that takes a boolean value which sets the visibility of the text collapse menu item (not the collapse state).

```
// Hide text collapse button
eehNavigationProvider.sidebarTextCollapseIsVisible(false);
// Show text collapse button
eehNavigationProvider.sidebarTextCollapseIsVisible(true);
```

## sidebarTextCollapseToggleCollapsed

A parameterless function which toggles the collapse state of the sidebar collapse menu item.

```
eehNavigationProvider.sidebarTextCollapseToggleCollapsed();
```
