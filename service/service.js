const mongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'mydb';

mongoClient.connect(URL, (err, client) => {
    console.log('Connected')
    const db = client.db(DB_NAME);
    let count = db.collection('books').count();

    console.log(`books count: ${count}`);
    client.close();
})

// Get all books
exports.getBooks = () => {
    return 3;
}