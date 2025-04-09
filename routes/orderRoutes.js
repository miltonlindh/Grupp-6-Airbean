// Hämtar kaffemenyn och kampanjdata från JSON-filer
const menu = require("../Data/menu.json");
const campaigns = require("../data/campaigns.json");

// Importerar express och skapar en router-instans
const express = require("express");
const router = express.Router();

// Importerar databasanslutningen
const db = require("../db/database");

// Funktion som kontrollerar om en beställning matchar en kampanj
function matchCampaign(items) {
  for (const campaign of campaigns.campaigns) {
    // Sorterar både kampanjens produkt-ID:n och orderns
    const kampanjIds = [...campaign.items].sort();
    const orderIds = items.map((i) => i.productId).sort();

    // Jämför som strängar – om match: returnera kampanjen
    if (JSON.stringify(kampanjIds) === JSON.stringify(orderIds)) {
      return campaign;
    }
  }
  // Ingen matchning hittad
  return null;
}

// ========================
// POST /api/orders
// Skapar en ny order
// ========================
router.post("/", (req, res) => {
  const { userId = null, items } = req.body; // userId kan vara null (gäst)

  const orderTime = new Date().toISOString(); // aktuell tid
  const deliveryTime = new Date(Date.now() + 5 * 60000).toISOString(); // 5 min senare

  // Validering: måste finnas items i ordern
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Varukorgen är tom" });
  }

  // Kolla om beställningen matchar en kampanj
  const matchedCampaign = matchCampaign(items);

  let totalPrice = 0;

  if (matchedCampaign) {
    // Om kampanj matchas, använd kampanjens pris
    totalPrice = matchedCampaign.price;
  } else {
    // Annars räkna ut totalsumma från menyn
    for (const item of items) {
      const product = menu.menu.find((p) => p.id === item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ error: "Ogiltig produkt i beställningen" });
      }
      totalPrice += product.price * item.quantity;
    }
  }

  // Spara ordern i databasen
  db.run(
    `INSERT INTO orders (userId, orderTime, deliveryTime, status, items)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, orderTime, deliveryTime, "På väg", JSON.stringify(items)],
    function (err) {
      if (err) {
        console.error("Fel vid SQL:", err.message);
        return res.status(500).json({ error: "Fel vid beställning" });
      }

      // Returnerar bekräftelse med orderinfo
      res.status(201).json({
        message: matchedCampaign ? "Order lagd med kampanjpris" : "Order lagd",
        orderId: this.lastID,
        status: "På väg",
        levererasOmMinuter: 5,
        totalPris: totalPrice,
      });
    }
  );
});

// ========================
// GET /api/orders/:id
// Hämtar status för en specifik order
// ========================
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  // Hämta order från databasen
  db.get(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: "Ordern finns inte" });
    }

    // Räkna ut minuter kvar till leverans
    const minutesLeft = Math.max(
      0,
      Math.ceil((new Date(row.deliveryTime) - new Date()) / 60000)
    );

    // Skickar tillbaka status för ordern
    res.json({
      orderId: row.id,
      status: minutesLeft > 0 ? "På väg" : "Levererad",
      levererasOmMinuter: minutesLeft,
    });
  });
});

// Exporterar routern så att den kan användas i app.js
module.exports = router;
