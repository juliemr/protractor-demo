protractor-demo
===============

Demo test application and protractor tests.

Setup
-----

    git clone https://github.com/juliemr/protractor-demo.git
    cd protractor-demo
    npm install

To run
------
Get ChromeDriver set up: Run `./node_modules/.bin/webdriver-manager update` 
(on Windows it would be `node node_modules/protractor/bin/webdriver-manager update`).
After calling this command have a look at "./node_modules/protractor" and its 
subfolders to verify it. A folder called "selenium" with the "chromedriver" 
should be available in it.

Start the test application server with
`node app/expressserver.js`
Or if you're feeling lazy, just `npm start`.

Run the tests with
`node_modules/.bin/protractor test/conf.js`
Or if you're feeling lazy, just `npm test`.

Watch them go!
