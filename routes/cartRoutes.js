const express = require("express");
const router = express.Router();
//databas och meny
const db = require("../db/database");
const menu = require("../Data/menu.json");
//middleware
const validateCartItem = require("../middleware/validateCartItems");

//lägg till produkten i varukorgen, middleware körs först
router.post("/", validateCartItem, (req, res) => {
  const { productId, quantity } = req.body;

  //lägger till produkten i databasen
  db.run(
    `INSERT INTO cart_items (productId, quantity) VALUES (?, ?)`,
    [productId, quantity],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Kunde inte lägga till i varukorgen" });
      }

      //skickar bekräftelse och id
      res.status(201).json({ message: "Tillagd i varukorgen", id: this.lastID });
    }
  );
});

//hämtar varukorgen
router.get("/", (req, res) => {
  //hämtar alla produkter från cart_items
  db.all(`SELECT * FROM cart_items`, (err, items) => {
    if (err) {
      return res.status(500).json({ error: "Kunde inte hämta varukorgen" });
    }

    //matchar produkterna med menyn samt räknar ut totalen
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

    //räknar ut totalkostnaden
    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
//varukorg + totalsumma
    res.json({ cart: cartWithDetails, total });
  });
});

//tar bort från varukorgen
router.delete("/:id", (req, res) => {
  const itemId = req.params.id;

  //raderar raden med det angivna id från databas
  db.run(`DELETE FROM cart_items WHERE id = ?`, [itemId], function (err) {
    if (err) {
      return res.status(500).json({ error: "Kunde inte ta bort produkt" });
    }
//om produkten inte fanns i varukorgen
    if (this.changes === 0) {
      return res.status(404).json({ error: "Produkten finns inte i varukorgen" });
    }
//bekräftelse meddelande
    res.json({ message: "Produkt borttagen ur varukorgen" });
  });
});

module.exports = router;
