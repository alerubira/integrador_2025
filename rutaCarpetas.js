import express from 'express';
const rutaCarpetas = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import manejadorRutaCarpetas  from './controlador/manejadorRutaCarpetas.js';
import path from 'path';
import multer from 'multer';
rutaCarpetas.post('/accederCarpetas', manejadorDeRutasLogin.verificarToken, manejadorRutaCarpetas.accederCarpetas);
export{rutaCarpetas}