import express from 'express';
import { parametros } from './parametros.js';
import { manejadorLogin } from './controlador/manejadorDeRutasLogin.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
//import { Login } from './modelo/claseLogin';
const ruta1 = express.Router();
let encabezado;
ruta1.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
     res.render('vistaPrincipal',{encabezado,parametros});
    
   });
ruta1.post('/crearLogin',verificarToken,(req,res)=>{
    manejadorLogin(req,res,'crearLogin');
  })
ruta1.post('/verificarLogin',(req,res) =>{
   manejadorLogin(req,res,'verificarLogin');
  });
ruta1.post('/modificarLogin',(req,res)=>{
    manejadorLogin(req,res,'modificarLogin');
    }) ;
ruta1.post('/recuperarLogin',verificarToken,(req,res)=>{
    manejadorLogin(req,res,'recuperarLogin');
    })  ;
ruta1.post('/enviarMail',(req,res)=>{
    manejadorLogin(req,res,'enviarMail');
    });

//
ruta1.get('/acceso',  (req, res) => {
  //manejadorAcceso(req,res);
    //encabezado = "Bienvenido a Accesos";
  //res.render('vistaAcceso', { encabezado });
  manejadorAcceso(req,res);
 });
export{ruta1}; 