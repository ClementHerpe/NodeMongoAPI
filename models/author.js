const mongoose = require('mongoose');

//AUTHOR SCHEMA
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50
    },
    age:{
        type: Number,
        min: 10,
        max: 100
    }
});

module.exports = new mongoose.model('Author', AuthorSchema);
