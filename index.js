const express = require('express');
const webApp = express();

const mongoose = require('mongoose');

const Pet = require('./models/pet');

//set up connection on default port
mongoose.connect('mongodb://localhost:27017/petCatalog')
    .then(() => {
        console.log('Succesfully connected to petCatalog on MongoDB');
    }).catch((e) => {
        console.log("Failed to connect to petCatalog on MongoDB")
    });

//connect to mongo db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

webApp.get('/', (req, res) => {
    res.send("Welcome to the Pet Catalog!");
})

webApp.get('/createPet', async (req, res) => {
    const camp = new Campground({ name: 'Biko', price: 4000 });
    await camp.save();
    res.send(camp);
})

webApp.listen(3000, () => {
    console.log("Connection Established(Port 3000)!");
})