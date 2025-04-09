const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("./userModel");
const validateUser = require("../middleware/validate");

//Logik för att registrera nya användare

router.post("/register", validateUser, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  db.run(
    `INSERT INTO users (id, username, password) VALUES (?, ?, ?)`,
    [userId, username, hashedPassword],
    (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(400)
          .json({ error: "Kunde inte registrera användaren" });
      }
      res.status(201).json({ message: "Användare registrerad", userId });
    }
  );
});

// Logik som loggar in användaren

router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Serverfel försök igen" });
      }

      if (!user) {
        return res
          .status(400)
          .json({ error: "Ogiltigt användarnamn eller lösenord" });
      }

      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        return res
          .status(400)
          .json({ error: "Ogiltigt användarnamn eller lösenord" });
      }

      res.status(200).json({ message: "Inloggning lyckades", userId: user.id });
    }
  );
});

module.exports = router;
