import express from 'express';
import { manejadorRutaPerfil } from './controlador/manejadorRutaPerfil.js';
const rutaPerfil = express.Router();
rutaPerfil.post('/registrarPerfil', (req, res) => {
       manejadorRutaPerfil(req, res, 'registrarPerfil');
})
rutaPerfil.get('/paginaPersonal', (req, res) => {
       manejadorRutaPerfil(req, res, 'paginaPersonal');
})

export { rutaPerfil };
