const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
  rate: {
    type: mongoose.SchemaTypes.Decimal128,
    min: 0,
    max: 10,
  },
  backdrop_image_path: {
    type: String,
  },
});

MovieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
