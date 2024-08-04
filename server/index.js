import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import user from './controller/userRoutes.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", user);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto ", PORT);
});
