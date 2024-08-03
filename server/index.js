import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import user from './controller/userRoutes.js'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors());

app.use("/", user);



const PORT = 3001;
app.listen(PORT, () => {

  console.log("Servidor corriendo en el puerto ", PORT);

});
