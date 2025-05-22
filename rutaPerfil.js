import express from 'express';
import { manejadorRutaPerfil } from './controlador/manejadorRutaPerfil.js';
const rutaPerfil = express.Router();
rutaPerfil.post('/registrarPerfil', (req, res) => {
       manejadorRutaPerfil(req, res, 'registrarPerfil');
})
export { rutaPerfil };