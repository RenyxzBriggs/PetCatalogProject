//Schema for pet
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({

    type: String,
    name: String,
    price: Number,
    isAvailable: Boolean,
    image: String

})



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;