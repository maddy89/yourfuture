/**
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 * Created by Ravindu on 9/5/17.
 */

var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');

var config = require('../config/config');

exports.doGetRequest = function (host, port, endpoint, basicAuthVal, queryParams, success) {

    endpoint += '?' + queryParams;

    var headers = {
        'Authorization': 'Basic ' + basicAuthVal
    };

    var options = {
        host: host,
        path: endpoint,
        port: port,
        method: 'GET',
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = "";

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            var responseObject;
            try {
                responseObject = JSON.parse(responseString);
            } catch (e) {
                console.log(responseString);
                console.log(e);
            }
            if (responseObject) {
                success(responseObject);
            } else {
                success(responseString);
            }
        });
    });

    req.end();
};

exports.doPostWithPutRequest = function (host, port, endpoint, method, basicAuthVal, data, contentType, success) {

    var headers = {};

    headers = {
        'Content-Type': contentType,
        'Content-Language': 'en-US',
        'Authorization': 'Basic ' + basicAuthVal,
        'Content-Length': data.length
    };

    var options = {
        host: host,
        path: endpoint,
        port: port,
        method: method,
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            if (method != 'DELETE') {
                var responseObject = JSON.parse(responseString);
                success(responseObject);
            }
            else {
                success({result: true});
            }
        });
    });

    req.write(data);
    req.end();
};



