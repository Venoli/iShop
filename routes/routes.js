/**
 * @author Venoli Gamage <venolishehaara@gmail.com>
 * route.js - API curd functions 
 */
const express = require('express');
const Model = require('../models/model');
const router = express.Router();


//add an item 
router.post('/items', async (req, res) => {
    const data = new Model(req.body)
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//get all items
router.get('/items', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//get an item by id
router.get('/items/:itemId', async (req, res) => {
    try {
        itemId = req.params.itemId;
        if (isNaN(+itemId)) {
            const data = await Model.findById(itemId);
            res.json(data)
        } else {
            res.status(400).json({ message: "Not a proper ID" })
        }
    }
    catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({ message: "Item doesn't exist" })
        } else {
            res.status(500).json({ message: error.message })
        }
    }
})


//updatw an item
router.put('/items/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const updatedData = req.body;
        const options = { new: false };

        if (isNaN(+itemId)) {
            const result = await Model.findByIdAndUpdate(
                itemId, updatedData, options
            )
            res.send(result)
        } else {
            res.status(400).json({ message: "Not a proper ID" })
        }

    }
    catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({ message: "Item doesn't exist" })
        } else {
            res.status(500).json({ message: error.message })
        }
    }
})


//delete an item
router.delete('/items/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        if (isNaN(+itemId)) {
            const data = await Model.findByIdAndDelete(itemId)
            res.send(`Document ${data._id}, ${data.name} deleted`)
        } else {
            res.status(400).json({ message: "Not a proper ID" })
        }
    }
    catch (error) {
        if (error.name == "CastError") {
            res.status(404).json({ message: "Item doesn't exist" })
        } else {
            res.status(500).json({ message: error.message })
        }
    }
})

module.exports = router;