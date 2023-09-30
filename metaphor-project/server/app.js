const express = require("express");
const router = require("./routes");

const app = express();

// Middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api", router);

module.exports = app;
