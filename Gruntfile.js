module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            build: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    force: true,
                    outputStyle: 'compact'
                }
            }
        },
        watch: {
            build: {
                files: ['js/*.js', 'scss/*.scss', 'scss/*/*.scss'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
                files: [{
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'build',
                        ext: '.min.css'
                    },
                ]
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                quoteStyle: 3,
                screwIE8: true
            },
            build: {
                files: {
                    'build/eu-notice.min.js': ['js/eu-notice.js'],
                    'wp-plugin-src/js/cookie-notice.min.js': ['js/wp-eu-notice.js'],
                    'wp-plugin-src/js/cookie-notice-admin.min.js': ['js/wp-eu-notice-admin.js']
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'build/cookie-notice-wp-plugin.zip'
                },
                files: [
                    {expand: true, cwd: 'wp-plugin-src', src: ['**'], dest: 'tvaliasek-cookie-notice/'}, // makes all src relative to cwd
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: false, flatten: true, src: ['build/eu-notice.min.css'], dest: 'wp-plugin-src/css/cookie-notice.min.css', filter: 'isFile'},
                    {expand: false, flatten: true, src: ['build/eu-notice.min.css.map'], dest: 'wp-plugin-src/css/cookie-notice.min.css.map', filter: 'isFile'},
                    {expand: false, flatten: true, src: ['build/admin.min.css'], dest: 'wp-plugin-src/css/cookie-notice-admin.min.css', filter: 'isFile'},
                    {expand: false, flatten: true, src: ['build/admin.min.css.map'], dest: 'wp-plugin-src/css/cookie-notice-admin.min.css.map', filter: 'isFile'},
                ]
            }
        },
        clean: {
            build:{
                src: [
                    'build/admin.min.css',
                    'build/admin.min.css.map'
                ]
            },
            buildWp: {
                src: [
                    'build/eu-notice.min.css', 
                    'build/eu-notice.min.css.map',
                    'build/admin.min.css',
                    'build/admin.min.css.map',
                    'build/eu-notice.min.js'
                ]
            },
            all:{
                src: ['build/*']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean:all','compass:build', 'uglify:build', 'cssmin', 'clean:build']);
    grunt.registerTask('build-wp-plugin', ['clean:all','compass:build', 'uglify:build', 'cssmin', 'copy', 'compress', 'clean:buildWp']);
};
