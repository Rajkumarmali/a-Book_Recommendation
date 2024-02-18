const express = require('express');
const mongoose = require('mongoose');
const Books = require('../models/Books');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const _id = req.body;
        const bookDetail = await Books.findById(_id)
        res.send(bookDetail)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;