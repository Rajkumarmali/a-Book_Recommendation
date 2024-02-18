const express = require("express");
const Books = require("../models/Books");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await Books.find({})
        res.send([data])
    } catch (error) {
        res.send("Error")
    }
})



router.get('/hi', (req, res) => {
    res.send("welcome")
})

module.exports = router;

//global.medicine_item