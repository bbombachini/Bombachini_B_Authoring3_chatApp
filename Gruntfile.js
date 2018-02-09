module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //Describe each task
    concat : {
      dist: {
        src: [
          'public/js/modules/*.js',
          'public/js/main.js'
        ],
        dest: 'public/js/prod/concat.js'
      }
    },

    babel: {
      options: {
          sourceMap: false,
          presets: ['env']
      },
    dist: {
      files: {
                'public/js/prod/production.js' : 'public/js/prod/concat.js'
          }
      }
    },

    uglify : {
      build: {
        src: 'public/js/prod/production.js',
        dest: 'public/js/prod/production.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          debugInfo : true,
          noCache: true
        },
        files : {
          'public/css/main.css' : 'public/css/scss/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}),
        ]
      },
      dist: {
        src: 'public/css/main.css'
      }
    },
    imagemin: {
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'public/img/',
                  src: ['*.{png,jpg,gif}'],
                  dest: 'public/img/'
              }]
          }
      },

    watch : {
      scripts : {
        files : ['public/js/main.js', 'public/js/modules/*.js'],
        tasks : ['concat', 'babel', 'uglify'],
        options : {
          spawn : false
        }
      },
      sass: {
        files: ['public/css/scss/*.scss'],
        tasks: ['sass','postcss'],
        options: {
            spawn: false,
        }
      },
      images: {
        files: ['public/img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
            spawn: false,
        }
      }
    }
  });

  //Plugis used in the task
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Tasks performs when grunt run
  grunt.registerTask('default', ['concat', 'babel', 'uglify', 'sass', 'imagemin', 'watch']);
};
// npm install --save-dev git://github.com/gruntjs/grunt-contrib-uglify.git#harmony
