module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //Describe each task
    concat : {
      dist: {
        src: [
          'js/modules/*.js',
          'js/main.js'
        ],
        dest: 'prod/concat.js'
      }
    },

    babel: {
      options: {
          sourceMap: false,
          presets: ['env']
      },
    dist: {
      files: {
                'prod/production.js' : 'prod/concat.js'
          }
      }
    },

    uglify : {
      build: {
        src: 'prod/production.js',
        dest: 'prod/production.min.js'
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
          'css/main.css' : 'css/scss/main.scss'
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
        src: 'css/main.css'
      }
    },
    imagemin: {
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'img/',
                  src: ['*.{png,jpg,gif}'],
                  dest: 'img/'
              }]
          }
      },

    watch : {
      scripts : {
        files : ['js/main.js', 'js/modules/*.js'],
        tasks : ['concat', 'babel', 'uglify'],
        options : {
          spawn : false
        }
      },
      sass: {
        files: ['css/scss/*.scss'],
        tasks: ['sass','postcss'],
        options: {
            spawn: false,
        }
      },
      images: {
        files: ['img/*.{png,jpg,gif}'],
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
  grunt.registerTask('default', ['concat', 'babel', 'uglify', 'sass', 'watch', 'imagemin']);
};
