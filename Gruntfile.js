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
                    }]
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
                    'build/eu-notice.min.js': ['js/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('build', ['compass:build', 'uglify:build', 'cssmin']);
};
