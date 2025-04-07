const express = require("express");
const router = express.Router();
const campaigns = require("../data/campaigns.json");

router.get("/", (req, res) => {
  res.status(200).json(campaigns);
});

module.exports = router;
