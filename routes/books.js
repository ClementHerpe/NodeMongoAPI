const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const {Book,validateBook} = require('../models/books');

//POST: CREATE A NEW BOOK
router.post('/', requiresAuth(), async (req,res) => {
    const error = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);
    book = new Book({
        name: req.body.bookName,
        author:{
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        gender: req.body.gender
    });

    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Opps, le livre n'a pas été crée");
    })
});

//GET ALL BOOKS
router.get("/", requiresAuth(), (req, res) => {
    Book.find().then(books => res.send(books)).catch((error) => {
        res.status(500).send("Je n'ai pas pu récupérer les livres");
    })
})

//GET THE BOOK BY ID
router.get("/:bookId", requiresAuth(), async (req,res) => {
    const book = await Book.findById(req.params.bookId);
    if(!book) res.status(404).send("Livre non trouvé");
    res.send(book);
});

//UPDATE BOOK BASED ON ID
router.put('/:bookId', requiresAuth(), async(req,res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, {
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge,
        },
        gender: req.body.gender
    }, {new: true});
    if(!updatedBook) res.status(404).send("Livre non trouvé");
    res.send(updatedBook);
});

//DELETE A BOOK BASED ON ID
router.delete('/:bookId', requiresAuth(), async(req,res) => {
    const book = await Book.findByIdAndRemove(req.params.bookId);
    if(!book) res.status(404).send("Livre non trouvé");
    res.send(book);
});


module.exports = router;