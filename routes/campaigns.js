// Importerar Express-biblioteket
const express = require("express");

// Skapar en ny router-instans med Express Router
const router = express.Router();

// Importerar kampanjdata från en lokal JSON-fil
const campaigns = require("../data/campaigns.json");

// Definierar en GET-route på "/" (som kommer bli t.ex. /api/campaigns i app.js)
// När en användare gör ett GET-anrop till denna route returneras kampanjdatan
router.get("/", (req, res) => {
  res.status(200).json(campaigns); // Skickar kampanjdatan som JSON med statuskod 200 (OK)
});

// Exporterar routern så att den kan användas i t.ex. app.js
module.exports = router;
