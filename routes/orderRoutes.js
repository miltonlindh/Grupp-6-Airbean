const express = require("express");
const router = express.Router();
const db = require("../db/database");

//lägger en ny beställning
router.post("/", (req, res) => {
  const { userId = null, items } = req.body; //userId kan vara null(gäst)

  const orderTime = new Date().toISOString();
  const deliveryTime = new Date(Date.now() + 5 * 60000).toISOString(); //5 min

  //måste finnas produkter
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Varukorgen är tom" });
  }

  //lägger in order i databasen
  db.run(
    `INSERT INTO orders (userId, orderTime, deliveryTime, status, items)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, orderTime, deliveryTime, "På väg", JSON.stringify(items)],
    function (err) {
      if (err) {
        console.error("Fel vid SQL:", err.message);
        return res.status(500).json({ error: "Fel vid beställning" });
      }

      res.status(201).json({
        message: "Order lagd",
        orderId: this.lastID,
        status: "På väg",
        levererasOmMinuter: 5,
      });
    }
  );
});

//hämtar status för en order
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  db.get(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: "Ordern finns inte" });
    }

    const minutesLeft = Math.max(
      0,
      Math.ceil((new Date(row.deliveryTime) - new Date()) / 60000)
    );

    res.json({
      orderId: row.id,
      status: minutesLeft > 0 ? "På väg" : "Levererad",
      levererasOmMinuter: minutesLeft,
    });
  });
});

module.exports = router;
