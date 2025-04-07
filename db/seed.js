const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//skapar och ansluter till airbean.db
const db = new sqlite3.Database(
  path.join(__dirname, "airbean.db"),
  (err) => {
    if (err) {
      console.error("Kunde inte ansluta till databasen:", err.message);
    } else {
      console.log("Ansluten till SQLite-databasen (airbean.db)");
    }
  }
);

//skapar tabell för varukorg (cart_items)
db.run(`
  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL
  )
`, (err) => {
  if (err) {
    console.error("Kunde inte skapa tabellen 'cart_items':", err.message);
  } else {
    console.log("Tabellen 'cart_items' skapad eller finns redan.");
  }
});

//skapar tabell för beställningar
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    orderTime TEXT,
    deliveryTime TEXT,
    status TEXT
  )
`, (err) => {
  if (err) {
    console.error("Kunde inte skapa tabellen 'orders':", err.message);
  } else {
    console.log("Tabell 'orders' skapad eller finns redan.");
  }

  //avslutar databasanslutning efter allt är klart
  db.close((err) => {
    if (err) {
      return console.error("Fel när databasen skulle stängas:", err.message);
    }
    console.log("Databasen är klar.");
  });
});
