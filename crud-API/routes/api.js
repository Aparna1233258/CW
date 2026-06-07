const express = require('express');
const router = express.Router();

const Product = require('../models/productsModel');


// ==============================
// CREATE PRODUCT
// ==============================
router.post('/create_product_api', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const product = new Product({
            name,
            description,
            price
        });

        await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (err) {
        console.error(err);

        res.status(400).json({
            message: err.message
        });
    }
});


// ==============================
// GET ALL PRODUCTS
// ==============================
router.get('/products', async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ==============================
// GET PRODUCT BY ID
// ==============================
router.get('/product/:id', async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }

});


// ==============================
// UPDATE PRODUCT
// ==============================
router.put('/update_product_api/:id', async (req, res) => {

    try {

        const { name, description, price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }

});


// ==============================
// DELETE PRODUCT
// ==============================
router.delete('/delete_product_api/:id', async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }

});


module.exports = router;