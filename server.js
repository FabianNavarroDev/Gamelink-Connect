const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Cambia el path estático para incluir la subcarpeta "game"
app.use(express.static(path.join(__dirname, "gamelink", "game")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "gamelink", "game", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
