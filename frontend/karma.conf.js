module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {}
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },          // Full detailed report in /coverage/index.html
        { type: 'lcov' },          // For CI tools (e.g., Codecov, SonarQube)
        { type: 'text-summary' }   // 👈 Prints coverage % in terminal & CI logs
      ],
      check: {
        global: {
          statements: 20,   // 👈 Fail if below 20%
          branches: 20,
          functions: 20,
          lines: 20
        }
      }
    },
    reporters: ['progress', 'coverage'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
