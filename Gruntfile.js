'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        settings: {
            src: 'src',
            dist: 'dist',
            libName: 'navigation'
        },
        exec: {
            generateChangelog: {
                cmd: function() {
                    return 'git log --oneline --decorate --no-merges > changelog.txt';
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            src: [
                '<%= settings.src %>/{,*/}*.js'
            ]
        },
        ngtemplates: {
            eehNavigation: {
                cwd: '<%= settings.src %>',
                src: 'navigation.html',
                dest: '<%= settings.dist %>/navigation.tpl.js',
                options:  {
                    url: function (url) {
                        return 'template/eeh-navigation/' + url;
                    }
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.src %>/scss/',
                    src: ['**/*.scss'],
                    dest: '<%= settings.dist %>',
                    ext: '.css'
                }]
            }
        },
        watch: {
            src: {
                files: ['src/**/*.*'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            beautify: {
                files: {
                    '<%= settings.dist %>/<%= settings.libName %>.js': ['<%= settings.src %>/*.js']
                },
                options: {
                    wrap: '<%= settings.libName %>',
                    compress: false,
                    mangle: false,
                    beautify: true
                }
            },
            minify: {
                files: {
                    '<%= settings.dist %>/<%= settings.libName %>.min.js': ['<%= settings.src %>/*.js'],
                    '<%= settings.dist %>/<%= settings.libName %>.tpl.min.js': ['<%= settings.dist %>/*.tpl.js']
                },
                options: {
                    wrap: '<%= settings.libName %>',
                    sourceMap: true
                }
            }
        },
        versioncheck: {
            options: {
                hideUpToDate : true
            }
        }
    });

    grunt.registerTask('dev', [
        'watch:src'
    ]);

    grunt.registerTask('health-check', [
        'versioncheck'
    ]);

    grunt.registerTask('lint', [
        'jshint:src'
    ]);

    grunt.registerTask('build', [
        'sass:dist',
        'ngtemplates',
        'uglify:beautify',
        'uglify:minify'
    ]);

    grunt.registerTask('release', [
        'lint',
        'build',
        'exec:generateChangelog'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
