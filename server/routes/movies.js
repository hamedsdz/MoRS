const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Movie = require("../models/Movie");
const { body, validationResult } = require("express-validator");

// GET /api/movies
// Get all movies with pagination
// Private route
router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const movies = await Movie.paginate({}, { page, limit });

    res.json({ movies });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/search
// Search movies by title with pagination
// Private route
router.get("/search", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchTerm = req.query.title;

  try {
    const movies = await Movie.paginate(
      { title: { $regex: new RegExp(searchTerm, "i") } },
      { page, limit }
    );

    res.json({ movies });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/:id
// Get a single movie by id
// Private route
router.get("/:id", auth, async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ movie });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/movies
// Create a new movie
// Private route
router.post(
  "/",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("genres")
      .isArray({ min: 1 })
      .withMessage("Genres must be an array with at least one item"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      original_title,
      genres,
      overview,
      poster_path,
      production_countries,
      release_date,
      status,
      backdrop_image_path,
    } = req.body;

    try {
      const movie = new Movie({
        title,
        original_title,
        genres,
        overview,
        poster_path,
        production_countries,
        release_date,
        status,
        backdrop_image_path,
      });

      await movie.save();

      res.json({ movie });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PUT /api/movies/:id
// Update a movie by id
// Private route
router.put(
  "/:id",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("genres")
      .isArray({ min: 1 })
      .withMessage("Genres must be an array with at least one item"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      original_title,
      genres,
      overview,
      poster_path,
      production_countries,
      release_date,
      status,
      backdrop_image_path,
    } = req.body;

    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          title,
          original_title,
          genres,
          overview,
          poster_path,
          production_countries,
          release_date,
          status,
          backdrop_image_path,
        },
        { new: true }
      );

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json({ movie });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/movies/:id
// Delete a movie by id
// Private route
router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET api/movies/recommendation/list
// Get Recommended Movies List
// Private route
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
