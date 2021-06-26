//acts as client for MongoDB server, ".MongoClient" is an object
//Q: What does it contain? The methods?
const MongoClient = require('mongodb').MongoClient;
//core module in mongodb uset to check values
const assert = require('assert').strict;
//import methods from "operations" module
const dboper = require('./operations');


//url to connect server to client
const url = 'mongodb://localhost:27017';
//name of mongodb database you want to connect to
const dbname = 'nucampsite';

//to access the server, use MongoClient to connect the client to the server
//useUnifiedTopology prevents deprecation warnings from showing up in the app (somehow)
//Third parameter is callback function
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    // #1: check that the error is null
    // First parameter is the value to check; Second parameter is the expecte value
    // If assert passes, app continues.
    // If assert fails, throws error that terminates entire app, logs the error to console
    assert.strictEqual(err, null);

    console.log('Connected corectly to mongodb server.');

    //Connects app to nucampsite database
    //".db" allows you to access the methods required to access nucampsite
    const db = client.db(dbname);

    //Delete(Drop) all documents
    //Just for testing so every time you run the app, you start with a clean slate
    db.dropCollection('campsites', (err, result) => {
        console.log('.dropCollection running');
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        //WE IMPORTED "OPERATIONS" MODULE, SO WE NO LONGER NEED THIS LINE B/C EACH OPERATION GRABS THE COLLECTION
        //recreate/grab collection and set access to it
        //const collection = db.collection('campsites');

        //add document to "campsites" collection - using dboper/operations ".insertDocument()" method
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites', result => {
            //no longer need this, will be handled by dboper method
            //assert.strictEqual(err, null);

            console.log('.insertDocument running');
            //".ops" is short for operations. In this case it will contain an array w/ the document that was inserted
            console.log('Insert document:', result.ops);

            //won't be called until .insertDocument() has finished b/c it's still in-line
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('.findDocuments(1) running');

                //will log everything in the campsites collection
                console.log('Found Documents', docs);

                //will look for a field with the name "Breadcrumb Trail Campground", won't work if there's more than one document with this name
                //will update that document with param 3 info
                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites', result => {
                    console.log('.updateDocuments running');

                    //result.result.nModified will show the number of documents that were modified by the .updateDocument() method
                    console.log('Updated Document Count: ', result.result.nModified);

                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log('.findDocuments(2) running');
                        console.log('Found Documents: ', docs);

                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites', result => {
                            console.log('.removeDocument running');
                            console.log('Deleted Document Count: ', result.deletedCount);

                            client.close();
                        });
                    });
                });
            //NO LONGER NEED THIS, WILL BE HANDLED BY ".insertDocument.()" from dboper
            // //print all documents in collection with ".find()" (empty parameter list to return all documents) -filtering options available
            // //".toArray()" is method from mongoDB that will convert the document to an array of objects
            // collection.find().toArray((err, docs) => {
            //     assert.strictEqual(err, null);
            //     console.log('Found documents: ', docs);

                //close connection to mongodb server
            });
        });
    });
});

//TEST: go to bash node-mongo directory
//npm start