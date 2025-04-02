const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./airbean.db");

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.all(
    "SELECT * FROM orders WHERE userId = ?",
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Databasfel" });
      }

      res.status(200).json({ orders: rows });
    }
  );
});

module.exports = router;

