const mongoose = require('mongoose');
const Author = require('./author');
//BOOK SCHEMA
const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50
    },
    author:Author.schema,
    gender:{
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50
    }
});

module.exports = new mongoose.model('Book', BookSchema);
