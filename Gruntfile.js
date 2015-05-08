'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        settings: {
            src: 'src',
            build: 'build',
            dist: 'dist',
            libName: 'eeh-navigation',
            docDev: 'doc/.couscous/generated/bower_components/eeh-navigation/dist'
        },
        copy: {
            dev: {
                files: [{
                        expand: true,
                        flatten: true,
                        src: ['<%= settings.dist %>/*'],
                        dest: '<%= settings.docDev %>'
                }]
            }
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
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        ngAnnotate: {
            eehNavigation: {
                files: {
                    '<%= settings.build %>/<%= settings.libName %>.annotated.js': [
                        '<%= settings.src %>/eeh-translate.js',
                        '<%= settings.src %>/eeh-navigation.js',
                        '<%= settings.src %>/eeh-navigation-*.js',
                        '<%= settings.src %>/*/eeh-navigation-*.js',
                        '!<%= settings.src %>/**/*-spec.js'
                    ]
                }
            }
        },
        ngtemplates: {
            eehNavigation: {
                cwd: '<%= settings.src %>',
                src: ['**/*.html'],
                dest: '<%= settings.dist %>/eeh-navigation.tpl.js',
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
                    cwd: '<%= settings.src %>/',
                    src: ['**/*.scss'],
                    dest: '<%= settings.dist %>',
                    flatten: true,
                    ext: '.css'
                }]
            }
        },
        watch: {
            src: {
                files: ['src/**/*.*'],
                tasks: ['build', 'copy:dev'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            beautify: {
                files: {
                    '<%= settings.dist %>/<%= settings.libName %>.js': [
                        '<%= settings.build %>/<%= settings.libName %>.annotated.js'
                    ]
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
                    '<%= settings.dist %>/<%= settings.libName %>.min.js': [
                        '<%= settings.build %>/<%= settings.libName %>.annotated.js'
                    ],
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

    grunt.registerTask('test', [
        'lint',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'sass:dist',
        'ngtemplates',
        'ngAnnotate',
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
