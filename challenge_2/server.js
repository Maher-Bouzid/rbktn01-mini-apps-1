const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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

App.post("/", (req, res) => {
    //need to remove the ; in the front end
    console.log(jsonToCsv(JSON.parse(req.body.data)));

    res.status(201).redirect('/')
});




