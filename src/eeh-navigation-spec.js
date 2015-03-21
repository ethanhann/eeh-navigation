'use strict';

describe('eehNavigation module', function() {
    beforeEach(module('eehNavigation'));
    it('should be loaded by angular', function() {
        expect(typeof angular.module('eehNavigation')).toBe('object');
    });
});