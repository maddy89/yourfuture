/**
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 * Created by Ravindu on 9/5/17.
 * Use this file to add all the Configs within your code
 */

var config = {};

config.mongodb = {};

//MongoDB Configs
config.mongodb.host = 'localhost:27017';
config.mongodb.db = 'yourFuture';
config.mongodb.username = 'sl2c';
config.mongodb.pwd = 'tech_sl2c';

config.mongodb.connectionString = "mongodb://" + config.mongodb.username + ":" + config.mongodb.pwd + "@" + config.mongodb.host + "/" + config.mongodb.db;