const express = require('express');
const dataBase = require('./data/db');

const server = express();
server.use(express.json());

// server.get('/', (req, res) => {
//     res.send('Hello from index.js')
// })

server.get('/api/users', (req, res) => {
    dataBase.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
        res.end(users);
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    dataBase.findById(id)
    .then(users => {
        if(!users.id){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.json(users)
        }
    })
    .catch(error => {
        res.end()
        res.status(500).json({ message: "The user information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const userData = req.body;
    if(!userData.bio || !userData.name){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        res.end()
    } else {
        dataBase.insert(userData)
        .then(users => {
            res.status(201).json(userData)
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

        if(!id){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            dataBase.remove(id)
            .then(users => {
                res.json(users)
            })
            .catch(error => {
                res.status(500).json({ error: "The user with the specified ID does not exist." })
            })
        }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userData = req.body;

    if(!userData.name || !userData.bio){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        dataBase.update(id, userData)
        .then(user => {
            res.json(user)
            res.status(200)
        })
        .catch(error => {
            res.status(500).json({ error: "The user with the specified ID does not exist." })
        })
    }
})

const port = 8000;
server.listen(port, () => console.log('API is running on port 8000'))