const express = require("express");
const cors = require("cors");
const app= express();

const cartRoutes = require("./routes/cartRoutes");
const aboutRoutes = require("./routes/aboutRoutes")

app.use(cors());
app.use(express.json());

app.use("./api/cart", cartRoutes);
app.use("/api/about", aboutRoutes);


module.exports = app;