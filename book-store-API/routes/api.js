var express = require('express');
var router = express.Router();

const Book = require('../models/bookModel');


//create
router.post('/create_book_api', (req, res) => {

    const { title, author, price, inStock } = req.body;

    const book = new Book({
        title,
        author,
        price,

        // Convert Yes/No to Boolean
        inStock: inStock.toLowerCase() === "yes"
    });

    const validationError = book.validateSync();

    if (validationError) {

        const errors = {
            title: validationError.errors.title ?
                validationError.errors.title.properties.message :
                undefined,

            author: validationError.errors.author ?
                validationError.errors.author.properties.message :
                undefined,

            price: validationError.errors.price ?
                validationError.errors.price.properties.message :
                undefined
        };

        return res.status(400).json({ errors });
    }

    book.save()
        .then(() => {
            res.status(201).json({
                message: "Book added successfully"
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Server Error"
            });
        });

});

//read
router.get('/retrieve_book_api', (req, res) => {

    Book.find()

        .then(data => {

            const serializedData = data.map(book => ({

                id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                inStock: book.inStock

            }));

            res.status(200).json({
                data: serializedData
            });

        })

        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: 'Internal Server Error'
            });

        });

});

//update
router.put('/update_book_api/:id', (req, res) => {

    const bookId = req.params.id;

    const { title, author, price, inStock } = req.body;

    Book.findByIdAndUpdate(
        bookId,
        {
            title,
            author,
            price,
            inStock: inStock.toLowerCase() === "yes"
        }
    )

    .then(() => {

        res.status(200).json({
            message: 'Book updated successfully'
        });

    })

    .catch(error => {

        console.error(error);

        res.status(500).json({
            message: 'Internal Server Error'
        });

    });

});

//delete
router.delete('/delete_book_api/:id', (req, res) => {

    const bookId = req.params.id;

    Book.findByIdAndDelete(bookId)

        .then(() => {

            res.status(200).json({
                message: 'Book deleted successfully'
            });

        })

        .catch(error => {

            console.error(error);

            res.status(500).json({
                message: 'Internal Server Error'
            });

        });

});
console.log("API routes loaded");
module.exports = router;