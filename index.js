const express = require('express');
const webApp = express();

const mongoose = require('mongoose');

//set up connection to mongodb
mongoose.connect('mongodb://localhost:27017/petCatalog')
    .then(() => {
        console.log('Succesfully connected to petCatalog on MongoDB');
    }).catch((e) => {
        console.log("Failed to connect to petCatalog on MongoDB")
    });

webApp.get('/', (req, res) => {
    res.send("Welcome to the Pet Catalog!");
})

webApp.listen(3000, () => {
    console.log("Connection Established(Port 3000)!");
})