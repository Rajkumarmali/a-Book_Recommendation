const express = require('express');
const Books = require('../models/Books');
const Review = require('../models/Review');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { bookId, rating, commnet,userEmail } = req.body;
        const book = await Books.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const review = new Review({
            book: bookId,
            rating,
            commnet,
            userEmail,
        })
        review.save()
        res.send("Review created successfully")
    } catch (err) {
        console.log(err)
    }
})

router.post('/get', async (req, res) => {
    try {
        const { bookId } = req.body;
        const review = await Review.find({ book: bookId });
        res.send(review);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;