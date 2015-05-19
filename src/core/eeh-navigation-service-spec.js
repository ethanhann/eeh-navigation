'use strict';

describe('eehNavigationService', function () {
    var eehNavigation;
    beforeEach(module('eehNavigation'));

    beforeEach(inject(function ($injector) {
        eehNavigation = $injector.get('eehNavigation');
    }));

    it('should return reference to service', function () {
        var service = eehNavigation.$get();

        expect(service).toBe(eehNavigation);
    });

    describe('Sidebar Navigation Menu Items', function () {
        it('should throw an exception if sidebar menu items does not exist', function () {
            var nonExistingMenuItemName = 'foo';
            var expected = nonExistingMenuItemName + ' is not a menu item';
            var actual = '';

            try {
                eehNavigation.menuItem(nonExistingMenuItemName);
            } catch (exception) {
                actual = exception;
            }

            expect(actual).toEqual(expected);
        });

        it('should create a named menu item and return reference to service', function () {
            var name = 'foo';
            var config = {
                text: 'Foo',
                href: '/foo'
            };

            var service = eehNavigation.menuItem(name, config);

            expect(service).toBe(eehNavigation);
            /* global MenuItem */
            expect(eehNavigation.menuItem(name) instanceof MenuItem).toBe(true);
        });

        it('should get a list of menu items', function () {
            eehNavigation.menuItem('sidebar.foo', {});
            eehNavigation.menuItem('sidebar.bar', {});

            var sidebarItems = eehNavigation.menuItemTree('sidebar');

            expect(sidebarItems.length).toEqual(2);
        });
    });
});