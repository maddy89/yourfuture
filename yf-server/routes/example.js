/**
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 * Created by Ravindu on 9/5/17.
 */

var config = require('../config/config')
    , mongoAdapterUtility = require('../utils/mongoAdapterUtility');

exports.sampleGet = function (req, res) {
    var name = req.query.name;
    var message;

    if (name) {
        message = 'Hi there ' + name + '!';
        res.writeHead(200, {'Content-Type': 'application/json'});
        var result = JSON.stringify(message);
        res.write(result);
        res.end();
    } else {
        message = 'Required Attributes are not present'
        res.writeHead(500, {'Content-Type': 'application/json'});
        var result = JSON.stringify(message);
        res.write(result);
        res.end();
    }
};

exports.samplePost = function (req, res) {

};