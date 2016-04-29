var GithubUser = function (username, password) {
    this.username = username;
    this.password = password;
};

var BitbucketUser = function () {
    this.username = '';
    this.password = '';
};

module.exports.GithubUser = GithubUser;
module.exports.BitbucketUser = BitbucketUser;