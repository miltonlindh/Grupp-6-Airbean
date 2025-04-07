// Importerar Express-biblioteket
const express = require("express");

// Skapar en ny router-instans från Express
const router = express.Router();

// Importerar menyn från JSON-filen (menyn med alla kaffesorter)
const menu = require("../data/menu.json");

// Definierar en GET-route på "/"
// När någon anropar /menu så skickas menyn som svar
router.get("/", (req, res) => {
  res.status(200).json(menu); // Skickar menyn i JSON-format med statuskod 200 (OK)
});

// Exporterar router-objektet så att det kan användas i app.js
module.exports = router;
