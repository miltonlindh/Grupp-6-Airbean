const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const menuRoute = require("./routes/menu");
app.use("/menu", menuRoute);

module.exports = app;
