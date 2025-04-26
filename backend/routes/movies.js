const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
  const movies = [
    { name: "Titanic", genre: "Romance", rating: 8 },
    { name: "The Notebook", genre: "Romance", rating: 7.5 },
    { name: "Deadpool", genre: "Comedy", rating: 7 },
    { name: "The Hangover", genre: "Comedy", rating: 7.7 },
    { name: "John Wick", genre: "Action", rating: 9 },
    { name: "Mad Max", genre: "Action", rating: 8.1 },
  ];
  res.json(movies);
});

module.exports = router;
