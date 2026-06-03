var express = require('express');
var router = express.Router();
const Product = require('../models/productsModel');

const ITEMS_PER_PAGE = 3;
router.get('/create_product',(req,res)=>{
    res.render('./product/create',{error:null});
});

router.post('/create_product',(req,res)=>{

    const {name,description,price}=req.body;

    const product=new Product({
        name,
        description,
        price
    });

    const validationError=product.validateSync();

    if(validationError){

        res.render('./product/create',{
            error:validationError.errors
        });

    }else{

        product.save()
        .then(()=>{
            res.redirect('/products/retrieve_product');
        });

    }
});
router.get('/retrieve_product',async(req,res)=>{

    const page=parseInt(req.query.page)||1;

    const totalProducts=
    await Product.countDocuments();

    const totalPages=
    Math.ceil(totalProducts/ITEMS_PER_PAGE);

    Product.find()
    .skip((page-1)*ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then(data=>{

        res.render('./product/retrieve',{
            data,
            currentPage:page,
            totalPages
        });

    });

});
router.get('/update_product/:id',(req,res)=>{

    Product.findById(req.params.id)
    .lean()
    .then(product=>{

        res.render('./product/edit',{
            product,
            error:null
        });

    });

});

router.post('/update_product/:id',(req,res)=>{

    const {name,description,price}=req.body;

    Product.findByIdAndUpdate(
        req.params.id,
        {name,description,price}
    )
    .then(()=>{
        res.redirect('/products/retrieve_product');
    });

});
router.get('/delete_product/:id',(req,res)=>{

    Product.findById(req.params.id)
    .then(product=>{

        res.render('./product/delete',{
            product
        });

    });

});

router.post('/delete_product/:id',(req,res)=>{

    Product.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/products/retrieve_product');
    });

});
module.exports = router;
