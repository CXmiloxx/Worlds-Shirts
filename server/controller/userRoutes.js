// routes/userRoutes.js
import { Router } from 'express';
import multer from 'multer';
import {registerBD, loginBd, recuperarContra, usuariosBD, eliminarUsuarioBd, actualizarUsuarioBd } from '../controller/userController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();
router.post('/register', upload.single('imagen'), registerBD);

router.post('/login', loginBd);

router.put("/recuperarContra",recuperarContra);

router.get('/usuariosBd', usuariosBD);

router.post('/eliminarusuarioBd', eliminarUsuarioBd);

router.post('/actualizarUsuarioBd', actualizarUsuarioBd);


export default router;
