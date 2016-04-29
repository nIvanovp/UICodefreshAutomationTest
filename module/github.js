var EC = protractor.ExpectedConditions;
var helper = require('./helper.js');
var cst = require('./utils.js');

var constant = new cst.Constant();

var go = function () {
    browser.driver.get('https://github.com/');
};

var isSignedIn = function () {
    console.log('isSignedIn:' + constant.XPATH_PROFILE_GITHUB);
};

var signInViaGH = function (user, isClickOnSignIn) {
    if(isClickOnSignIn) {
        helper.waitForElement(by.xpath(constant.XPATH_GITHUB_SIGNIN_BTN), constant.DEFAULT_TIMEOUT);
        var btnSignIn = helper.findElement(by.xpath(constant.XPATH_GITHUB_SIGNIN_BTN));
        console.log('Click on the button Sign In');
        btnSignIn.click();
    }
    signIn(user);
};

var signIn = function (user) {
    console.log('signin');

    helper.waitForElement(by.name('login'), 5000);
    console.log('Username = ' + user.username);

    var usernameEditText = helper.findElement(by.name('login'));
    usernameEditText.sendKeys(user.username);

    var passwordEditText = helper.findElement(by.name('password'));
    passwordEditText.sendKeys(user.password);

    helper.findElement(by.name('commit')).click().then(function () {
        helper.sleep(10000);
    });
};

var signOut = function () {
    console.log('signout');
    helper.waitForElement(by.xpath(constant.XPATH_PROFILE_GITHUB), constant.DEFAULT_TIMEOUT);

    var img = helper.findElement(by.xpath(constant.XPATH_PROFILE_GITHUB));
    console.log('Click on the user avatar');
    img.click();

    helper.sleep(2000);
    var settings = helper.findElement(by.xpath(constant.XPATH_SIGN_OUT_GITHUB));
    console.log('Click on the Sign out');
    settings.click();

    helper.waitForElement(by.xpath(constant.XPATH_GITHUB_SIGNIN_BTN), constant.DEFAULT_TIMEOUT);
};

var revokeApp = function (user, appNames, screenshots) {
    var formatStr = helper.format(constant.XPATH_IMG_USER_GITHUB, user.username);
    console.log('String:' + formatStr);
    browser.driver.isElementPresent(by.xpath(formatStr)).then(function (present) {
        console.log('wait for avatar:' + present);
        if(!present) {
            browser.driver.isElementPresent(by.xpath(constant.XPATH_PROFILE_GITHUB)).then(function (present) {
                console.log('element:' + present);
                if(present) {
                    signOut();
                }
                signInViaGH(user, true);
            });
        }
    });

    var img = helper.findElement(by.xpath(formatStr));
    console.log('Click on the user avatar');
    img.click();

    helper.sleep(2000);
    var settings = helper.findElement(by.xpath(constant.XPATH_SETTINGS_USER_GITHUB));
    console.log('Click on the Settings');
    settings.click();

    helper.sleep(1000);

    helper.waitForElement(by.xpath(constant.XPATH_OAUTH_APPS_GITHUB), constant.DEFAULT_TIMEOUT);
    var oauthApps = helper.findElement(by.xpath(constant.XPATH_OAUTH_APPS_GITHUB));
    console.log('Click on the OAuth applications');
    oauthApps.click();

    helper.sleep(1000);

    helper.waitForElement(by.xpath(constant.XPATH_OAUTH_TAB_APPS_GITHUB), constant.DEFAULT_TIMEOUT);
    helper.takeScreenshot('page_revoke_app.png', screenshots);

    appNames.forEach(function (name, i, items) {
        revoke(name, screenshots);
    });
};

var revoke = function (appName, screenshots) {
    browser.driver.findElements(by.xpath(constant.XPATH_LIST_OAUTH_APPS_GITHUB)).then(function (items) {
        var formatStr = helper.format(constant.XPATH_ITEM_OAUTH_APPS_GITHUB, appName);
        console.log('Appname:' + formatStr + '; items:' + items.length);
        items.forEach(function (item, i, items) {
            browser.driver.isElementPresent(by.xpath(formatStr)).then(function (present) {
                console.log('found#####' + present);
                if(present) {
                    console.log('Click on the button Revoke');
                    item.findElement(by.xpath('//a[text()="Revoke"]')).click();
                    helper.sleep(1000);
                    helper.waitForElement(by.xpath(constant.XPATH_REVOKE_POPUP_GITHUB), constant.DEFAULT_TIMEOUT);
                    helper.takeScreenshot('dialog_revoke_app_'+appName+'.png', screenshots);
                    var btn = helper.findElement(by.xpath(constant.XPATH_BTN_REVOKE_POPUP_GITHUB));
                    console.log('Click on the dialogs button Revoke app');
                    btn.click();
                    helper.sleep(1000);
                    return;
                }
            });
        });
    });
};

module.exports.go = go;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.revokeApp = revokeApp;