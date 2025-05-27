import express from 'express';
import { parametros } from './parametros.js';
import  manejadordeRutasLogin from './controlador/manejadorDeRutasLogin.js';
//import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
//import { Login } from './modelo/claseLogin';
const rutaLogin = express.Router();
let encabezado;
rutaLogin.post('/crearLogin',manejadordeRutasLogin.verificarToken,manejadordeRutasLogin.crearLogin)/*verificarToken,(req,res)=>{
    manejadorLogin(req,res,'crearLogin');
  })*/
rutaLogin.post('/verificarLogin',manejadordeRutasLogin.verificarLogin)/*(req,res) =>{
   manejadorLogin(req,res,'verificarLogin');
  });*/
rutaLogin.post('/modificarLogin',manejadordeRutasLogin.modificarLogin)/*(req,res)=>{
    manejadorLogin(req,res,'modificarLogin');
    }) ;*/
rutaLogin.post('/recuperarLogin',manejadordeRutasLogin.verificarToken,manejadordeRutasLogin.recuperarLogin)/*verificarToken,(req,res)=>{
    manejadorLogin(req,res,'recuperarLogin');
    })  ;*/
rutaLogin.post('/enviarMail',manejadordeRutasLogin.enviarMail)/*(req,res)=>{
    manejadorLogin(req,res,'enviarMail');
    });*/

export { rutaLogin };