'use strict';

describe('eehNavigationProvider', function () {
    var provider;

    beforeEach(module('eehNavigation'));

    beforeEach(function(){
        module(function(eehNavigationProvider){
            provider = eehNavigationProvider;
        });
    });

    beforeEach(inject());

    it('should provide "glyphicon" for the iconBaseClass by default', function () {
        var expected = 'glyphicon';

        var actual = provider.iconBaseClass();

        expect(actual).toEqual(expected);
    });
});
