const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    cover: {
        type: String
    },
    price: {
        type: String
    },
    publication_date: {
        type: String
    },
    description: {
        type: String
    }
})
const Books = mongoose.model('Books', BooksSchema);
module.exports = Books;