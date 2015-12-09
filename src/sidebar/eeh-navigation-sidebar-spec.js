'use strict';

describe('eehNavigationSidebar', function () {
    var eehNavigation;

    beforeEach(module('eehNavigation'));

    beforeEach(inject(function ($injector) {
        eehNavigation = $injector.get('eehNavigation');
    }));

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
    });
});