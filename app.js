const express = require("express");
const cors = require("cors");
const app = express();

// Importerar routes
const cartRoutes = require("./routes/cartRoutes");
const aboutRoutes = require("./routes/aboutRoutes")
const menuRoute = require("./routes/menu");

app.use(cors());
app.use(express.json());

app.use("./api/cart", cartRoutes);
app.use("/api/about", aboutRoutes);


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/menu", menuRoute);

const orderHistoryRoute = require("./routes/orderHistory");
app.use("/api/orders", orderHistoryRoute);

const campaignRoutes = require("./routes/campaigns");
app.use("/api/campaigns", campaignRoutes);

module.exports = app;

