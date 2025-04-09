// Importerar express så vi kan använda router
const express = require("express");
const router = express.Router();

// Definierar en GET-endpoint för /api/navigation
router.get("/", (req, res) => {
  // Skickar tillbaka ett JSON-objekt som innehåller navigationsstruktur
  res.json({
    // Namnet på appen – kan användas i frontend eller dokumentation
    appName: "Airbean",

    // En lista över "sidor" eller resurser i API:t som motsvarar en typ av navigering
    navigation: [
      {
        name: "Meny", // Vad användaren ser
        path: "/menu", // API-route som motsvarar denna sida
        description: "Visar alla kaffedrycker", // Förklaring av vad route:n gör
      },
      {
        name: "Kampanjer",
        path: "/api/campaigns",
        description: "Visar aktuella erbjudanden",
      },
      {
        name: "Varukorg",
        path: "/api/cart",
        description: "Lägga till och ta bort produkter",
      },
      {
        name: "Beställning",
        path: "/api/orders",
        description: "Skapa och följa beställningar",
      },
      {
        name: "Om oss",
        path: "/api/about",
        description: "Information om Airbean",
      },
    ],
  });
});

// Exporterar routern så att den kan användas i app.js
module.exports = router;
