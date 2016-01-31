module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-bridget/jquery-bridget.js',
                    'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                    'bower_components/masonry/dist/masonry.pkgd.js',
                    'bower_components/desandro-matches-selector/matches-selector.js',
                    'bower_components/get-size/get-size.js',
                    'bower_components/ev-emitter/ev-emitter.js',
                    'bower_components/fizzy-ui-utils/utils.js',
                    'bower_components/outlayer/item.js',
                    'bower_components/outlayer/outlayer.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-masonry/angular-masonry.js'
                ],
                dest: 'plugins/plugins.js',
            }
        },
        watch: {
            scripts: {
                files: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-bridget/jquery-bridget.js',
                    'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                    'bower_components/masonry/dist/masonry.pkgd.js',
                    'bower_components/desandro-matches-selector/matches-selector.js',
                    'bower_components/get-size/get-size.js',
                    'bower_components/ev-emitter/ev-emitter.js',
                    'bower_components/fizzy-ui-utils/utils.js',
                    'bower_components/outlayer/item.js',
                    'bower_components/outlayer/outlayer.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-masonry/angular-masonry.js'
                ],
                tasks: ['concat'],
                options: {
                    spawn: false,					

                },
            },
        }
    });
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};