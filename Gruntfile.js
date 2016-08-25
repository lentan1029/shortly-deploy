module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'public/client/*.js', 
          '!public/client/router.js',
          'public/lib/*.js',
          'public/client/router.js'],
        dest: 'public/dist/built.js',
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js'],
        options: {
          bail: true
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          nodeArgs: ['']
        },
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'build',
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    eslint: {
      src: ['test/*.js', 'public/client/*.js', 'public/lib/*.js', 'lib/*.js']
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },

    clean: ['public/dist/built.js', 'public/dist/built.min.js', 'public/dist/style.min.css']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    if (grunt.option('debug')) {
      grunt.config('nodemon.dev.options.nodeArgs', '--debug');
      grunt.task.run([ 'nodemon', 'watch' ]);
    } else {
      grunt.config('nodemon.dev.options.nodeArgs', '');
      grunt.task.run([ 'nodemon', 'watch' ]);
    }
  });


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'clean',
    'cssmin',
    'concat',
    'uglify',
    'test',
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['shell:prodServer']);

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function() {
    // add your deploy tasks here
    if (grunt.option('prod')) {
      grunt.task.run([
        'build',
        'upload'
      ]);
    } else {
      grunt.task.run(['build']);
    }
  });

};