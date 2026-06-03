var express = require('express');
var router = express.Router();
const Phone = require('../models/phoneModel');
//create
router.get('/create_phone',(req,res)=>{
    res.render('./phone/create',{error:null});
});

router.post('/create_phone',(req,res)=>{

    const {name,description,price}=req.body;

    const phone = new Phone({
        name,
        description,
        price
    });

    const validationError = phone.validateSync();

    if(validationError){

        res.render('./phone/create',{
            error:validationError.errors
        });

    }else{

        phone.save()
        .then(()=>{
            res.redirect('/phones/retrieve_phone');
        });

    }
});
//read
router.get('/retrieve_phone',(req,res)=>{

    Phone.find()
    .then(data=>{

        res.render('./phone/retrieve',{
            data:data
        });

    });

});
//update
router.get('/update_phone/:id',(req,res)=>{

    Phone.findById(req.params.id)
    .lean()
    .then(phone=>{

        res.render('./phone/edit',{
            phone,
            error:null
        });

    });

});

router.post('/update_phone/:id',(req,res)=>{

    const {name,description,price}=req.body;

    Phone.findByIdAndUpdate(
        req.params.id,
        {name,description,price}
    )
    .then(()=>{
        res.redirect('/phones/retrieve_phone');
    });

});
//delete
router.get('/delete_phone/:id',(req,res)=>{

    Phone.findById(req.params.id)
    .then(phone=>{

        res.render('./phone/delete',{
            phone
        });

    });

});

router.post('/delete_phone/:id',(req,res)=>{

    Phone.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/phones/retrieve_phone');
    });

});

module.exports = router;