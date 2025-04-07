const express = require("express");
const router = express.Router();
//skapar objekt med info om företaget
const aboutInfo = {
    title: "Airbean",
    description: "Airbean är ett hållbart företag som levererar kaffe med hjälp av drönare",
    values: ["Hållbart", "Snabbt", "Effektivt", "Gott"]
};
//returnerar företgsinfo
router.get("/", (req, res) =>{
    res.json(aboutInfo);
});

module.exports = router;
