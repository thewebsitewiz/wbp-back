const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const { dbConnect, gracefulExit } = require("./config/dbConnect");

// Handle process termination signals
process.on("SIGINT", gracefulExit); // Ctrl+C
process.on("SIGTERM", gracefulExit); // Termination signal (e.g., from Docker)

const ENV = process.env.WBP_ENV;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Uncomment if JWT auth is needed
// const authJwt = require("./helpers/jwt");
const { errorHandler, notFound } = require("./middleware/errorHandler");
console.log(errorHandler);

// Connect to the database
const conn = dbConnect();

// Determine domain and hostname based on environment
let domain = "http://localhost:4200";
let hostname = "localhost";
if (ENV === "PROD") {
  domain = "http://wbp.thewebsitewiz.com";
  hostname = "0.0.0.0";
}

console.log("domain: ", ENV, domain);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
// app.use(authJwt()); // Enable JWT auth if needed

// Enable CORS without manual header setting
app.use(
  cors({
    origin: [domain],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const weatherRouter = require("./routes/weather.routes");
const imageRouter = require("./routes/image.routes");
const tagsRouter = require("./routes/tag.routes");
const vendorsRouter = require("./routes/vendor.routes");
const configRouter = require("./routes/config.routes");

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.use("/api/weather", weatherRouter);
app.use("/api/images", imageRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/vendors", vendorsRouter);
app.use("/api/config", configRouter);

// Error handling middleware (should be last)
if (errorHandler) {
  console.log("errorHandler in use")
  app.use(errorHandler);
}

// Server
const port = process.env.PORT || 3000;
app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});
