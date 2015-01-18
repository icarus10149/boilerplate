module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {   
		    dist: {
		        src: [
		            'client_side/js/*.js', // All JS in the libs folder
		            // This specific file 'js/global.js'  
		        ],
		        dest: 'client_side/production/compiled.js',
		    }
		},
		uglify: {
		    my_target: {
		        files: {
		        	'client_side/production/compiled.min.js': ['client_side/production/compiled.js']
		        }
		    }
		},
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'images/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'images/build/'
		        }]
		    }
		},
		less: {
		  development: {
		    options: {
		      paths: ["client_side/css"]
		    },
		    files: {
		      "client_side/css/styles.css": "client_side/less/styles.less"
		    }
		  },
		  production: {
		    options: {
		      paths: ["client_side/css"],
		    },
		    files: {
		      "client_side/css/styles.css": "client_side/less/styles.less"
		    }
		  }
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'client_side/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'client_side/production',
		      ext: '.min.css'
		    }]
		  }
		},
		watch: {
		    scripts: {
		        files: ['client_side/js/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    } 
		}
    });
    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less','cssmin','concat','uglify','imagemin']);

};