import express from 'express';
import { parametros } from './parametros.js';
//import  manejadordeRutasLogin from './controlador/manejadorDeRutasLogin.js';
//import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
//import { Login } from './modelo/claseLogin';
const ruta1 = express.Router();
let encabezado;
ruta1.get('/', (req, res) => {
    encabezado="Artesanos.com";
     res.render('vistaPrincipalGeneral',{encabezado,parametros});
    
   });
ruta1.get('/principal', (req, res) => {
    encabezado="Artesanos.com-Ingreso";
     res.render('vistaPrincipal',{encabezado,parametros});
    
   });
ruta1.get('/registro', (req, res) => {
    encabezado="Artesanos.com-Registro";
     res.render('vistaRegistro',{encabezado,parametros});
    
   });   
ruta1.get('/acceso',  (req, res) => {
  //manejadorAcceso(req,res);
    //encabezado = "Bienvenido a Accesos";
  //res.render('vistaAcceso', { encabezado });
  manejadorAcceso(req,res);
 });   


export{ruta1}; 