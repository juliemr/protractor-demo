protractor-demo
===============

Demo test application and protractor tests.

Basic setup
-----------
Run `npm install`

To run
------
Get a selenium server running at localhost:4444
by running `webdriver-manager start`.
See the Protractor documentation for help with this.

Start the test application server with
`node app/expresserver.js`
Or if you're feeling lazy, just `npm start`.

Run the tests with
`node_modules/.bin/protractor test/conf.js`
Or if you're feeling lazy, just `npm test`.

Watch them go!
