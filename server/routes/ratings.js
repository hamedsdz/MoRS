const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Rating = require("../models/Rating");
const { body, validationResult } = require("express-validator");

// POST /api/ratings
// Add or update user's rating for a movie
// Private route
router.post(
  "/",
  auth,
  [
    body("movieId").trim().notEmpty().withMessage("Movie ID is required"),
    body("rate")
      .trim()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rate must be a number between 0 and 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { movieId, rate } = req.body;
    const userId = req.user.id;

    try {
      let rating = await Rating.findOne({ user: userId, movie: movieId });

      if (rating) {
        // Update existing rating
        rating.rate = rate;
      } else {
        // Create new rating
        rating = new Rating({
          user: userId,
          movie: movieId,
          rate,
        });
      }

      await rating.save();

      res.json({ rating });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
