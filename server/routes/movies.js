const express = require("express");
const router = express.Router();

// @route   GET api/movies
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Movies Route!"));

module.exports = router;
