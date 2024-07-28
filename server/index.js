import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import user from './controller/userController.js'

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


app.use("/registro-usuario", user.registerBD);
app.use("/login", user.loginBD);
app.use("/recuperarContra",user.recuperarContra);
app.use("/usuariosBd", user.usuariosBD)
app.use("/eliminarusuarioBd", user.eliminarUsuarioBd)
app.use("/actualizarUsuarioBd", user.actualizarUsuarioBd)


const PORT = 3001;
app.listen(PORT, () => {

  console.log("Servidor corriendo en el puerto ", PORT);

});
