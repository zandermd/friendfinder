var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = process.env.port || 8000;
// var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text())


//routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
    console.log('App Listening on PORT:' + PORT);

});