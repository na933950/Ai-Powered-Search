const express = require("express");
const router = require("./routes");
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Route
app.use("/api", router);

module.exports = app;
