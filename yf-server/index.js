/*
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 */

var express = require('express')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , config = require('./config/config')
    , mongoAdapterUtility = require('./utils/mongoAdapterUtility')
    , faculty = require('./routes/faculty')
    , course = require('./routes/course')
    , sector = require('./routes/sector')
    , example = require('./routes/example');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,authorization,Access-Control-Allow-Origin,entityid,Content-Type");
    next();
});

mongoAdapterUtility.openConnection();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/example', example.sampleGet);
app.post('/example', example.samplePost);
app.put('/example',
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});
app.delete('/example',
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});

app.get('/course', 
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});
app.post('/course',
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});
app.put('/course',
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});
app.delete('/course',
    function (req, res) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var result = JSON.stringify({response: false, responseCode: 404, responseMessage: 'Resource is undefined or unavailable'});
        res.write(result);
        res.end();
});

app.listen(3000, function () {
  console.log('YourFuture app listening on port 3000!')
});
