import express from 'express';
const rutaImagen = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import manejadorRutaCarpetas  from './controlador/manejadorRutaCarpetas.js';
import manejadorRutaImagen from './controlador/manejadorRuraImagen.js';
import path from 'path';
import multer from 'multer';
rutaImagen.post('/subirImagen', manejadorDeRutasLogin.verificarToken, manejadorRutaImagen.subirImagen);
export{rutaImagen}