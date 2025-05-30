import express from 'express';
const rutaCarpetas = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import manejadorRutaCarpetas  from './controlador/manejadorRutaCarpetas.js';
import path from 'path';
import multer from 'multer';
rutaCarpetas.get('/accederAlbumes', manejadorRutaCarpetas.accederAlbumes);
rutaCarpetas.post('/crearAlbum',manejadorDeRutasLogin.verificarToken, manejadorRutaCarpetas.crearAlbum);
rutaCarpetas.post('/buscarAlbumesPersonalesPorId', manejadorDeRutasLogin.verificarToken, manejadorRutaCarpetas.buscarAlbumesPersonalesPorId);
rutasCarpetas.post('/modificarTituloAlbum', manejadorDeRutasLogin.verificarToken, manejadorRutaCarpetas.modificarTituloAlbum);
export{rutaCarpetas}