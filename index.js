//acts as client for MongoDB server, ".MongoClient" is an object
//Q: What does it contain? The methods?
const MongoClient = require('mongodb').MongoClient;
//core module in mongodb uset to check values
const assert = require('assert').strict;

//url to connect server to client
const url = 'mongodb://localhost:27017';
//name of mongodb database you want to connect to
const dbname = 'nucampsite';

//to access the server, use MongoClient to connect the client to the server
//useUnifiedTopology prevents deprecation warnings from showing up in the app (somehow)
//Third parameter is callback function
MongoClient.connect(url, { useUnifiedTopoloy: true }, (err, client) => {

    //#1: check that the error is null
    //First parameter is the value to check; Second parameter is the expecte value
    //If assert passes, app continues.
    //If assert fails, throws error that terminates entire app, logs the error to console
    assert.strictEqual(err, null);

    console.log('Connected corectly to mongodb server.');

    //Connects app to nucampsite database
    //".db" allows you to access the methods required to access nucampsite
    const db = client.db(dbname);

    //Delete(Drop) all documents
    //Just for testing so every time you run the app, you start with a clean slate
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        //recreate collection and set access to it
        const collection = db.collection('campsites');

        //add document to "campsites" collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, (err, result) => {
            assert.strictEqual(err, null);

            //".ops" is short for operations. In this case it will contain an array w/ the document that was inserted
            console.log('Insert document:', result.ops);

            //print all documents in collection with ".find()" (empty parameter list to return all documents) -filtering options available
            //".toArray()" is method from mongoDB that will convert the document to an array of objects
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found documents: ', docs);

                //close connection to mongodb server
                client.close();
            })
        })
    })
})

//TEST: go to bash node-mongo directory
//npm start