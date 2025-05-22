const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Crea la base de datos (o usa la existente)
const dbPath = path.join(__dirname, "users.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos SQLite");
  }
});

// Crea tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

module.exports = db;
