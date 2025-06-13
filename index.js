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
import manejadorDeRutasLogin from './controlador/manejadorDeRutasLogin.js';
import { rutaComunicacion } from './rutaComunicacion.js';
import http from 'http';
import { WebSocketServer } from 'ws';
const app = express();
const server = http.createServer(app);
// WebSocket server
const wss = new WebSocketServer({ server });

// Guarda los clientes conectados y su perfil
const clientes = new Map();

wss.on('connection', (ws, req) => {
    // Aquí puedes autenticar y asociar el perfil si tienes token
    ws.on('message', (msg) => {
        // Por ejemplo, el cliente puede enviar su idPerfil al conectar
        try {
            const data = JSON.parse(msg);
            if (data.idPerfil) {
                clientes.set(data.idPerfil, ws);
            }
        } catch {}
    });

    ws.on('close', () => {
        // Elimina el cliente desconectado
        for (const [id, socket] of clientes.entries()) {
            if (socket === ws) clientes.delete(id);
        }
    });
});
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
app.use('/buscarPerfilPorApellido',rutaPerfil);
app.use('/buscarPerfilPorid',rutaPerfil);
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
app.use('/buscarVisibilidad',rutaImagen);
app.use('/modificarVisibilidadImagen',rutaImagen);
app.use('/modificarActiviImagen',rutaImagen);
app.use('/traerImagenesPublicas',rutaImagen);
app.use('/traerImagenesPublicasPublicas',rutaImagen);
app.use('/traerComentariosPorIdImagen',rutaImagen);
app.use('/',rutaComunicacion);
app.use('/buscarNotificaciones',rutaComunicacion);
app.use('/buscarNotificacionesNoLeidas',rutaComunicacion)
app.use('/marcarLeidaNotificacion',rutaComunicacion);
app.use('/aceptarSolicitud',rutaComunicacion);
app.use('/enviarComentario',rutaComunicacion);
app.use('/traerSolicitudPorId',rutaComunicacion);
app.use('/traerComentarioPorId',rutaComunicacion);
app.use('/contestarComentario',rutaComunicacion);
app.use('/traerComentarioContestadoPorId',rutaComunicacion);


 // Iniciar el servidor
 server.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });
// Exporta wss y clientes para usar en otros módulos
export { wss, clientes };