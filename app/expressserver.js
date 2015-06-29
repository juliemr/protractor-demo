var express = require('express');
var app = express();
var util = require('util');

app.use(express.static(__dirname));
app.listen(3456);
console.log('Server running at http://localhost:3456');
