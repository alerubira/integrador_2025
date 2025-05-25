import express from 'express';
import multer from 'multer';
import path from 'path';
import { Perfil } from './modelo/clasePerfil.js';

import { manejadorRutaPerfil } from './controlador/manejadorRutaPerfil.js';
const rutaPerfil = express.Router();
// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'estatica/imagenesPerfil'); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    // Nombre único para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

rutaPerfil.post('/registrarPerfil', (req, res) => {
       manejadorRutaPerfil(req, res, 'registrarPerfil');
})
rutaPerfil.get('/paginaPersonal', (req, res) => {
       manejadorRutaPerfil(req, res, 'paginaPersonal');
})
// Ruta para subir imagen
rutaPerfil.post('/subirImagenPerfil', upload.single('imagen'), async (req, res) => {
  try {
    // La URL pública para acceder a la imagen
    const urlImagen = '/imagenesPerfil/' + req.file.filename;
Perfil.modificarImagenPorIdPerfil(req.body.idPerfil, urlImagen)
    // Aquí deberías guardar `urlImagen` en la base de datos, por ejemplo:
    // await guardarUrlEnBD(req.body.idUsuario, urlImagen);

    res.json({ success: true, url: urlImagen });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export { rutaPerfil };
