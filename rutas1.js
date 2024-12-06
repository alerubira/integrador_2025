import express from 'express';
const ruta1 = express.Router();
ruta1.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
    let errLogin;
     res.render('vistaPrincipal',{encabezado,errLogin:true});
    
   });
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