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

    it('should indicate that the sidebar is visible by default', function () {
        var expected = true;

        var actual = eehNavigation.isSidebarVisible();

        expect(actual).toEqual(expected);
    });

    it('should indicate that the sidebar is hidden if the search menu item is not visible and there are no visible menu items', function () {
        var expected = false;
        eehNavigation.searchIsVisible(false);

        var actual = eehNavigation.isSidebarVisible();

        expect(eehNavigation.sidebarMenuItems().length).toEqual(0);
        expect(actual).toEqual(expected);
    });

    describe('Search Menu Item', function () {
        it('should get default sidebar search menu item visibility', function () {
            var expected = true;

            var actual = eehNavigation.searchIsVisible();

            expect(actual).toEqual(expected);
        });

        it('should set sidebar search menu item visibility and return reference to service', function () {
            var expected = false;

            var service = eehNavigation.searchIsVisible(expected);

            expect(service).toBe(eehNavigation);
            expect(eehNavigation.searchIsVisible()).toEqual(expected);
        });

        it('should get sidebar search menu item model', function () {
            var expected = '';

            var actual = eehNavigation.searchModel();

            expect(actual).toEqual(expected);
        });

        it('should set sidebar search menu item model and return reference to service', function () {
            var expected = 'Foo';

            var service = eehNavigation.searchModel(expected);

            expect(service).toBe(eehNavigation);
            expect(eehNavigation.searchModel()).toEqual(expected);
        });

        it('should get sidebar search menu item submit callback', function () {
            var expectedType = 'function';

            var actual = eehNavigation.searchSubmit();

            expect(typeof actual).toEqual(expectedType);
        });

        it('should set sidebar search menu item submit callback and return reference to service', function () {
            var expected = function () {
            };

            var service = eehNavigation.searchSubmit(expected);

            expect(service).toBe(eehNavigation);
            expect(eehNavigation.searchSubmit()).toEqual(expected);
        });

        it('should be able to call submit callback of sidebar search menu item', function () {
            var spy = jasmine.createSpy('spy');
            eehNavigation.searchSubmit(spy);

            eehNavigation.searchSubmit()();

            expect(eehNavigation._sidebarSearch.submit).toHaveBeenCalled();
        });
    });

    describe('Sidebar Navigation Menu Items', function () {
        it('should throw an exception if sidebar menu items does not exist', function () {
            var nonExistingMenuItemName = 'foo';
            var expected = nonExistingMenuItemName + ' is not a sidebar menu item';
            var actual = '';

            try {
                eehNavigation.sidebarMenuItem(nonExistingMenuItemName);
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

            var service = eehNavigation.sidebarMenuItem(name, config);

            expect(service).toBe(eehNavigation);
            /* global MenuItem */
            expect(eehNavigation.sidebarMenuItem(name) instanceof MenuItem).toBe(true);
        });

        it('should get a list of sidebar items', function () {
            eehNavigation.sidebarMenuItem('foo', {});
            eehNavigation.sidebarMenuItem('bar', {});

            var sidebarItems = eehNavigation.sidebarMenuItems();

            expect(sidebarItems.length).toEqual(2);
        });
    });
});