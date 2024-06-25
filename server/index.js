/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");
// eslint-disable-next-line no-undef
const axios = require("axios");
// eslint-disable-next-line no-undef
const user = require("./controller/userController");
const conexion = require("./configDB/configBD");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  let config = {
    method: "GET",
    url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
    headers: { 
      "Content-Type": "application/json", 
      "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq"
    },
  };
  axios(config).then((result) => {
    res.send(result.data.record);
  });
});

app.get("/todos-los-Usuarios", (req, res) => {
  const query = "SELECT * FROM sql3715883.usuario";
  conexion.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al obtener usuarios");
    }
    console.log(result);
    res.send(result);
  });
});

app.use("/registro-usuario", user.registerBD);
app.use("/login", user.login);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto ", PORT);
});
