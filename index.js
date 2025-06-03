import express, { json } from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
//import { dirname } from 'path';
import bodyParser from'body-parser';
import {ruta1} from './rutas1.js';
import { ruta2 } from './rutas2.js';
import { rutaLogin } from './rutaLogin.js';
import { rutaPerfil } from './rutaPerfil.js';
import { rutaCarpetas } from './rutaCarpetas.js';
import { rutaImagen } from './rutaImagen.js';
const app = express();

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticOptions = {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
};

const port = 3000;
app.use(express.static(path.join(__dirname, 'estatica'), staticOptions));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, '..','estatica')));
// Configuración del directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'estatica')));
// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..','vistas'));
app.set('views', path.join(__dirname, 'vistas'));
app.use(express.json());
// Definir una ruta para renderizar una vista Pug
// Definir tus rutas aquí
app.use('/', ruta1);
app.use('/',ruta2);
app.use('/',rutaLogin);
app.use('/crearLogin',rutaLogin);
app.use('/modificarLogin',rutaLogin);
app.use('/enviarMail',rutaLogin);
app.use('/buscarProfesiones',ruta2);
app.use('/modificarEstadoProfesion',ruta2);
app.use('/modificarNombreProfesion',ruta2);
app.use('/buscarProfesionales',ruta2);
app.use('/crearProfesion',ruta2);
app.use('/crearProfesional',ruta2);
app.use('/modificarEstadoPersona',ruta2);
app.use('/modificarEstadoProfesional',ruta2);
app.use('/modificarProfesionProfesional',ruta2);
app.use('/modificarEMailProfesional',ruta2);
app.use('/modificarNombrePersona',ruta2);
app.use('/modificarApellidoPersona',ruta2);
app.use('/modificarDniPersona',ruta2);
app.use('/',rutaPerfil);
app.use('/paginaPersonal',rutaPerfil);
app.use('/subirImagenPerfil',rutaPerfil);
app.use('/modificarEMailPerfil',rutaPerfil);
app.use('/modificarInteresesPerfil',rutaPerfil);
app.use('/modificarAntecedentesPerfil',rutaPerfil);
app.use('/', rutaCarpetas);
app.use('/crearAlbum',rutaCarpetas);
app.use('/buscarAlbumesPersonalesPorId',rutaCarpetas);
app.use('/modificarTituloAlbum',rutaCarpetas);
app.use('/modificarTagsAlbum', rutaCarpetas);
app.use('/modificarActivoAlbumPersonal', rutaCarpetas);
app.use('/', rutaImagen);
app.use('/buscarImagenesPorIdAlbumPersonal', rutaImagen);
app.use('/modificarTituloImagenPorId',rutaImagen);
app.use('/modificarCaptionImagenPorId',rutaImagen);
 // Iniciar el servidor
 app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
