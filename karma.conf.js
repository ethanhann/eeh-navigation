'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/eeh-navigation.js',
            'src/*.js'
        ],

        preprocessors: {
            'src/!(*spec).js': ['coverage']
        }
    });
};
