const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./airbean.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;