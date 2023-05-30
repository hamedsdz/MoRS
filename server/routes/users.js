const express = require("express");
const router = express.Router();
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
// Models
const User = require("../models/User");

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  body("username", "usernameIsRequired").trim().notEmpty(),
  body("email", "pleaseIncludeValidEmail").isEmail(),
  body("password", "pleaseEnterProperPassword").matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    "i"
  ),
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
