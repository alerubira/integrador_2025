import express from 'express';
import { parametros } from './parametros.js';
import manejadorDeRutasLogin, { verificarToken } from './controlador/manejadorDeRutasLogin.js';
import manejadorRuraComunicacion from './controlador/manejadorRuraComunicacion.js';
//import { Login } from './modelo/claseLogin';
const rutaComunicacion = express.Router();
rutaComunicacion.post('/generarSolicitudAmistad',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.generarSilicitudAmistad)
rutaComunicacion.post('/buscarNotificaciones',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.buscarNotificacionesPorIdSolicitado)
rutaComunicacion.post('/buscarNotificacionesNoLeidas',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.buscarNotificacionesNoLeidasPorIdSolicitado)

export{rutaComunicacion}