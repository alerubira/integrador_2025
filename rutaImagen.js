import express from 'express';
const rutaImagen = express.Router();
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import manejadorRutaCarpetas  from './controlador/manejadorRutaCarpetas.js';
import manejadorRutaImagen from './controlador/manejadorRuraImagen.js';
import path from 'path';
import multer from 'multer';
import manejadorRuraImagen from './controlador/manejadorRuraImagen.js';
// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'estatica/imagenesAlbum'); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    // Nombre único para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});//

const upload = multer({ storage: storage });
rutaImagen.post('/subirImagen', manejadorDeRutasLogin.verificarToken,upload.single('imagenSubir') , manejadorRutaImagen.subirImagen);
rutaImagen.post('/buscarImagenesPorIdAlbumPersonal', manejadorDeRutasLogin.verificarToken, manejadorRutaImagen.buscarImagenesPorIdAlbumPersonal);
rutaImagen.post('/modificarTituloPorId',manejadorDeRutasLogin.verificarToken,manejadorRuraImagen.modificarTituloPorId);
rutaImagen.post('/modificarCaptionPorId',manejadorDeRutasLogin.verificarToken,manejadorRutaImagen.modificarCaptionPorId);
export{rutaImagen}