"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
// const authJwt = require("./helpers/jwt");
// const errorHandler = require("./helpers/error-handler");
const conn = dbConnect();
let domain = "http://localhost:4200";
let hostname = "localhost";
if (ENV === "PROD") {
    domain = "http://wbp.thewebsitewiz.com";
    hostname = "0.0.0.0";
}
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('combined'));
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(express.static(__dirname + "/public"));
// app.use(errorHandler);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({
    origin: [domain],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
//Routes
const weatherRouter = require("./routes/weather.routes");
const imageRouter = require("./routes/image.routes");
const tagsRouter = require("./routes/tag.routes");
const vendorsRouter = require("./routes/vendor.routes");
const api = process.env.API_URL;
app.get("/", function (req, res) {
    res.json({
        message: "hello world",
    });
});
app.use("/api/weather", weatherRouter);
app.use("/api/images", imageRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/vendors", vendorsRouter);
//Server
const port = 3000;
app.listen(3000, hostname, () => {
    console.log(`Server is running on  ${port}`);
});
