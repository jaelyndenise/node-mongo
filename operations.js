//MONGODB CRUD OPERATIONS
//add methods to insert, find, remove and update document - export each method
const assert = require('assert').strict;

//CREATE
exports.insertDocument = (db, document, collection, callback) => {
    //uses the collection string in the parameter list to pull the collection from the db
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        //this callback will be defined somewhere else, but it takes the result of ".insertDocument()" as an argument
        callback(result);
    });
};

//READ
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    //find all documents in the collection, callback returns the results of .find()
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

//UPDATE
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    //Param 1: document you want to update
    //Param 2: updates to be made using $set to overwrite existing info
    //Param 3: optional configurations, but we don't need these right now
    //Param 4: result of the update
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

//DELETE
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};