// Importerar Express-appen från app.js (där vi har satt upp middleware och routes)
const app = require("./app");

// Hämtar portnumret från miljövariabler (om det finns), annars används 3000
const PORT = process.env.PORT || 3000;

// Startar servern och lyssnar på den angivna porten
// När servern startar, skrivs ett meddelande ut i konsolen
app.listen(PORT, () => {
  console.log(`kör på http://localhost:${PORT}`);
});
