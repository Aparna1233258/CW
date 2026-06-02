var express = require('express');
var router = express.Router();

const { validationResult } = require('express-validator');

const {
    validateEmail,
    validatePassword
} = require('./customValidators');

router.get('/', function(req, res) {

    res.render('hello-world', {
        errors: []
    });

});

router.post(
    '/createUser',
    [
        validateEmail,
        validatePassword
    ],
    function(req, res) {

        const errors = req.validationErrors || [];

        const validationResultErrors = validationResult(req);

        if (!validationResultErrors.isEmpty()) {
            errors.push(...validationResultErrors.array());
        }

        if (errors.length > 0) {

            res.render('hello-world', {
                errors: errors
            });

        } else {

            const email = req.body.email;

            res.render('form-data', {
                email: email
            });

        }

    }
);

module.exports = router;