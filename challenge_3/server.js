const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Info } = require('./database/db')

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
})



app.post('/form', (req, res) => {
    console.log(req.body)
    let data = new Info(req.body)
    data.save()
        .then(result => {
            console.log(result)
            res.status(201).send('Data recived')
        })
})