const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello From MoRS!");
});

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/movies", require("./routes/movies"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
