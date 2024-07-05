const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, años } = req.body;

  db.query(
    "INSERT INTO empleados(nombre,edad,pais,cargo,años) VALUES(?,?,?,?,?)",
    [nombre, edad, pais, cargo, años],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error interno del servidor");
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error interno del servidor");
    }
    res.status(200).json(result);
  });
});

app.put("/update", (req, res) => {
  const { id, nombre, edad, pais, cargo, años } = req.body;
  console.log(
    "Received update request - id:",
    id,
    "nombre:",
    nombre,
    "edad:",
    edad,
    "pais:",
    pais,
    "cargo:",
    cargo,
    "años:",
    años
  );

  db.query(
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,años=? WHERE id=?",
    [nombre, edad, pais, cargo, años, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error interno del servidor");
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error interno del servidor");
    }
    console.log(result);
    res.send(result);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Ejecutándose en el puerto ${PORT}`);
});
