const express = require('express');
const router = express.Router();
const Book = require('../models/books');

//POST: CREATE A NEW BOOK
router.post('/', (req,res) => {
    book = new Book({
        name: req.body.bookName,
        author:{
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        gender: req.body.genre
    });

    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Opps, le livre n'a pas été crée");
    })
});

module.exports = router;