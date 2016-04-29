var helper = require('./module/helper.js');
var userGithub = require('./model/user.js');
var github = require('./module/github.js');
var cst = require('./module/utils.js');

describe('login to Codefresh', function() {

    var constant, user;
    var reportFolder = 'target/';
    var screenshots;

    beforeAll(function () {

    });

    afterAll(function () {
        var array = ['Codefresh', 'codefresh_g_staging'];
        github.go();
        var githubJson = browser.params.github_auth_app;
        user = new userGithub.GithubUser(githubJson.username, githubJson.password);
        github.revokeApp(user, array, screenshots);
        helper.sleep(1000);
    });

    beforeEach(function() {
        constant = new cst.Constant();
        browser.driver.ignoreSynchronization = true;
        browser.driver.get('https://codefresh.io/').then(function () {
            helper.waitForElement(by.xpath(constant.XPATH_LOGIN), constant.DEFAULT_TIMEOUT);
        });
    });

    afterEach(function () {
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var signOutCodefresh = function () {
        browser.driver.isElementPresent(by.xpath(constant.XPATH_USER_DROPDOWN)).then(function (present) {
            var user_dropdown = helper.findElement(by.xpath(constant.XPATH_USER_DROPDOWN));
            user_dropdown.click();
            helper.sleep(1000);

            var logout = helper.findElement(by.xpath(constant.XPATH_LOGOUT));
            logout.click();

            helper.waitForElement(by.xpath(constant.XPATH_GITHUB_SIGNUP), constant.DEFAULT_TIMEOUT);
        });
    };

    var signInToGithub = function (user) {
        var btnLogin = helper.findElement(by.xpath(constant.XPATH_LOGIN));
        btnLogin.click();

        helper.waitForElement(by.xpath(constant.XPATH_GITHUB_SIGNIN), constant.DEFAULT_TIMEOUT);
        var btnGithubSignIn = helper.findElement(by.xpath(constant.XPATH_GITHUB_SIGNIN));
        btnGithubSignIn.click();

        github.signIn(user);
    };

    it('270417: SignIn to Codefresh with github account', function() {
        screenshots = reportFolder + "270417/";
        var githubJson = browser.params.github_login;
        user = new userGithub.GithubUser(githubJson.username, githubJson.password);
        signInToGithub(user);
        helper.waitForElement(by.xpath(constant.XPATH_USER_DROPDOWN), 10000);
        var formatStr = helper.format(constant.XPATH_USER_DROPDOWN_TEXT, user.username);
        console.log('xpath:' + formatStr);
        var text = helper.findElement(by.xpath(formatStr)).getText();
        expect(text).toEqual(user.username);

        helper.takeScreenshot('login_success.png', screenshots);
        signOutCodefresh();
        github.go();
        github.signOut();
    });

    it('270416: SignIn to Codefresh with authorize app', function () {
        screenshots = reportFolder + "270416/";
        user = new userGithub.GithubUser(browser.params.github_auth_app.username,
            browser.params.github_auth_app.password);
        signInToGithub(user);

        helper.waitForElement(by.xpath(constant.XPATH_AUTH_APP), constant.DEFAULT_TIMEOUT);
        var btnAuthorizeApp = helper.findElement(by.xpath(constant.XPATH_BTN_AUTH_APP));

        helper.takeScreenshot('authorize_app.png', screenshots);
        btnAuthorizeApp.click();

        helper.waitForElement(by.xpath(constant.XPATH_MODIFY_AUTH), constant.DEFAULT_TIMEOUT);
        btnAuthorizeApp = helper.findElement(by.xpath(constant.XPATH_BTN_AUTH_APP));
        helper.takeScreenshot('modify_auth_app.png', screenshots);
        btnAuthorizeApp.click();

        helper.waitForElement(by.xpath(constant.XPATH_USER_DROPDOWN), 10000);
        var formatStr = helper.format(constant.XPATH_USER_DROPDOWN_TEXT, user.username);
        var text = helper.findElement(by.xpath(formatStr)).getText();
        expect(text).toEqual(user.username);
        helper.sleep(5000);
    });
});