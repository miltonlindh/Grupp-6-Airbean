const express = require("express");
const cors = require("cors");
const app = express();

// Importerar routes
const cartRoutes = require("./routes/cartRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
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

// Importerar routen som hanterar orderhistorik (GET /:userId)
const orderHistoryRoute = require("./routes/orderHistory");
// Använder routen under endpointen /api/orders
app.use("/api/orders", orderHistoryRoute);

// Importerar routen som hanterar kampanjer (GET /)
const campaignRoutes = require("./routes/campaigns");
// Använder routen under endpointen /api/campaigns
app.use("/api/campaigns", campaignRoutes);

module.exports = app;
