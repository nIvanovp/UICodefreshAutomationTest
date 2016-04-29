var Constant = function () {
    this.DEFAULT_TIMEOUT = 10000;
    this.XPATH_LOGIN = '//ul[@id=\"menu-main-nav\"]//*[text()=\"Login\"]';
    this.XPATH_GITHUB_SIGNUP = '//button//*[text()=\"Sign Up with Github\"]';
    this.XPATH_GITHUB_SIGNIN = '//button//*[text()=\"Sign In with Github\"]';
    this.XPATH_GITHUB_SIGNIN_BTN = '//div[@class="site-header-actions"]//*[contains(text(), "Sign in")]';
    this.XPATH_USER_DROPDOWN_TEXT = '//div[@class=\"cf-user-dropdown\"]//*[text()=\"{0}\"]';
    this.XPATH_AUTH_APP = '//div[@class="setup-header"]//*[text()="Authorize application"]';
    this.XPATH_MODIFY_AUTH = '//div[@class="setup-header"]//*[text()="Modify authorization"]';
    this.XPATH_BTN_AUTH_APP = '//button[text()="Authorize application"]';
    this.XPATH_USER_DROPDOWN = '//div[@class="cf-user-dropdown"]';
    this.XPATH_IMG_USER_GITHUB = '//img[@alt="@{0}"]';
    this.XPATH_SETTINGS_USER_GITHUB = '//a[@class="dropdown-item" and contains(text(),"Settings")]';
    this.XPATH_SIGN_OUT_GITHUB = '//button[contains(text(),"Sign out")]';
    this.XPATH_OAUTH_APPS_GITHUB = '//a[text()="OAuth applications"]';
    this.XPATH_OAUTH_TAB_APPS_GITHUB = '//nav[@class="tabnav-tabs"]//*[text()="Authorized applications"]';
    this.XPATH_LIST_OAUTH_APPS_GITHUB = '//li[@class="table-list-item"]';
    this.XPATH_ITEM_OAUTH_APPS_GITHUB = '//a[@class="oauth-app-access-name" and text()="{0}"]';
    this.XPATH_REVOKE_POPUP_GITHUB = '//div[@class="facebox-popup"]';
    this.XPATH_BTN_REVOKE_POPUP_GITHUB = '//div[@class="facebox-content"]//button[@type="submit" and contains(text(), "I understand, revoke access")]';
    this.XPATH_PROFILE_GITHUB = '//a[@aria-label="View profile and more"]';
    this.XPATH_LOGOUT = '//a[@ui-sref="authLogout"]';

};

module.exports.Constant = Constant;