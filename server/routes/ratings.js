const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
// Models
const Rating = require("../models/Rating");
const Movie = require("../models/Movie");

// @route   POST api/ratings/:id
// @desc    Rate Movie
// @access  Private
router.post("/:id", auth, body("rate", "rateIsRequired").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rate } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: "movieNotFound" });
    }
    let rating = await Rating.findOne({ user: req.user.id, movie: req.params.id });
    if (rating) {
      // Update Rating
      rating = await Rating.findOneAndUpdate(
        { user: req.user.id, movie: req.params.id },
        { $set: { rate } },
        { new: true }
      );
      return res.json(rating);
    }
    rating = new Rating({ user: req.user.id, movie: req.params.id, rate });

    await rating.save();
    res.json(rating);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "movieNotFound" });
    }
    res.status(500).send("serverError");
  }
});

module.exports = router;
