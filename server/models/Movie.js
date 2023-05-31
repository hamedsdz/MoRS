const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  original_title: {
    type: String,
  },
  genres: {
    type: [String],
    required: true,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  production_countries: {
    type: [String],
  },
  release_date: {
    type: Date,
  },
  status: {
    type: String,
  },
  backdrop_image_path: {
    type: String,
  },
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
