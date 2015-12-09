'use strict';

describe('eehNavigation', function () {
    var eehNavigation;

    beforeEach(module('eehNavigation'));

    beforeEach(inject(function ($injector) {
        eehNavigation = $injector.get('eehNavigation');
    }));

    describe('Menu Items', function () {
        it('should create a named menu item and return reference to service', function () {
            var name = 'foo';
            var config = {
                text: 'Foo',
                href: '/foo'
            };

            var service = eehNavigation.menuItem(name, config);

            expect(service).toBe(eehNavigation);
            expect(eehNavigation.menuItem(name)).toEqual(jasmine.objectContaining(config));
        });

        it('should get a list of menu items', function () {
            eehNavigation.menuItem('menu.foo', {});
            eehNavigation.menuItem('menu.bar', {});

            var menuItems = eehNavigation.menuItemTree('menu');

            expect(menuItems.length).toEqual(2);
        });
    });
});