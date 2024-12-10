import express from 'express';
import { manejadorSecundaria } from './controlador/manejadorRutaSecundaria.js';
const ruta2 = express.Router();

ruta2.get('/secundaria',(req,res)=>{
    manejadorSecundaria(req,res,'ingresar');
    
  }) 
ruta2.get('/buscarProfesiones',(req,res)=>{
    manejadorSecundaria(req,res,'buscarProfesiones');
})  
export{ruta2};  