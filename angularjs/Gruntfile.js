module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    //Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        basePath: './',
        srcPath: './public/sass/',
        deployPath: './public/assets/css/',
        bowerPath: './public/assets/bower_components/'
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

    // Task configuration.
    connect: {
      server: {
        options: {
          port: 8080,
          base: './public',
          middleware: function(connect, options, middlewares) {

            middlewares.unshift(function(req, res, next) {
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                next();
            });
        
            return middlewares;
         } 
        }
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        autoWatch: false,
        background: true
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          loadPath: ['<%= meta.bowerPath %>foundation/scss/', '<%= meta.bowerPath %>foundation/scss/foundation/components/']
        },
        files: {
            '<%= meta.deployPath %>main.css': '<%= meta.srcPath %>main.scss'
        }
      }
    },

    watch: {
      sasstocss: {
        files: ['<%= meta.srcPath %>/**/*.scss'],
        tasks: ['sass']
      },

      /* watch and see if our javascript files change, or new packages are installed */
      js: {
        files: ['public/app/**/*.js'],
        tasks: []
      },

      karma: {
        files: ['public/app/**/*.js', 'test/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask('default', ['sass', 'connect', 'watch']);
  grunt.registerTask('test', ['sass', 'karma:unit:start', 'connect', 'watch']);
};
