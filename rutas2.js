import express from 'express';
import { manejadorSecundaria } from './controlador/manejadorRutaSecundaria.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
const ruta2 = express.Router();

ruta2.get('/secundaria',(req,res)=>{
    manejadorSecundaria(req,res,'ingresar');
    
  }) 
ruta2.post('/crearProfesion',verificarToken,(req,res)=>{
    manejadorSecundaria(req,res,'crearProfesion');
  })   
ruta2.get('/buscarProfesiones',verificarToken,(req,res)=>{
    manejadorSecundaria(req,res,'buscarProfesiones');
})
ruta2.post('/modificarEstadoProfesion',verificarToken,(req,res)=>{
    manejadorSecundaria(req,res,'modificarEstadoProfesion');
})
ruta2.post('/modificarNombreProfesion',verificarToken,(req,res)=>{
    manejadorSecundaria(req,res,'modificarNombreProfesion');
})
ruta2.get('/buscarProfesionales',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'buscarProfesionales');
})

ruta2.post('/crearProfesional',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'crearProfesional');
})
ruta2.post('/modificarEstadoPersona',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarEstadoPersona');
}) 
ruta2.post('/modificarEstadoProfesional',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarEstadoProfesional');
}) 
ruta2.post('/modificarProfesionProfesional',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarProfesionProfesional');
})
ruta2.post('/modificarEMailProfesional',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarEMailProfesional');
})
ruta2.post('/modificarNombrePersona',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarNombrePersona');
})
ruta2.post('/modificarApellidoPersona',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarApellidoPersona');
})
ruta2.post('/modificarDniPersona',verificarToken,(req,res)=>{
  manejadorSecundaria(req,res,'modificarDniPersona');
})


export{ruta2};  