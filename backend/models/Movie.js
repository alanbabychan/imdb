const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: String,
    genre: String,
    rating: Number
});

module.exports = mongoose.model('Movie', MovieSchema);
