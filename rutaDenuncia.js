import express from 'express';
const rutaDenuncia = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import path from 'path';
import manejadorRutaDenuncia from './controlador/manejadorRutaDenuncia.js';
rutaDenuncia.post('/traerMotivosDenuncia',manejadorDeRutasLogin.verificarToken,manejadorRutaDenuncia.traerMotivosDenuncia)
rutaDenuncia.post('/enviarDenuncia',manejadorDeRutasLogin.verificarToken,manejadorRutaDenuncia.enviarDenuncia);
rutaDenuncia.post('/buscarDenuncias',manejadorDeRutasLogin.verificarToken,manejadorRutaDenuncia.buscarDenuncias)
rutaDenuncia.post('/modificarActivoDenuncia',manejadorDeRutasLogin.verificarToken,manejadorRutaDenuncia.modificarActivoDenuncia);

export{rutaDenuncia};
