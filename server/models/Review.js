const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    commnet: {
        type: String
    },
    userEmail:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;