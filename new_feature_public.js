var helper = require('./module/helper.js');
var cst = require('./module/utils.js');
var paramSingleBuild = require('./data/single_build.json');
var paramBuildPacks = require('./data/buildpacks.json');
var paramBuilds = require('./data/builds.json');

describe('New feature public', function () {

    var reportFolder = 'target/new-feature-public-builds/';
    var screenshots;
    var countPassed = 0;
    var countFailed = 0;

    var builds = 'https://g-staging.codefresh.io/public/{0}/{1}/{2}/builds';
    var singleBuild = 'https://g-staging.codefresh.io/public/{0}/{1}/{2}/builds/build/{3}';
    var buildpacks = 'https://g-staging.codefresh.io/public/{0}/{1}/buildpacks/builds';

    beforeEach(function() {
        constant = new cst.Constant();
        browser.driver.ignoreSynchronization = true;
    });

    afterEach(function () {

    });

    afterAll(function () {
        console.log('TOTAL: PASSED = '+ countPassed +'; FAILED = ' + countFailed);
    });

    it('Check buildpacks', function () {
        console.log('########### ########## Start test ########### ##########');
        var accounts = paramBuildPacks.accounts;
        var urlTemplate = buildpacks;
        screenshots = reportFolder + 'buildpacks/';

        accounts.forEach(function (item, i, items) {
            checkBuildpacks(item.accountName, item.repositories, urlTemplate);
        });
    });

    it('Check single build', function () {
        console.log('########### ########## Start test ########### ##########');
        var accounts = paramSingleBuild.accounts;
        var urlTemplate = singleBuild;
        screenshots = reportFolder + 'single_build/';

        accounts.forEach(function (item, i, items) {
            checkSingleBuild(item.accountName, item.repositories, urlTemplate);
        });
        // console.log('########### ########## End test ########### ##########');
    });

    it('Check builds', function () {
        console.log('########### ########## Start test ########### ##########');
        var accounts = paramBuilds.accounts;
        var urlTemplate = builds;
        screenshots = reportFolder + 'builds/';

        accounts.forEach(function (item, i, items) {
            checkPublicRepositories(item.accountName, item.repositories, urlTemplate);
        });
    });

    var checkSingleBuild = function (accountName, repos, urlTemplate) {
        repos.forEach(function (item, i, items) {
            var url = helper.format(urlTemplate, accountName, item.repoOwner, item.repoName, item.buildid);
            var scrFilename = accountName + '_' + item.repoName + '_' + item.buildid + '.png';
            loadPage(accountName, item, url, scrFilename, i, constant.XPATH_PUBLIC_SINGLE_BUILD);
        });
    };

    var checkBuildpacks = function (accountName, repos, urlTemplate) {
        repos.forEach(function (item, i, items) {
            var url = helper.format(urlTemplate, accountName, item.repoOwner);
            var scrFilename = accountName+'_' + item.repoName + '.png';
            loadPage(accountName, item, url, scrFilename, i, constant.XPATH_PUBLIC_BUILD);
        });
    };

    var checkPublicRepositories = function (accountName, repos, urlTemplate) {
        repos.forEach(function (item, i, items) {
            var url = helper.format(urlTemplate, accountName, item.repoOwner, item.repoName);
            var scrFilename = accountName+'_' + item.repoName + '.png';
            loadPage(accountName, item, url, scrFilename, i, constant.XPATH_PUBLIC_BUILD);
        });
    };

    var loadPage = function (accountName, item, url, scrFilename, indexTest, xpathEl) {
        browser.driver.get(url).then(function() {
            browser.driver.wait(function() {
                return browser.driver.isElementPresent(by.xpath(xpathEl));
            }, 10000).then(
                function () {
                    helper.sleep(1000);
                    helper.takeScreenshot(scrFilename, screenshots);
                    var result = 'FAILED';

                    if(item.status == 1) {
                        result = 'PASSED';
                        countPassed++;
                    } else {
                        result = 'FAILED';
                        countFailed++;
                    }

                    printTestResult(indexTest, result, url);
                }, function() {
                    helper.sleep(1000);
                    helper.takeScreenshot(scrFilename, screenshots);
                    var result = 'FAILED';

                    if(item.status == 1) {
                        result = 'FAILED';
                        countFailed++;
                    } else {
                        result = 'PASSED';
                        countPassed++;
                    }

                    printTestResult(indexTest, result, url);
                });
        });
    };

    var printTestResult = function (indexTest, result, message) {
        console.log('------ Test ' + indexTest + ' ' + result + ' -----');
        console.log(message);
        console.log('');
    };
});