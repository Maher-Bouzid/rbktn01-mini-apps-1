const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/challange3', { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log('connected to database...')
})


let data = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    line1: String,
    line2: String,
    city: String,
    zipCode: Number,
    cc: String,
    expiryDate: Date,
    CVV: String,
    billingZipCode: String
})

var Info = mongoose.model('Info', data);


module.exports.Info = Info;