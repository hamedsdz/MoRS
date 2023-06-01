const express = require("express");
const router = express.Router();
const config = require("config");
const gravatar = require("gravatar");
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
    res.json({ user, token: req.header("x-auth-token") });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serverError");
  }
});

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
router.post(
  "/register",
  body("username", "usernameIsRequired").trim().notEmpty(),
  body("email", "emailIsNotValid").trim().isEmail(),
  body("password", "passwordIsRequired")
    .trim()
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "i"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // See If User Exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "userAlreadyExists" }] });
      }

      // Get Users Gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({ username, email, avatar, password });

      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return JsonWebToken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 * 24 }, async (err, token) => {
        if (err) throw err;
        const currentUser = await User.findById(user.id).select("-password");
        res.json({ token, user: currentUser });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("serverError");
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate User & Get Token
// @access  Public
router.post(
  "/login",
  body("username", "usernameIsRequired").trim().notEmpty(),
  body("password", "passwordIsRequired")
    .trim()
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

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 * 24 }, async (err, token) => {
        if (err) throw err;
        const currentUser = await User.findById(user.id).select("-password");
        res.json({ token, user: currentUser });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("serverError");
    }
  }
);

module.exports = router;
