import { verificarYup } from './verificaryup.js';
import { Login } from '../modelo/claseLogin.js';
import { jwtSecret } from '../config.js';
import jwt from 'jsonwebtoken';

import { retornarError, retornarExito } from "./funsionesControlador.js";
let object;
let aux;
async function manejadorLogin(req,res,objeto){
  try {
    
    switch (objeto) {
      case 'crearLogin':
            object=req.body;
            if(object.tipoAutorizacion!=1&&object.tipoAutorizacion!=2&&object.tipoAutorizacion!=3){
                return retornarError(res,'El tipo de autorizacion no corresponde');
            }
            aux=await existeBd(object.idProfesional,'profesional','id_profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite el Profesional :${aux}`)}
            if(!aux){return retornarError(res,'El Profesional no existe')}
            aux=await verificarYup(object,'login');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await Login.alta(object);
            if(aux instanceof Error){return retornarError(res,`Error al crear y guardar Login:${aux}`)}
            return retornarExito(res,"Login generado y guardado con exito");
            break;     
      case 'verificarLogin':
        object=req.body;
         aux=await verificarYup(object,'login');
         if(aux.errors){
          return  retornarError(res,`Error al verificar la tipologia del usuario:${aux.errors}`)
         }
        let l=await Login.consultaPorUsuario(object.usuario);
         if(l instanceof Error){return retornarError(res,`Error al buscar el Login:${l}`)}
          if(l.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
          aux=await Login.verificarHash(object.clave,l[0].clave_login);
          //verificar si el login esta activo
         if(!l[0].activo_login){return retornarError(res,'El Login no esta activo')}
         if(!aux) {return retornarError(res,"Clave o Usuario Incorrecta")}
          let login=new Login(l[0].id_login,l[0].id_profesional,l[0].usuario_login,l[0].clave_login,l[0].tipo_autorizacion,l[0].instancia_login,l[0].activo_login)    
          if(login.instancia===1){
                return res.status(200).json({
            
                  message: 'Login nuevo , modificar login',
                  codigoPersonalizado: 801
                }); 
               // return res.render('vistaPrincipal',{encabezado,instancia:true})
              }
              if(login.tipoAutorizacion===3||login.tipoAutorizacion===2){
                //generar token
                 // Datos que quieres almacenar en el token
                 const payload = {
                  username: login.usuario,
                  tipoAutorizacion: login.tipoAutorizacion, // Agregar tipo de autorización al payload
                  idSolicitante:login.idProfesional
                };// Genera el token
                const token = jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
                // Devuelve el token al cliente
              return  res.json({ token: token ,
                tipoAutorizacion: login.tipoAutorizacion, // Agregar tipo de autorización al payload});
                idSolicitante:login.idProfesional
               //return res.redirect('/acceso');
              })}
              
           
        break;
      case 'modificarLogin':
       object=req.body;
       if(object.claveN!==object.claveN2){
        return retornarError(res,"La Confirmacion de la Clave debe ser igual a la Clave Nueva")
       }
       let lo=await Login.consultaPorUsuario(object.usuario);
       if(lo instanceof Error){return retornarError(res,`Error al buscar el Login:${lo}`)}
        if(lo.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
        if(!lo[0].activo_login){return retornarError(res,'El Login no esta activo')}
        aux=await Login.verificarHash(object.clave,lo[0].clave_login);
       if(!aux) {return retornarError(res,"Clave o Usuario Incorrecta")}
    
        let log={usuario:object.usuario,clave:object.claveN};
        aux=await verificarYup(log,'login');
         if(aux.errors){
          return retornarError(res,`Error en la tipologia del Login:${aux.errors}`)
         }
         let logi=new Login(lo[0].id_login,lo[0].id_profesional,lo[0].usuario_login,object.claveN,lo[0].tipo_autorizacion,lo[0].instancia_login,lo[0].activo_login);
        
         aux= await logi.modificarClave();
         if(aux instanceof Error){return retornarError(res,`Error al modificar el Login ${aux}`)}
      
          return retornarExito(res,"El Login fue modificado con exito");
         
         
        break;  
      case 'recuperarLogin':
        aux=await verificar(object,'usuarioPalabra');
        if(aux.errors){
          return  retornarError(res,`Error al verificar la tipologia del Usuario y la Palabra Clave:${aux.errors}`);
         }
         if(object.clave6!==object.clave7){return retornarError(res,"La confirmacion de la Clave es distinta a la clave Nueva")}
        login=await buscarLoginPorUsuario(object.usuario5);
        if(login instanceof Error){return retornarError(res,`Error al buscar el Usuario:${login}`)}
        if(login.length===1){
          l=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,login[0].clave_login,login[0].tipo_autorizacion,login[0].instancia+1,login[0].palabra_clave);
       }else{
        return retornarError(res,"El Usuario no se encuentra Registrado");
       }
        aux=await verificarHash(object.palabraClave,l.palabraClave)
         if(aux){
          let c=await crearHash(object.clave6);
          let l1=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,c,login[0].tipo_autorizacion,login[0].instancia+1,login[0].palabra_clave);
          let result1=await modificarLogin(l1);
          if(result1 instanceof Error){return retornarError(`Error al modificar el Login:${result1}`)}
          if(result1.affectedRows===1){
            return res.send(result1);          }
         }else{
          return retornarError(res,"La palabra clave no corresponde al Usuario");
         }
        break;  
      
      default:
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Login:${error}`)
}
}
// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};
const verifyToken = (token, callback) => {
  if (!token) {
    return callback({ status: 403, message: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return callback({ status: 401, message: 'Token inválido' });
    }

    callback(null, decoded);
  });
};

export{manejadorLogin ,verifyToken,verificarToken};
 
/*function verificarProfecional(res,req,logins,encabezado){
  let loginEncontrado = logins.find(login => 
    login.usuarioLogin === req.idUsuario && login.claveUsuario === req.idClave
  );
  if(loginEncontrado){
    buscarMID(loginEncontrado.idMedico, function(result) {
      // Aquí puedes manejar los resultados de la consulta
     //console.log(result);
       
        
          //console.log(profecional);
          traerProfecionl(result);
          // Redirigir al usuario al endpoint '/recetas'
        return res.redirect('/recetas');
  });
}else{
  let alerta=true;
return res.render('vistaPrincipal',{encabezado,alerta})
}
}
 /*buscarMID(loginEncontrado.idMedico, function(result) {
  // Aquí puedes manejar los resultados de la consulta
 //console.log(result);
   
    if (result) {
      //console.log(profecional);
      traerProfecionl(result);
      // Redirigir al usuario al endpoint '/recetas'
    return res.redirect('/recetas');
    }else{
      let alerta=true;
    return res.render('vistaPrincipal',{encabezado,alerta})
    }
});

}*/
/*function crearProfecional(req,res,mensajeExito){
  mensajeExito="";
  const profecionalCreado=req.body;
   //mensajeExito=agregarMedico(profecionalCreado);
   //console.log(profecionalCreado);

   //res.redirect("/medicos");
   agregarMedico(profecionalCreado, (error, resultado) => {
    if (error) {
        // Maneja el error aquí
        console.error(error);
    } else {
        // Maneja el resultado aquí
       // console.log(resultado);
        mensajeExito=resultado;
        // Puedes redirigir después de capturar la respuesta
        res.redirect("/medicos");
    }
});
}*/
/*async function buscarPacientes(req,res){
  try {
    let caracteres = req.body; 
   // console.log(caracteres);
    let pac = await buscarPacienteDni(caracteres);
   // console.log(pac);
    res.send(pac);
} catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error interno del servidor');
}

}
async function busacrObraSocialPaciente(req,res){
  try {
    let caracteres = req.body; 
   // console.log(`idPaciente en ruta ${caracteres}`);
   // console.log(caracteres);
    let obra = await buscarOSIdPaciente(caracteres);
   // console.log(pac);
    res.send(obra);
} catch (error) {
    console.error('Error al buscar obre sociales:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function traerObras(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let obras = await todasObras(caracteres);
   // console.log(pac);
    res.send(obras);
} catch (error) {
    console.error('Error al buscar obras sociales:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function sexoTodos(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let sexos= await todosSexo(caracteres);
   // console.log(pac);
    res.send(sexos);
} catch (error) {
    console.error('Error al buscar en la tabla sexo:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function crearPaciente(req,res){
  try {
    
    const paciente = req.body; 
    //console.log(`paciente en el body ${paciente}`);
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
     const pacienteCreado=await createPaciente(paciente);
   // console.log(pac);
    res.send(pacienteCreado);
} catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function nombresGenericos(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let nombresGenericos= await todoGenericos(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(nombresGenericos);
} catch (error) {
    console.error('Error al buscar en la tabla sexo:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function administraciones(req,res){
  try {
    let caracteres = req.body; 
   // console.log(`caracter en manejador de rutas ruta ${caracteres}`);
   // console.log(caracteres);
    let administraciones= await todasAdministracion(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(administraciones);
} catch (error) {
    console.error('Error al buscar en la tabla administracion:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function traerPrestaciones(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let prestacionesTodas= await todasPrestaciones(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(prestacionesTodas);
} catch (error) {
    console.error('Error al buscar en la tabla prestaciones:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function todosLados(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let lados= await ladoTodos(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(lados);
} catch (error) {
    console.error('Error al buscar en la tabla lado:', error);
    res.status(500).send('Error interno del servidor');
}
}*/
/*async function traerTodo(req,res,tabla){
  try {
    let aux;
    let caracteres = req.body; 
    switch (tabla) {
      case 'profecion':
         aux= await profecionesTodas(caracteres);
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
        break;
      default:
        break;
    }
    
   
    res.send(aux);
} catch (error) {
    console.error(`Error al buscar en la tabla ${tabla}`, error);
    res.status(500).send('Error interno del servidor');
}
}
async function crear(req,res,objeto){
 // console.log(objeto);
  try {
    
    let aux;
    let objet = req.body; 
    switch (objeto) {
      case 'Medico':
         aux= await verificarMedico(objet);
          if(!aux.err){
          aux=await crearMedico(objet);
          return aux;
         }
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
        break;
      default:
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al crear el ${objeto}`, error);
    res.status(500).send('Error interno del servidor');
}
}*/