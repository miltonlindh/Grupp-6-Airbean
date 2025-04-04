const express = require("express");
const router = express.Router();
const db = require("../db/database");
const menu = require("../menu.json");

// lägg till i varukorgen
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
//kollar om produkten finns på menyn
  const product = menu.menu.find(p => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: "Produkten finns inte i menyn" });
  }

  //lägger till i databsen
  db.run(
    `INSERT INTO cart_items (productId, quantity) VALUES (?, ?)`,
    [productId, quantity],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Kunde inte lägga till i varukorgen" });
      }
     //skcikar bekräftelse samt id för raden som skapats
      res.status(201).json({ message: "Tillagd i varukorgen", id: this.lastID });
    }
  );
});

// GET hämta och visa varukorgen
router.get("/", (req, res) => {
    //hämta alla rader från cart_items
  db.all(`SELECT * FROM cart_items`, (err, items) => {
    if (err) {
      return res.status(500).json({ error: "Kunde inte hämta varukorgen" });
    }

    //lägger till namn pris och totalen från menyn
    const cartWithDetails = items.map(item => {
      const product = menu.menu.find(p => p.id === item.productId);
      const subtotal = product.price * item.quantity;

      return {
        id: item.id,
        productId: item.productId,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        subtotal
      };
    });
//räknar ut total kostnad för hela varukorgen
    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ cart: cartWithDetails, total });
  });
});

// DELETE tar bort från varukorgen
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;
//raderar raden med id som skrivits in
  db.run(`DELETE FROM cart_items WHERE id = ?`, [itemId], function (err) {
    if (err) {
      return res.status(500).json({ error: "Kunde inte ta bort produkt" });
    }
    //produkten fanns inte
    if (this.changes === 0) {
      return res.status(404).json({ error: "Produkten finns inte i varukorgen" });
    }
//produkten tagits bort bekräftelse meddelande
    res.json({ message: "Produkt borttagen ur varukorgen" });
  });
});

module.exports = router;
