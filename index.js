const express = require('express');
const dataBase = require('./data/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from index.js')
})

const port = 8000;
server.listen(port, () => console.log('API is running on port 8000'))