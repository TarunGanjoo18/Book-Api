const mongoose = require("mongoose");

// creating a book Schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [String],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: String
})


//  create a book model
const BookModel = mongoose.model("books", BookSchema);

// Exporting Book Model
module.exports = BookModel;