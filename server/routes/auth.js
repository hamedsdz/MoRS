const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
// modules
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route   GET api/auth
// @desc    Auth Route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serverError");
  }
});

// @route   POST api/auth
// @desc    Authenticate User & Get Token
// @access  Public
router.post(
  "/",
  body("username", "usernameIsRequired").trim().notEmpty(),
  body("password", "passwordIsRequired")
    .exists()
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "i"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // See If User Exists
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "invalidCredentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "invalidCredentials" }] });
      }

      // Return JsonWebToken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 * 24 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("serverError");
    }
  }
);

module.exports = router;
