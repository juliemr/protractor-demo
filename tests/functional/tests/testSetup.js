afterEach(function (done) {
    var Page = require('../pages/Page.js');
    var page = new Page();
    page.clearConfigurations().then(done);
    browser.manage().deleteAllCookies();
});
