import express from 'express';
//import { Login } from './modelo/claseLogin';
const ruta1 = express.Router();
let encabezado;
ruta1.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
    //probar generar un login
    //necesito un profecional y una persona,hacer las calses entidad y data de persona y profecional
     res.render('vistaPrincipal',{encabezado});
    
   });
ruta1.get('/secundaria',(req,res)=>{
  encabezado='pagina secundaria';
  res.render('vistasecundaria',{encabezado});
})   
ruta1.post('/verificarLogin',(req,res) =>{
   manejadorLogin(req,res,'verificarLogin');
  });
ruta1.post('/modificarLogin',(req,res)=>{
    manejadorLogin(req,res,'modificarLogin');
    }) ;
ruta1.post('/recuperarLogin',(req,res)=>{
    manejadorLogin(req,res,'recuperarLogin');
    })  ;
//
ruta1.get('/acceso',  (req, res) => {
  //manejadorAcceso(req,res);
    //encabezado = "Bienvenido a Accesos";
  //res.render('vistaAcceso', { encabezado });
  manejadorAcceso(req,res);
 });
export{ruta1}; 