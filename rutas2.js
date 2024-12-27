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


export{ruta2};  