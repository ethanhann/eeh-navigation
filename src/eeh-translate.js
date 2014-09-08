'use strict';

angular.module('eehTranslate', []);

/**
 * Service.
 */
var TranslateService = function ($injector) {
    if ($injector.has('$translate')) {
        this._translate = $injector.get('$translate');
    }
};

TranslateService.prototype.isAvailable = function () {
    return angular.isDefined(this._translate);
};

TranslateService.prototype.instant = function (translationId, interpolateParams, interpolationId) {
    return this.isAvailable() ? this._translate.instant(translationId, interpolateParams, interpolationId) : translationId;
};

angular.module('eehTranslate').service('eehTranslate', ['$injector', TranslateService]);

/**
 * Filter.
 */
var TranslateFilter = function (eehTranslate) {
    var self = this;
    self.eehTranslate = eehTranslate;
    return function (text) {
        return self.eehTranslate.instant(text);
    };
};

angular.module('eehTranslate').filter('eehTranslate', ['eehTranslate', TranslateFilter]);
