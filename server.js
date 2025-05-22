const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database"); // Archivo nuevo para la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares necesarios para el backend
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde "gamelink/game"
app.use(express.static(path.join(__dirname, "gamelink", "game")));

// Ruta POST para registrar usuarios
app.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y correo requeridos" });
  }

  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al guardar en la base de datos" });
      }
      res.json({ id: this.lastID, name, email });
    }
  );
});

// Servir el archivo index.html para todas las rutas (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "gamelink", "game", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
