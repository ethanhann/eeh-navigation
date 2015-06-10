# Sidebar Directive

```html
&lt;eeh-navigation-sidebar
  root-menu-name="string"
  [top-offset="number"]
  [collapsed-menu-item-icon-class="string"]
  [expanded-menu-item-icon-class="string"]
  [collapsed-sidebar-icon-class="string"]
  [expanded-sidebar-icon-class="string"]
  [search-input-is-visible="boolean"]
  [search-input-submit="function"]
  [is-text-collapse-button-visible="boolean"]
  [is-text-collapsed="boolean"]
  &gt;
&lt;/eeh-navigation-sidebar&gt;
```

There are a number of attributes that can modify the __eeh-navigation-sidebar__ directive.

__top-offset__

This attribute offsets the top position of the sidebar.
The default value is _51_ which is the default height of the navbar.
This attribute should be used if the navbar's height is something different or if the navbar is not used.

__collapsed-menu-item-icon-class__

This attribute sets the icon used to indicate that a parent of a nested menu item is collapsed.
"glyphicon-chevron-left" is the default value.

__expanded-menu-item-icon-class__

This attribute sets the icon used to indicate that a parent of a nested menu item is expanded.
"glyphicon-chevron-down" is the default value.

__collapsed-sidebar-icon-class__

This attribute sets the icon used to indicate that the sidebar is collapsed.
"glyphicon-arrow-right" is the default value.

__expanded-sidebar-icon-class__

This attribute sets the icon used to indicate that the sidebar is collapsed.
"glyphicon-arrow-left" is the default value.

__search-input-is-visible__

This attribute causes the search input to be shown or hidden.
The default value is true.

__search-input-submit__

The callback function assigned to this attribute is run when the search input is submitted.
The text in the search input is passed to the callback function.
There is no default value for this attribute.

__is-text-collapse-button-visible__

This attribute causes the text collapse toggle button to be shown or hidden.
The default value is true.

__is-text-collapsed__

This attribute sets the state of the text collapse button.
The default value is false.
