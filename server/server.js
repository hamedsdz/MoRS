const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/movies", require("./routes/movies"));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
