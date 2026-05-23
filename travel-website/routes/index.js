var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    const message = "Welcome to Travel World";
    const places = [
        { name: "Paris", country: "France", isPopular: true },
        { name: "Tokyo", country: "Japan", isPopular: true },
        { name: "Colombo", country: "Sri Lanka", isPopular: false }
    ];
    res.render('index', {
        message,
        places
    });
});

module.exports = router;