const express = require('express');
const webApp = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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

webApp.set('view engine', 'ejs');
webApp.set('views', path.join(__dirname, 'views'))

//parse the body
webApp.use(express.urlencoded({ extended: true }));
webApp.use(methodOverride('_method'));

//home page
webApp.get('/', (req, res) => {
    res.render('home');
})


//All pets page
webApp.get('/pets', async (req, res) => {
    const pets = await Pet.find({});
    res.render('index', { pets });

})

webApp.get('/pets/new', (req, res) => {
    res.render('new');
})

webApp.post('/pets', async (req, res) => {
    const pet = new Pet(req.body.pet);
    await pet.save();
    res.redirect(`/pets/${pet._id}`);
})

//show page(more detailed version of each pet)
webApp.get('/pets/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    res.render('show', { pet });
})

//edit page
webApp.get('/pets/:id/edit', async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    res.render('edit', { pet });
})

//Update
webApp.put('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByIdAndUpdate(id, { ...req.body.pet });
    res.redirect(`/pets/${pet._id}`);
})

//Delete
webApp.delete('/pets/:id', async (req, res) => {
    const { id } = req.params;
    await Pet.findByIdAndDelete(id);
    res.redirect('/pets');
})



// webApp.get('/createPet', async (req, res) => {
//     //const pet = new Pet({ name: 'Biko', price: 4000 });
//     //await pet.save();
//     //res.send(pet);
// })

webApp.listen(3000, () => {
    console.log("Connection Established(Port 3000)!");
})