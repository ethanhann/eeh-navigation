'use strict';

describe('eehMenu', function () {
    var eehMenu;

    beforeEach(module('eehMenu'));

    beforeEach(inject(function ($injector) {
        eehMenu = $injector.get('eehMenu');
    }));

    describe('Menu Items', function () {
        it('should create a named menu item and return reference to service', function () {
            var name = 'foo';
            var config = {
                text: 'Foo',
                href: '/foo'
            };

            var service = eehMenu.menuItem(name, config);

            expect(service).toBe(eehMenu);
            expect(eehMenu.menuItem(name)).toEqual(jasmine.objectContaining(config));
        });

        it('should get a list of menu items', function () {
            eehMenu.menuItem('menu.foo', {});
            eehMenu.menuItem('menu.bar', {});

            var menuItems = eehMenu.menuItemTree('menu');

            expect(menuItems.length).toEqual(2);
        });
    });
});