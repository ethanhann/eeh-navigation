'use strict';

describe('eehMenuProvider', function () {
    var provider;

    beforeEach(module('eehMenu'));

    beforeEach(function(){
        module(function(eehMenuProvider){
            provider = eehMenuProvider;
        });
    });

    beforeEach(inject());

    it('should provide "glyphicon" for the iconBaseClass by default', function () {
        var expected = 'glyphicon';

        var actual = provider.iconBaseClass();

        expect(actual).toEqual(expected);
    });
});
