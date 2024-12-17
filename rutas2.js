import express from 'express';
import { manejadorSecundaria } from './controlador/manejadorRutaSecundaria.js';
const ruta2 = express.Router();

ruta2.get('/secundaria',(req,res)=>{
    manejadorSecundaria(req,res,'ingresar');
    
  }) 
ruta2.get('/buscarProfesiones',(req,res)=>{
    manejadorSecundaria(req,res,'buscarProfesiones');
}) 
ruta2.get('/buscarProfesionales',(req,res)=>{
  manejadorSecundaria(req,res,'buscarProfesionales');
})
ruta2.post('/crearProfesion',(req,res)=>{
  manejadorSecundaria(req,res,'crearProfesion');
}) 
ruta2.post('/crearProfesional',(req,res)=>{
  manejadorSecundaria(req,res,'crearProfesional');
})

export{ruta2};  