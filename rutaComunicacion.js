import express from 'express';
import { parametros } from './parametros.js';
import manejadorDeRutasLogin, { verificarToken } from './controlador/manejadorDeRutasLogin.js';
import manejadorRuraComunicacion from './controlador/manejadorRuraComunicacion.js';
//import { Login } from './modelo/claseLogin';
const rutaComunicacion = express.Router();
rutaComunicacion.post('/generarSolicitudAmistad',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.generarSilicitudAmistad)
export{rutaComunicacion}