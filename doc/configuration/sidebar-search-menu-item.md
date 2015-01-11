---
currentMenu: sidebar-search-menu-item
---

# Sidebar Search Menu Item

The sidebar search menu item is a special type of menu item. It is not sortable with a __weight__ property,
or nestable by specifying children. It is also hidden when the sidebar text is collapsed to only show icons.

## searchIsVisible

A boolean value. Assigned to __ng-show__ on the search text input.

```
// Hide search input
eehNavigationProvider.searchIsVisible(false);
// Show search input
eehNavigationProvider.searchIsVisible(true);
```

## searchModel

A text value. Assigned to __ng-model__ on the search text input.

```
var searchText = 'some search text';
eehNavigationProvider.searchModel = searchText;
```

## searchSubmit

A function. Called, via __ng-submit__, when the search button is clicked or enter is pressed while the search input is in focus.

```
eehNavigationProvider.searchSubmit = function () {
    // Do something like submit an HTTP request or navigate to a state
};
```
