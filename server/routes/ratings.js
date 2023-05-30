const express = require("express");
const router = express.Router();

// @route   GET api/rating
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Rating Route!"));

module.exports = router;
