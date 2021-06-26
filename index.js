const MongoClient = require('mongodb').MongoClient;
//core module in mongodb uset to check values - no longer need this, promises have .catch
//const assert = require('assert').strict;

//import methods from "operations" module
const dboper = require('./operations');


const url = 'mongodb://localhost:27017';
const dbname = 'nucampsite';

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    console.log('Connected corectly to mongodb server.');
    const db = client.db(dbname);

//CALLBACK HELL / PYRAMID OF DOOM (previous method) - updated to use promises instead of callbacks
    db.dropCollection('campsites')
    .then(result => {
        console.log('- - - - - .dropCollection() is running...');
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log("No collection to drop.")); //unlike "assert", .catch() won't stop app if the collection doesn't exist

    //Chain of promisesto run the operations
    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('- - - - - .insertDocument() is running...');
        console.log('Insert document:', result.ops);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('- - - - - .findDocuments(1) is running...');
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites'); 
    })
    .then(result => {
        console.log('- - - - - .updateDocument() is running...');

        console.log('Updated Document Count: ', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('- - - - - .findDocuments(2) is running...');
        console.log('Found Documents: ', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
    })
    .then(result => {
        console.log('- - - - - .removeDocument() is running...');
        console.log('Deleted Document Count: ', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err)); //chained to .then of MongoClient

//TEST: 
//1. go to bash node-mongo directory
//2. npm start