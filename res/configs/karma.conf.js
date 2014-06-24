// Karma configuration
// Generated on Wed Apr 23 2014 17:43:33 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	  'iAuto.js',
	  'ut/spec/*.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js',
	  'ut/spec/UT_api_BaseAPI.js',
	  'ut/spec/UT_api_Vechile.js',
	  'ut/spec/UT_api_AppManager.js',
	  'ut/spec/UT_network_SocketClientManager.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'iAuto.js': 'coverage'
    },

	coverageReporter: {
		//{type: 'html', dir:'coverage/'},
		//{type : 'cobertura', dir : 'coverage/'}
		type : 'cobertura',
    	dir : 'karmaOut/'
	},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit', 'coverage'],

	junitReporter: {
		outputFile : 'karmaOut/test-results.xml'
	},


    // web server port
    port: 9876,

	runnerPort: 8000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
