const express = require('express');
const router = express.Router();
const controller = require('./controller');

// mongo
const mongo = require('mongodb');
let client = mongo.MongoClient;
let URL = 'mongodb://localhost:27017';
let DB = 'mydb';

const jsonFile = require('./data.json')


router.get('/testget/:d/:m/:y', (req, res) => {
    let date = req.params;
    let sum = controller.sum(parseInt(date.d), parseInt(date.m), parseInt(date.y))
    console.log(`Day ${date.d}`);
    console.log(`Month ${date.m}`);
    console.log(`Year ${date.y}`);
    console.log('Result day + month + year =', sum);
    console.log(`Time: ${controller.getTime()}`);

    res.send('Server Time: ' + controller.getTime());
})

router.get('/getjson', (req, res) => {
    let book = jsonFile.Books;

    console.log(`Title:`, book.Title);
    console.log(`Description:`, book.Description);
    console.log(`Author:`, book.Author);
    console.log(`Publisher:`, book.Publisher);
    console.log(`Address:`, book.Address.Road);
    console.log(`Address code:`, book.Address.Code);
    res.json(book);
})

router.post('/json', (req, res) => {
    let a = req.body.a;
    let b = req.body.b;
    let name = req.body.name;
    let result = controller.sum(a, b);

    // Array data
    let results = new Array();
    results.push(a);
    results.push(b);
    results.push(result);
    results.push(name);
    console.log('results:', results);
    console.log('type of results:', typeof results);

    // Write log to csv file
    controller.writeLog(results); // send array data

    // Return
    res.send("sum: " + result.toString() + " name: " + req.body.name)
})

router.get('/readcsv', (req, res) => {
    controller.readCSV(res);
    // let xx = controller.readCSV(res);
    // res.json(xx);
})

router.post('/data', (req, res) => {
    // Request
    dataObject = req.body;
    console.log('object:', dataObject);

    client.connect().t
    client.connect(URL, async (err, db) => {
        if (err) throw err;

        // select DB and collection
        let coll = db.db(DB).collection('books');

        // insert data
        // coll.insertOne(dataObject).then(() => {
        //     db.close();
        //     res.status(201).send('OK');
        // });

        let re = await coll.insertOne(dataObject);
        console.log('from insert: ' + re);
        db.close();
        res.status(201).send('OK');
    });
})

router.post('/find', (req, res) => {
    let find = req.body;
    console.log(find._id);

    client.connect(URL, async (err, db) => {
        if (err) throw err;

        let coll = db.db(DB).collection('books');

        // Find one
        // coll.findOne({title:'Mars'}, (err, result)=> {
        //     console.log(result);
        //     res.json(result);
        // })

        // Find by id (callback)
        // coll.find({ _id: find._id }).toArray((err, result) => {
        // console.log(result);
        // res.json(result);
        // })

        // Find by id (promise)
        // coll.find({ _id: find._id }).toArray().then((result) => {
        //     console.log(result);
        //     res.json(result);
        // })

        // Find by id (async/await)
        let result = await coll.find({ _id: find._id }).toArray();
        console.log(result);
        res.json(result);
    })
})

router.post('/find2', async (req, res) => {
    let find = req.body;
    console.log('request id: ' + find._id);

    // Connect to DB
    let session;
    try {
        session = await client.connect(URL);
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
    
    let coll = session.db(DB).collection('books');
    let result = await coll.find({ _id: find._id }).toArray();

    // Response resutl
    console.log(result);
    res.json(result);
})

module.exports = router;