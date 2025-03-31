const express = require("express");
const cors = require("cors");
const app= express();

const cartRoutes = require("./routes/cartRoutes");
app.use(cors());
app.use(express.json());

app.use("./api/cart", cartRoutes);



module.exports = app;