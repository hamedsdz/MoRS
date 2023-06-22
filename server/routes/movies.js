const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { spawn } = require("child_process");
// middleware
const auth = require("../middleware/auth");
// models
const Movie = require("../models/Movie");

// GET /api/movies
// Get all movies with pagination
// Private route
router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const genre = req.query.genre;
  const country = req.query.country;

  try {
    const query = {};
    if (genre) {
      query.genres = { $in: genre.split(",") };
    }
    if (country) {
      query.production_countries = { $in: country.split(",") };
    }
    const movies = await Movie.paginate(query, { page, limit });

    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/all/search
// Search movies by title with pagination
// Private route
router.get("/all/search", auth, async (req, res) => {
  const searchTerm = req.query.title;

  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { original_title: { $regex: new RegExp(searchTerm, "i") } },
      ],
    }).limit(10);

    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/all/random
// Get all movies with pagination
// Private route
router.get("/all/random", auth, async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);

    res.json(movies);
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

// GET /api/movies/all/popular
// Get popular movies
// Private route
router.get("/all/popular", auth, async (req, res) => {
  try {
    // Retrieve all movies with their associated ratings
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "movie",
          as: "ratings",
        },
      },
    ]);

    // Calculate average ratings for each movie
    const moviesWithAverageRatings = movies.map((movie) => {
      const totalRates = movie.ratings.length;
      const sumOfRates = movie.ratings.reduce((acc, rating) => acc + parseInt(rating.rate), 0);
      const averageRate = totalRates > 0 ? sumOfRates / totalRates : 0;

      return {
        ...movie,
        averageRate: averageRate.toFixed(1),
        totalRates,
      };
    });

    // Sort movies by popularity (total rates) and average rate
    const sortedMovies = moviesWithAverageRatings.sort((a, b) => {
      if (a.totalRates !== b.totalRates) {
        return b.totalRates - a.totalRates; // Sort by total rates (popularity)
      } else {
        return b.averageRate - a.averageRate; // Sort by average rate
      }
    });

    // Send the sorted movies as the API response
    res.json(sortedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/all/genres
// Get all movie genres
// Private route
router.get("/all/genres", auth, async (req, res) => {
  try {
    const genres = await Movie.distinct("genres");
    res.json(genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/movies/all/countries
// Get all movie production countries
// Private route
router.get("/all/countries", auth, async (req, res) => {
  try {
    const countries = await Movie.distinct("production_countries");
    res.json(countries);
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
      output += data;
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

      res.json(JSON.parse(output));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serverError");
  }
});

module.exports = router;
