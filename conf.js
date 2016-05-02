/**
 * Created by nikolai on 16.4.16.
 *
 */

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'report.html',
    reportTitle: "Report Title"
});

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['new_feature_public.js'],

    jasmineNodeOpts: {
        showColors: true
    },

    beforeLaunch: function() {
        return new Promise(function(resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
        browser.manage().timeouts().pageLoadTimeout(30000);
        browser.manage().timeouts().implicitlyWait(10000);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    params: require('./config.json')
};