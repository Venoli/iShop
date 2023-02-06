/**
 * @author Venoli Gamage <venolishehaara@gmail.com>
 * model.js - represents the shopping item model
 */
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    quantity: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)