/**
 * Copyright (C) SL2C Technology Team - All Rights Reserved
 * Created by Ravindu on 9/5/17.
 */

var config = require('../config/config');

var mongoClient = require('mongodb').MongoClient;
var dbClient, retryCount;

exports.openConnection = function () {
    mongoClient.connect(config.mongodb.connectionString, function (err, mongoDbClient) {
        if (err) {
            console.log('Cannot connect to YourFuture Mongo DB Instance! Retrying');
            retryCount++;
            if (retryCount <= 20) {
                setTimeout(function () {
                    exports.openConnection();
                }, 5000);
            }
        } else {
            dbClient = mongoDbClient;
            console.log('Connected to Mongo DB');
        }
    });
};

//Insert Data into Collection
exports.insertDocument = function (collection, doc, db, fn) {
    var fn1 = function () {
        },
        fn1 = fn || fn1,
        db = dbClient.db(db);
    db.collection(collection, function (err, col) {
        //console.log(collection);
        //console.log(col);
        col.insert(doc, {safe: true}, function (err, records) {
            if (err) {
                fn1(err);
                return;
            }
            fn1(null, records.insertedIds[0]);
        });
    });
};

//Retrieve the first document that matches the query
exports.getSingleDocument = function (query, collectionV, db, fn) {
    var db = dbClient.db(db);
    db.collection(collectionV, function (err, collection) {
        collection.findOne(query, function (err, doc) {
            if (err) {
                fn(null, err);
                return;
            }
            fn(doc, null);
        });
    });
};

//Retrieve all the documents that matches the given query
exports.getDocuments = function (query, collection, db, fn) {
    var db = dbClient.db(db);
    db.collection(collection, function (err, collection) {
        collection.find(query).toArray(function (err, doc) {
            if (err) {
                fn([], err);
                return;
            }
            fn(doc, null);
        });
    });
};

//Update a single document
exports.updateDocument = function (collection, selector, newDoc, options, db, fn) {
    var db = dbClient.db(db);
    db.collection(collection, function (err, collection) {
        collection.update(selector, newDoc, options, function (err, result) {
            if (err) {
                fn(err);
                return;
            }
            fn(null, result);
        });
    });
};

//Update multiple documents
exports.updateAllDocuments = function (collection, selector, field, db, fn) {
    var db = dbClient.db(db);
    db.collection(collection, function (err, collection) {
        collection.update(selector, {$set: field}, {multi: true}, function (err, result) {
            if (err) {
                fn(err, null);
                return;
            }
            fn(null, result.result.nModified);
        });
    });
};

exports.deleteDocument = function (collection, query, db, errorFunc) {
    exports.updateAllDocuments(collection, query, {deleted: true}, db, errorFunc);
};

exports.findAndModify = function (collection, query, sort, doc, options, db, errorFunc) {
    var db = dbClient.db(db);
    db.collection(collection, function (err, collection) {
        collection.findAndModify(query, sort, doc, options, function (err, result) {
            if (err) {
                errorFunc(new Error(err.message), null);
                return;
            }
            errorFunc(null, result.value);
        });
    });
};

//Creating a specific collection
exports.createCollection = function (collectionName, db, fn) {
    var db = dbClient.db(db);
    db.createCollection(collectionName, function (err, collection) {
        if (err) {
            fn(null, err);
            return;
        }
        fn(collection, null);
    });
};

//Dropping a specific collection
exports.dropCollection = function (collectionName, db, fn) {
    var db = dbClient.db(db);
    db.dropCollection(collectionName, function (err, collection) {
        if (err) {
            fn(err);
            return;
        }
    });
};








