const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  const storeName = "My Book Store";
  const books = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho"
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling"
    },
    {
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam"
    }
  ];
  res.render('index', {
    storeName,
    books
  });
});
module.exports = router;