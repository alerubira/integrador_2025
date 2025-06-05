import express from 'express';
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import manejadorRutaPerfil  from './controlador/manejadorRutaPerfil.js';
import path from 'path';
import multer from 'multer';
const rutaPerfil = express.Router();

// Configuración de almacenamiento de Multer
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'estatica/tmp'); // Carpeta temporal donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    // Nombre único para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});*/

//const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });
rutaPerfil.post('/registrarPerfil', manejadorRutaPerfil.registrarPerfil)/*(req, res) => {
      // manejadorRutaPerfil(req, res, 'registrarPerfil');
})*/
rutaPerfil.get('/paginaPersonal',manejadorRutaPerfil.paginaPersonal) /*(req, res) => {
       manejadorRutaPerfil(req, res, 'paginaPersonal');
})*/
rutaPerfil.post('/subirImagenPerfil',manejadorDeRutasLogin.verificarToken,upload.single('imagen') ,manejadorRutaPerfil.subirImagenPerfil)/* (req, res) => {
       manejadorRutaPerfil(req, res, 'subirImagenPerfil');
})*/
rutaPerfil.post('/modificarEMailPerfil', manejadorDeRutasLogin.verificarToken,manejadorRutaPerfil.modificarEMailPerfil) /*(req, res) => {
       manejadorRutaPerfil(req, res, 'modificarEMailPerfil');
})*/
rutaPerfil.post('/modificarInteresesPerfil', manejadorDeRutasLogin.verificarToken, manejadorRutaPerfil.modificarInteresesPerfil)/*(req, res) => {
        manejadorRutaPerfil(req, res, 'modificarInteresesPerfil');
  })*/
rutaPerfil.post('/modificarAntecedentesPerfil', manejadorDeRutasLogin.verificarToken,manejadorRutaPerfil.modificarAntecedentesPerfil) /*(req, res) => {
       manejadorRutaPerfil(req, res, 'modificarAntecedentesPerfil');
})*/

// Ruta para subir imagen
/*rutaPerfil.post('/subirImagenPerfil', upload.single('imagen'), async (req, res) => {
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
});*/

export { rutaPerfil };
