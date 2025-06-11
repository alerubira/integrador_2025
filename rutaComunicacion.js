import express from 'express';
import { parametros } from './parametros.js';
import manejadorDeRutasLogin, { verificarToken } from './controlador/manejadorDeRutasLogin.js';
import manejadorRuraComunicacion from './controlador/manejadorRuraComunicacion.js';
//import { Login } from './modelo/claseLogin';
const rutaComunicacion = express.Router();
rutaComunicacion.post('/generarSolicitudAmistad',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.generarSilicitudAmistad)
rutaComunicacion.post('/buscarNotificaciones',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.buscarNotificacionesPorIdSolicitado)
rutaComunicacion.post('/buscarNotificacionesNoLeidas',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.buscarNotificacionesNoLeidasPorIdSolicitado)
rutaComunicacion.post('/marcarLeidaNotificacion',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.marcarLeidaNotificacion);
rutaComunicacion.post('/aceptarSolicitud',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.aceptarSolicitud);
rutaComunicacion.post('/enviarComentario',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.crearComentario);
rutaComunicacion.post('/traerSolicitudPorId',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.traerSolicitudPorId);
rutaComunicacion.post('/traerComentarioPorId',manejadorDeRutasLogin.verificarToken,manejadorRuraComunicacion.traerComentarioPorId);

export{rutaComunicacion}