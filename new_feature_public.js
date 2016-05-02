var helper = require('./module/helper.js');
var cst = require('./module/utils.js');

describe('New feature public', function () {

    var reportFolder = 'target/new-feature-public-builds/';
    var screenshots = reportFolder;
    var shouldExpectVisibility = false;

    var builds = 'https://g-staging.codefresh.io/public/{0}/{1}/{2}/builds';
    var buildsIds = 'https://g-staging.codefresh.io/public/{0}/{1}/{2}/builds/build/{3}';
    var buildpacks = 'https://g-staging.codefresh.io/public/{0}/{1}/buildpacks/builds';

    beforeEach(function() {
        constant = new cst.Constant();
        browser.driver.ignoreSynchronization = true;
    });

    afterEach(function () {

    });

    it('Check https://g-staging.codefresh.io/public/{0}/{1}/buildpacks/builds', function () {
        console.log('##### Start https://g-staging.codefresh.io/public/{0}/{1}/buildpacks/builds #####');
        var accounts = browser.params.accounts;
        var urlTemplate = 'https://g-staging.codefresh.io/public/{0}/{1}/buildpacks/builds';
        screenshots = screenshots + 'buildpacks/';
        shouldExpectVisibility = true;

        accounts.forEach(function (item, i, items) {
            //console.log('Account:' + item.accountName);
            checkBuildpacks(item.accountName, item.repositories, urlTemplate);
        });
    });

    it('Check https://g-staging.codefresh.io/public/:accountName/:repoOwner/:repoName/builds', function () {
        console.log('##### Start https://g-staging.codefresh.io/public/:accountName/:repoOwner/:repoName/builds #####');
        var accounts = browser.params.accounts;
        screenshots = screenshots + 'builds/';

        accounts.forEach(function (item, i, items) {
            //console.log('Account:' + item.accountName);
            checkPublicRepositories(item.accountName, item.repositories);
        });
    });

    var checkBuildpacks = function (accountName, repos, urlTemplate) {
        repos.forEach(function (item, i, items) {
            //console.log('Repository:owner=' + item.repoOwner + '; name=' + item.repoName);
            var url = helper.format(urlTemplate, accountName, item.repoOwner);
            //console.log('Url:' + url);
            loadPageBuilds(accountName, item, url, screenshots, i);
        });
    };

    var checkPublicRepositories = function (accountName, repos) {
        repos.forEach(function (item, i, items) {
            //console.log('Repository:owner=' + item.repoOwner + '; name=' + item.repoName);
            var url = helper.format(builds, accountName, item.repoOwner, item.repoName);
            //console.log('Url:' + url);
            loadPageBuilds(accountName, item, url, screenshots, i);
        });
    };

    var loadPageBuilds = function (accountName, item, url, screenshots, indexTest) {
        browser.driver.get(url).then(function() {
            browser.driver.wait(function() {
                return browser.driver.isElementPresent(by.xpath(constant.XPATH_PUBLIC_BUILD));
            }, 10000).then(
                function (present) {
                    helper.sleep(1000);
                    helper.takeScreenshot(accountName+'_' + item.repoName + '.png', screenshots);
                    var result = 'FAILED';

                    if(item.status == 1) {
                        result = 'PASSED';
                    } else result = 'FAILED';

                    printTestResult(indexTest, result, url);
                }, function() {
                    helper.sleep(1000);
                    helper.takeScreenshot(accountName+'_' + item.repoName + '.png', screenshots);
                    var result = 'FAILED';

                    if(item.status == 1) {
                        result = 'FAILED';
                    } else result = 'PASSED';

                    printTestResult(indexTest, result, url);
                });
        });
    };

    var printTestResult = function (indexTest, result, message) {
        console.log('------ Test ' + indexTest + ' ' + result + ' -----');
        console.log(message);
        console.log('------###-----');
    };
});