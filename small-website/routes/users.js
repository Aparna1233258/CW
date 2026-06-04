var express = require('express');
var router = express.Router();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
router.get('/signup',(req,res)=>{
    res.render('signup');
});
router.post('/signup',async(req,res)=>{

    const {email,password,confirmPassword}
    = req.body;
    if(password !== confirmPassword){
        return res.send(
            'Passwords do not match'
        );
    }

    const existingUser =
    await User.findOne({email});

    if(existingUser){
        return res.send(
            'Email already exists'
        );
    }

    const hashedPassword =
    await bcrypt.hash(password,10);

    const user = new User({
        email,
        password:hashedPassword
    });

    await user.save();

    res.redirect('/users/login');
});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',async(req,res)=>{

    const {email,password}
    = req.body;

    const user =
    await User.findOne({email});

    if(!user){
        return res.send(
            'Invalid Email'
        );
    }

    const match =
    await bcrypt.compare(
        password,
        user.password
    );

    if(!match){
        return res.send(
            'Invalid Password'
        );
    }

    req.session.email = email;

    res.redirect('/users/secret');
});
router.get('/secret',(req,res)=>{

    if(!req.session.email){
        return res.redirect(
            '/users/login'
        );
    }

    if(
       !req.session.email.endsWith(
       '@eventco.com'
       )
    ){
       return res.send(
       'Access Denied'
       );
    }

    res.render('secret',{
       email:req.session.email
    });

});
router.get('/logout',(req,res)=>{

    req.session.destroy(()=>{
        res.redirect(
        '/users/login'
        );
    });

});
module.exports = router;