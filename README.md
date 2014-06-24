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
Get a selenium server running at localhost:4444. Run `./node_modules/.bin/webdriver-manager update` then `./node_modules/.bin/webdriver-manager start`. See the Protractor documentation for more info.

Start the test application server with
`node app/expresserver.js`
Or if you're feeling lazy, just `npm start`.

Run the tests with
`node_modules/.bin/protractor test/conf.js`
Or if you're feeling lazy, just `npm test`.

Watch them go!
