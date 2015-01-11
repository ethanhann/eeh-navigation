---
currentMenu: nested-sidebar-menu-items
---

# Nested Sidebar Menu Items

Sidebar menu items can be nested by using a **.** in the first parameter of sidebarMenuItem.
    If a menu item has children, do not assign a menu item action to it.

```
eehNavigationProvider
    .sidebarMenuItem('root', { // The root level of the nested menu.
        text: 'Root'
    })
    .sidebarMenuItem('root.foo', { // The first item under root.
        text: 'Foo',
        href: '/some/path'
    })
    .sidebarMenuItem('root.bar', { // The second item under root.
        text: 'Bar',
        href: '/some/path'
    })
    .sidebarMenuItem('root.baz', { // The third item under root.
        text: 'Baz'
    })
    .sidebarMenuItem('root.baz.qux', { // The first item under root.baz
        text: 'Quz',
        href: '/some/path'
    })
    .sidebarMenuItem('root.baz.quux', { // The second item under root.baz
        text: 'Quux',
        href: '/some/path'
    });
```

## isCollapsed

A boolean value. Configure the collapse state of a parent menu item. Each parent in a nested hierarchy has an independent collapse state.

```
eehNavigationProvider
    .sidebarMenuItem('root', {
        text: 'Root',
        isCollapsed: true
    })
    .sidebarMenuItem('root.foo', {
        text: 'Foo',
        href: '/some/path'
    });
```
