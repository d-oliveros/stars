module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      javascript:{
        src: ['bower_components/jquery/dist/jquery.min.js', 'js/main.js', 'js/playground/*.js'],
        dest: 'build/stars.js'
      },
      css: {
        src: ['css/normalize.css', 'css/base.css', 'css/layout.css', 'css/style.css', 'css/responsive.css', 'css/animations.css'],
        dest: 'build/stars.css'
      }
    },

    uglify: {
      options:{
        preserveComments: 'some'
      },
      dist:{
        files: {
          'build/stars.min.js': ['<%= concat.javascript.dest %>']
        }
      }
    },

    cssmin:{
      minify: {
        src: '<%= concat.css.dest %>',
        dest: 'build/stars.min.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};