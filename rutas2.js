import express from 'express';
import manejadorRutaSecundaria  from './controlador/manejadorRutaSecundaria.js';
import manejadorRutaLogin from './controlador/manejadorDeRutasLogin.js';
const ruta2 = express.Router();

ruta2.get('/secundaria',manejadorRutaSecundaria.ingresar) 
ruta2.post('/crearProfesion',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.crearProfesion)   
ruta2.get('/buscarProfesiones',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.buscarProfesiones)
ruta2.post('/modificarEstadoProfesion',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.buscarProfesiones)
ruta2.post('/modificarNombreProfesion',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarNombreProfesion)
ruta2.get('/buscarProfesionales',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.buscarProfesionales)

ruta2.post('/crearProfesional',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.crearProfesional)
ruta2.post('/modificarEstadoPersona',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarEstadoPersona) 
ruta2.post('/modificarEstadoProfesional',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarEstadoProfesional) 
ruta2.post('/modificarProfesionProfesional',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarProfesionProfesional)
ruta2.post('/modificarEMailProfesional',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarEmailProfesional)
ruta2.post('/modificarNombrePersona',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarNombrePersona)
ruta2.post('/modificarApellidoPersona',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarApellidoPersona)
ruta2.post('/modificarDniPersona',manejadorRutaLogin.verificarToken,manejadorRutaSecundaria.modificarDniPersona)


export{ruta2};  