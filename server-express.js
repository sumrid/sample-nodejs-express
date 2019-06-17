const express = require('express');
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 80;
const server = express();

// Use middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended : true, useNewUrlParser: true }));

// Add router
server.use('/', require('./router'));

// Add Route
// server.get('/', (req, res) => {
//     res.send('Hello world')
// })
// server.post('/books', (req, res) => {
//     const jsonObj = req.body
//     let title = jsonObj.Title
//     console.log(title)

//     res.json(jsonObj)
// })
// // server.use('/books', require('./service/service'))

// server.get('/books', (req, res) => {
//     res.json(service.getBooks())
// })
// server.get('/books/name/:name', (req, res) => {

// })

// Start service
server.listen(port, hostname, () => {
    console.log("express server is running");
    console.log(`port: ${port}`);
})
