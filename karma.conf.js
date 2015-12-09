'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        singleRun: true,
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['dots', 'progress'],
        plugins: [
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/menu.js/dist/menu.js',
            'src/eeh-navigation.js',
            'src/**/*.js'
        ],
        preprocessors: {
            'src/!(*spec).js': ['coverage']
        }
    });
};
