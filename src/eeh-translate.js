'use strict';

angular.module('eehTranslate', []);

var TranslateService = function ($injector) {
    if ($injector.has('$translate')) {
        this.$translate = $injector.get('$translate');
    }
};
TranslateService.prototype.isAvailable = function () {
    return angular.isDefined(this.$translate);
};
angular.module('eehTranslate').service('eehTranslate', ['$injector', TranslateService]);
var TranslateFilter = function (eehTranslate) {
    var self = this;
    self.eehTranslate = eehTranslate;
    return function (text) {
        return self.eehTranslate.isAvailable() ? self.eehTranslate.$translate.instant(text) : text;
    };
};
angular.module('eehTranslate').filter('eehTranslate', ['eehTranslate', TranslateFilter]);
