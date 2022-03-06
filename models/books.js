const mongoose = require('mongoose');
const Author = require('./author');
const yup = require('yup');

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

const validateBook = book => {
    const schema = yup.object().shape({
        bookName: yup.string().required().min(3).max(50),
        authorName: yup.string().required().min(3).max(50),
        //Pour message perso selon l'erreur
        authorAge: yup.number().required().min(10, "Ecrire un livre avant 10 ans ? Impossible !").max(100),
        gender:  yup.string().required().min(3).max(50),
    });
    return schema.validate(book).then(book => book).catch(error => {
        return {
            message: error.message
        }
    });
}

exports.Book = new mongoose.model('Book', BookSchema);
exports.validateBook = validateBook;