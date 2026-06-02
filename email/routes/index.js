var express = require('express');
var router = express.Router();

const User = require('../models/userModel');

router.get('/', (req,res)=>{

    res.render('signup',{
        errors:[]
    });

});

router.post('/', async(req,res)=>{

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];

    // Username Validation

    if(!username || username.trim() === ''){
        errors.push({
            msg:'Username is required'
        });
    }

    // Email Validation

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        errors.push({
            msg:'Invalid Email'
        });
    }

    // Password Validation

    if(password.length < 8){
        errors.push({
            msg:'Password must be at least 8 characters'
        });
    }

    if(errors.length > 0){

        return res.render('signup',{
            errors:errors
        });

    }

    const newUser = new User({
        username,
        email,
        password
    });

    await newUser.save();

    res.render('thankyou');

});

module.exports = router;