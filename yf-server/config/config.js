/**
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 * Created by Ravindu on 9/5/17.
 * Use this file to add all the Configs within your code
 */

var config = {};

config.mongodb = {};

//MongoDB Configs
config.mongodb.host = '159.65.152.131:27017';
config.mongodb.db = 'admin';
config.mongodb.username = 'sl2c';
config.mongodb.pwd = 'sl2c@dev';

config.mongodb.connectionString = "mongodb://" + config.mongodb.username + ":" + config.mongodb.pwd + "@" + config.mongodb.host + "/" + config.mongodb.db;

module.exports = config;