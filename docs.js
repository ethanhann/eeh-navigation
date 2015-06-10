'use strict';

var Dgeni = require('dgeni');
var packages = [require('./docs/dgeni.conf')];
var dgeni = new Dgeni(packages);

dgeni.generate().then(function(docs) {
    console.log(docs.length, 'docs generated');
});
