const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get movies by genre
router.get('/', async (req, res) => {
    const { genre, sort } = req.query;
    let movies;
    if (genre) {
        movies = await Movie.find({ genre });
    } else {
        movies = await Movie.find();
    }

    if (sort === 'rating') {
        movies.sort((a, b) => a.rating - b.rating);
    }
    
    res.json(movies);
});

module.exports = router;
