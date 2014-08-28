'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        copy: {
            src: {
                files: [
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['*.js', '*.css'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        ngtemplates: {
            eehNavigation: {
                cwd: 'src/',
                src: 'navigation.html',
                dest: 'dist/navigation.tpl.js',
                options:  {
                    url: function (url) {
                        return 'template/eeh-navigation/' + url;
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['ngtemplates', 'copy']);
};
