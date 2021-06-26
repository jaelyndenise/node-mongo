//MONGODB CRUD OPERATIONS
//add methods to insert, find, remove and update document - export each method
//no longer need this since we're using promises that catch errors
//const assert = require('assert').strict;

//removed all "callback" parameters b/c mongodb/node.js api has promises built in automatically if no callback is provided

//CREATE
exports.insertDocument = (db, document, collection) => {
    //uses the collection string in the parameter list to pull the collection from the db
    const coll = db.collection(collection);
    //removed callback b/c it will return a promise, returning coll.insertOne b/c it will return a promise
    return coll.insertOne(document);
};

//READ
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find().toArray();
};

//UPDATE
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};

//DELETE
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};