const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "movies",
  },
  rate: {
    type: String,
    required: true,
  },
});

module.exports = Rating = mongoose.model("ratings", RatingSchema);
