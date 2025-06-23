import express from 'express';
const rutaDenuncia = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import path from 'path';
import manejadorRutaDenuncia from './controlador/manejadorRutaDenuncia.js';
rutaDenuncia.post('/traerMotivosDenuncia',manejadorDeRutasLogin.verificarToken,manejadorRutaDenuncia.traerMotivosDenuncia)
export{rutaDenuncia};
