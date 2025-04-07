// Importerar Express och skapar en ny router-instans
const express = require("express");
const router = express.Router();

// Importerar SQLite och öppnar upp en anslutning till databasen 'airbean.db'
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./airbean.db");

// Endpoint: GET /:userId
// Hämtar alla ordrar från databasen för en specifik användare
router.get("/:userId", (req, res) => {
  // Hämtar userId från URL-parametern
  const userId = req.params.userId;

  // Kör en SQL-fråga som hämtar alla rader från 'orders' där userId matchar
  db.all("SELECT * FROM orders WHERE userId = ?", [userId], (err, rows) => {
    // Om ett fel inträffar, skicka status 500 och ett felmeddelande
    if (err) {
      return res.status(500).json({ error: "Databasfel" });
    }

    // Skicka tillbaka en lista med ordrar i JSON-format
    res.status(200).json({ orders: rows });
  });
});

// Exporterar routern så att den kan användas i t.ex. app.js eller server.js
module.exports = router;
