const db = require("../db/database");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;
