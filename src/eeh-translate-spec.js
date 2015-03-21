'use strict';

describe('eehTranslate module', function () {
    var eehTranslate;
    var mockTranslate;
    beforeEach(module('eehTranslate'));

    beforeEach(function () {
        mockTranslate = jasmine.createSpyObj('$translate', ['instant']);
        mockTranslate.instant = jasmine.createSpy('instant');
        module(function ($provide) {
            $provide.value('$translate', mockTranslate);
        });
    });

    beforeEach(inject(function ($injector) {
        eehTranslate = $injector.get('eehTranslate');
    }));

    it('should be loaded by angular', function () {
        expect(typeof angular.module('eehTranslate')).toBe('object');
    });

    describe('eehTranslate service', function () {
        it('should indicate that wrapped translate service is available', function () {
            var expected = true;

            var actual = eehTranslate.isAvailable();

            expect(actual).toEqual(expected);
        });

        it('should call the wrapped translate service\'s translation method and return the result', function () {
            var result = eehTranslate.instant('foo', 'bar', 'baz');

            expect(mockTranslate.instant).toHaveBeenCalled();
            expect(result).toEqual();
        });
    });
});
