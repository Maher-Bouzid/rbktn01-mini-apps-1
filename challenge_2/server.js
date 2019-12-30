const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const { jsonToCsv } = require('./modules/jsonToCsv')

const App = express();


const PORT = process.env_PORT || 8080;

App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: false }))


App.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});

App.use(express.static(path.join(__dirname, '/client')));

App.get("/", (req, res) => {
    res.status(200).send('Hi')
});

App.post("/form", (req, res) => {
    if (req.body.data.length) {
        // console.log(req.body.data)
        res.status(201).json(jsonToCsv(JSON.parse(req.body.data)));
    } else {
        res.send('Not valid data');
    }
});




