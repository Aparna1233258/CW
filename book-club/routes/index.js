var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');


// Home Page
router.get('/', function(req, res) {

    res.render('hello-world', {
        errors: []
    });

});


// Form Submission
router.post('/createUser',

[
    check('name')
        .notEmpty()
        .withMessage('Name must not be empty'),

    check('email')
        .isEmail()
        .withMessage('Invalid email address'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
],

function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.render('hello-world', {
            errors: errors.array()
        });

    } else {

        res.render('form-data', {

            name: req.body.name,
            email: req.body.email

        });

    }

});

module.exports = router;