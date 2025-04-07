//importerar sqlite3
const sqlite3 = require("sqlite3").verbose();
//används för att skapa sökväg till databsen
const path = require("path");

//skapar en anslutning till databas
const db = new sqlite3.Database(
  path.join(__dirname, "airbean.db"),
  (err) => {
    if (err) {
      //om något går fel vid ansultningen
      console.error("Kunde inte ansluta till databasen:", err.message);
    } else {
      //anslutning lyckats
      console.log("Ansluten till databasen");
    }
  }
);

module.exports = db;
