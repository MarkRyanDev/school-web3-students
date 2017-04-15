var express = require('express');
var _ = require('lodash');
var mongoall = require('mongodb');
var mongo = mongoall.MongoClient;
var o_id = mongoall.ObjectID;


var url = 'mongodb://localhost:27017/students';

var exports;

exports.create = function(student, callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err, null);

        var collection = db.collection('students');
        collection.insertOne(student, function(err, result){

            db.close();

            callback(err, result.insertedId);
        })
    })
}
exports.read = function(id, callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err, null);

        var collection = db.collection('students');

        collection.findOne({_id: o_id(id)}, function(err, result){
            db.close();

            callback(err, result);
        })
    })
}
exports.update = function(id, student, callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err);

        var collection = db.collection('students');

        collection.updateOne({_id: o_id(id)}, _.omitBy(student, (value,key)=>key == '_id'), function(err, result){
            db.close();

            callback(err);
        })
    })
}
exports.delete = function(id, callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err);

        var collection = db.collection('students');

        collection.deleteOne({_id: o_id(id)}, function(err, result){
            db.close();

            callback(err);
        })
    })
}
exports.list = function(callback){
    mongo.connect(url, function(err, db){
        if(err)callback(err);

        var collection = db.collection('students');

        collection.find({}).toArray(function(err, docs){
            db.close();
            callback(err, _.map(docs, student => student._id));
            // callback(err, docs);
        })
    })
}

module.exports = exports;