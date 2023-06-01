const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const auth = require("../middleware/auth");
const { body, query, validationResult } = require("express-validator");
// models
const Movie = require("../models/Movie");

// @route   GET api/movies
// @desc    Get All Movies
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const movies = await Movie.find().sort({ date: -1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serverError");
  }
});

// @route   POST api/movies
// @desc    Create A Movie
// @access  Private
router.post(
  "/",
  auth,
  body("title", "titleIsRequired").trim().notEmpty(),
  body("genres", "genresAreRequired").notEmpty().isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      original_title,
      genres,
      type,
      overview,
      poster_path,
      production_countries,
      release_date,
      status,
      backdrop_image_path,
    } = req.body;

    try {
      let movie = await Movie.findOne({ title });

      if (movie) {
        return res.status(400).json({ errors: [{ msg: "movieAlreadyExists" }] });
      }

      const newMovie = new Movie({
        title,
        original_title,
        genres,
        type,
        overview,
        poster_path,
        production_countries,
        release_date,
        status,
        backdrop_image_path,
      });

      movie = await newMovie.save();
      res.json(movie);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("serverError");
    }
  }
);

// @route   GET api/movies/:id
// @desc    Get Movie By Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ errors: [{ msg: "movieNotFound" }] });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "movieNotFound" }] });
    }
    res.status(500).send("serverError");
  }
});

// @route   DELETE api/movies/:id
// @desc    Delete Movie By Id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    res.json({ msg: "movieRemoved" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "movieNotFound" }] });
    }
    res.status(500).send("serverError");
  }
});

// @route   GET api/movies/recommendation/list
// @desc    Get Recommended Movies List
// @access  Private
router.get("/recommendation/list", auth, async (req, res) => {
  try {
    const pythonProcess = spawn("python3", [
      "app/app.py",
      "get_movie_recommendations",
      req.user.id,
    ]);
    // Capture the output from the Python process
    let output = "";
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle any errors from the Python process
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python process: ${data}`);
      res.status(500).send("serverError");
    });

    // Handle the exit of the Python process
    pythonProcess.on("exit", (code) => {
      if (output === `User ID ${req.user.id} not found in the user_movie_matrix.`) {
        res.status(401).send("userIdNotFound");
      }
      res.json(output);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serverError");
  }
});

module.exports = router;
