import { verificarYup } from './verificaryup.js';
import { Login } from '../modelo/claseLogin.js';
import { Profesional } from '../modelo/claseProfesional.js';
import { Perfil } from '../modelo/clasePerfil.js';
import { jwtSecret } from '../config.js';
import jwt from 'jsonwebtoken';
import {enviarCorreo} from './sendMail.js';
import { existeBd } from '../modelo/conexxionBD.js';

import { retornarError, retornarExito,retornarError400,generarNumeroAleatorio } from "./funsionesControlador.js";
/*let object;
let aux;
let login;*/
/*async function manejadorLogin(req,res,objeto){
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
           login=new Login(l[0].id_login,l[0].id_profesional_perfil,l[0].usuario_login,l[0].clave_login,l[0].tipo_autorizacion,l[0].instancia_login,l[0].activo_login)    
          aux=await Login.verificarHash(object.clave,l[0].clave_login);
          //verificar si el login esta activo
         if(!l[0].activo_login){return retornarError(res,'El Login no esta activo')}
         if(!aux) {return retornarError(res,"Clave o Usuario Incorrecta")}
         if(login.tipoAutorizacion===2||login.tipoAutorizacion==3){
          aux=await Login.consultaActivosPorUsuario(object.usuario);
         if(aux instanceof Error){return retornarError(res,`Error al buscar el Login:${aux}`)} 
          if(!aux[0][0].activo_persona||!aux[0][0].activo_profesional){return retornarError(res,'El Profesional no esta activo')}
         }
        
         
         if(login.tipoAutorizacion===5&&login.instancia===2){
          aux=await Perfil.modificarActivoPorId(login.idProfesionalPerfil);
          if(aux instanceof Error){return retornarError(res,`Error al dar de alta  el Login:${aux}`)}
         }
         if(login.instancia==1&&login.tipoAutorizacion===5){
          return res.status(200).json({
            
                  message: 'Login nuevo , modificar login,Para finalizar el registro',
                  codigoPersonalizado: 802
                }); 
         }

          if(login.instancia===1){
                return res.status(200).json({
            
                  message: 'Login nuevo , modificar login,Para finalizar el registro',
                  codigoPersonalizado: 801
                }); 
               // return res.render('vistaPrincipal',{encabezado,instancia:true})
              }
          
          
              if(login.tipoAutorizacion===3||login.tipoAutorizacion===2||login.tipoAutorizacion===5){ 
                //generar token
                 // Datos que quieres almacenar en el token
                 const payload = {
                  username: login.usuario,
                  tipoAutorizacion: login.tipoAutorizacion, // Agregar tipo de autorización al payload
                  idSolicitante:login.idProfesionalPerfil
                };// Genera el token
                const token = jwt.sign(payload, jwtSecret, { expiresIn: '5h' });
                // Devuelve el token al cliente
              return  res.json({ token: token ,
                tipoAutorizacion: login.tipoAutorizacion, // Agregar tipo de autorización al payload});
                idSolicitante:login.idProfesionalPerfil
               //return res.redirect('/acceso');
              })}
              
           
        break;
      case 'modificarLogin':
       object=req.body;
       if(object.claveN!==object.claveN2){
        return retornarError(res,"La Confirmacion de la Clave debe ser igual a la Clave Nueva")
       }
        login=await Login.consultaPorUsuario(object.usuario);
       if(login instanceof Error){return retornarError(res,`Error al buscar el Login:${login}`)}
        if(login.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
        if(!login[0].activo_login){return retornarError(res,'El Login no esta activo')}
        aux=await Login.verificarHash(object.clave,login[0].clave_login);
       if(!aux) {return retornarError(res,"Clave o Usuario Incorrecta")}
       let log={usuario:object.usuario,clave:object.claveN};
        aux=await verificarYup(log,'login');
         if(aux.errors){ return retornarError(res,`Error en la tipologia del Login:${aux.errors}`)}
         login=new Login(login[0].id_login,login[0].id_profesional_perfil,login[0].usuario_login,object.claveN,login[0].tipo_autorizacion,login[0].instancia_login,login[0].activo_login);
        aux= await login.modificarClave();
         if(aux instanceof Error){return retornarError(res,`Error al modificar el Login ${aux}`)}
         return retornarExito(res,"El Login fue modificado con exito");
         break;  
      case 'recuperarLogin':
        object=req.body; 
        login=new Login(null,null,object.usuario,object.clave,null,null,null,object.claveProvisoria);
        aux=await verificarYup(login,'login');
        if(aux.errors){ return retornarError(res,`Error en la tipologia del Login:${aux.errors}`)}
        let lo=await Login.consultaPorUsuario(login.usuario);
        if(lo instanceof Error){return retornarError(res,`Error al buscar el Login:${lo}`)} 
        if(lo.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
        if(!lo[0].activo_login){return retornarError(res,'El Login no esta activo')}
        aux=await Login.verificarHash(login.claveProvisoria,lo[0].clave_login_provisoria);
        if(!aux) {return retornarError(res,"Clave Provisoria Incorrecta, verificar en su email")}
        login=new Login(lo[0].id_login,lo[0].id_profesional_perfil,lo[0].usuario_login,object.clave,lo[0].tipo_autorizacion,lo[0].instancia_login,lo[0].activo_login,lo[0].clave_login_provisoria);
       
        aux= await login.borrarClaveProvisoria();
        if(aux instanceof Error){return retornarError(res,`Error al borrar la clave provisoria:${aux}`)}
        aux=await login.modificarClave();
        if(aux instanceof Error){return retornarError(res,`Error al modificar la clave:${aux}`)}
        
        return retornarExito(res,"La clave fue modificada con exito");
        break;  
      case 'enviarMail':
        object=req.body;
        let eMail;
        let n=generarNumeroAleatorio();
        aux=await Login.consultaPorUsuario(object.usuario);
        if(aux instanceof Error){return retornarError(res,`Error al buscar el Login:${aux}`)}
        if(aux.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
        let lP=new Login(aux[0].id_login,aux[0].id_profesional_perfil,aux[0].usuario_login,n,aux[0].tipo_autorizacion,aux[0].instancia_login,aux[0].activo_login,n);
        if(lP.tipoAutorizacion===2||lP.tipoAutorizacion==3){
        aux=await Profesional.consultaPorId(lP.idProfesional);
        if(aux instanceof Error){return retornarError(res,`Error al buscar el Profesional:${aux}`)}
        if(aux.length<1){return retornarError(res,"El Profesional no existe")}
         eMail=aux[0][0].e_mail;
        }
        if(lP.tipoAutorizacion===5){
          aux=await Perfil.consultaPorId(lP.idProfesionalPerfil);
          if(aux instanceof Error){return retornarError(res,`Error al buscar el Profesional:${aux}`)}
          if(aux.length<1){return retornarError(res,"El Perfil no existe")}
           eMail=aux[0].e_mail_perfil;
        }
      
        aux=await lP.modificarClaveProvisoria();
         if(aux instanceof Error){return retornarError(res,`Error al modificar la clave provisoria:${aux}`)}
        //const { destinatario, asunto, mensaje } = req.body;
        try {
          const payload = {
            username: lP.usuario,
            tipoAutorizacion: lP.tipoAutorizacion, // Agregar tipo de autorización al payload
          
          };
          const tokenP = jwt.sign(payload,jwtSecret, { expiresIn: '4h' });
          const response = await enviarCorreo(eMail, 'Clave Provisoria', `Su clave provisoria es: ${n} y tiene una duracion de 4 horas`);	
         res.json({ message: `Correo enviado: ${response}`,token:tokenP });
        } catch (error) {
          console.log(`Error al enviar el correo: ${error}`); 
          retornarError(res, `Error al enviar el correo: ${error}`);
        }
       
        break;
      default:
        retornarError(res,`Seleccion no valida en el manejador Login ${objeto}`) 
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Login:${error}`)
}
}*/
// Middleware para verificar el token
export const verificarToken = (req, res, next) => {
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
export const verifyToken = (token, callback) => {
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
export async function crearLogin(req, res) {
    try {
        const object = req.body;
        if (![1, 2, 3].includes(object.tipoAutorizacion)) {
            return retornarError(res, 'El tipo de autorizacion no corresponde');
        }
        let aux = await existeBd(object.idProfesional, 'profesional', 'id_profesional');
        if (aux instanceof Error) return retornarError(res, `Error al verificar si exite el Profesional :${aux}`);
        if (!aux) return retornarError(res, 'El Profesional no existe');
        aux = await verificarYup(object, 'login');
        if (aux instanceof Error) return retornarError(res, `Error al verificar yup:${aux}`);
        aux = await Login.alta(object);
        if (aux instanceof Error) return retornarError(res, `Error al crear y guardar Login:${aux}`);
        return retornarExito(res, "Login generado y guardado con exito");
    } catch (error) {
        console.log( `Error en crearLogin: ${error}`)
        return retornarError(res,);
        
    }
}

export async function verificarLogin(req, res) {
    try {
        const object = req.body;
        
        let aux = await verificarYup(object, 'login');

        if (aux.errors) {
            console.log(`Error al verificar la tipologia del usuario:${aux.errors}`)
            return retornarError400(res );
        }
        let l = await Login.consultaPorUsuario(object.usuario);
        if (l instanceof Error) return retornarError(res, `Error al buscar el Login:${l}`);
        if (l.length < 1) return retornarError400(res);
        let login = new Login(l[0].id_login, l[0].id_profesional,l[0].id_perfil, l[0].usuario_login, l[0].clave_login, l[0].tipo_autorizacion, l[0].instancia_login, l[0].activo_login);
       
        aux = await Login.verificarHash(object.clave, l[0].clave_login);
        if (!l[0].activo_login) return retornarError400(res);
        if (!aux) return retornarError400(res, "Clave o Usuario Incorrecta");
        if (login.tipoAutorizacion === 2 || login.tipoAutorizacion == 3) {
            aux = await Login.consultaActivosPorUsuario(object.usuario);
            if (aux instanceof Error){
              console.log(`Error al buscar el Login:${aux}`);
               return retornarError(res);
            } 
            if (!aux[0][0].activo_persona || !aux[0][0].activo_profesional){
              console.log('El Profesional no esta activo');
              return retornarError400(res);
            } 
        }
        if (login.tipoAutorizacion === 5 && login.instancia === 2) {
            aux = await Perfil.modificarActivoPorId(login.idPerfil);
            if (aux instanceof Error){
              console.log( `Error al dar de alta  el Login:${aux}`)
              return retornarError(res);
              } 
              aux=await login.adelantarInstancia();
              if(aux instanceof Error){
                console.log(`Error al adelantar la intancia del login:${aux}`);
                return retornarError(res);
              }
        }
        if (login.instancia == 1 && login.tipoAutorizacion === 5) {
            return res.status(200).json({
                message: 'Login nuevo , modificar login,Para finalizar el registro',
                codigoPersonalizado: 802
            });
        }
        if (login.instancia === 1) {
            return res.status(200).json({
                message: 'Login nuevo , modificar login,Para finalizar el registro',
                codigoPersonalizado: 801
            });
        }
        if ([3, 2].includes(login.tipoAutorizacion)) {
            const payload = {
                username: login.usuario,
                tipoAutorizacion: login.tipoAutorizacion,
                idSolicitante: login.idProfesional
            };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '5h' });
            return res.json({
                token: token,
                tipoAutorizacion: login.tipoAutorizacion,
                idSolicitante: login.idProfesional
            });
        }
        aux =await Perfil.buscarActivoPorIdPerfil(login.idPerfil);
        if(aux instanceof Error){
          console.log(`Error al buscar el activo Perfil:${aux}`);
          return retornarError(res,)
        }
        if(aux[0].activo_perfil===0){
          console.log('El Perfil no esta activo');
          return retornarError400(res,"El Perfil  esta dado de baja,consulte con administracion");
        }
         if(login.tipoAutorizacion===5){
          const payload = {
                username: login.usuario,
                tipoAutorizacion: login.tipoAutorizacion,
                idSolicitante: login.idPerfil
            };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '5h' });
            return res.json({
                token: token,
                tipoAutorizacion: login.tipoAutorizacion,
                idSolicitante: login.idPerfil
            });
        } 
    } catch (error) {
      console.log( `Error en verificarLogin: ${error}`);
        return retornarError(res);
    }
}

export async function modificarLogin(req, res) {
    try {
        const object = req.body;
        if (object.claveN !== object.claveN2) {
            return retornarError400(res, "La Confirmacion de la Clave debe ser igual a la Clave Nueva");
        }
        let login = await Login.consultaPorUsuario(object.usuario);
        if (login instanceof Error){
          console.log(`Error al buscar el Login:${login}`);
           return retornarError(res);
        } 
        if (login.length < 1){
                return retornarError400(res);
        }
        if (!login[0].activo_login){
               return retornarError400(res);
        } 
        let aux = await Login.verificarHash(object.clave, login[0].clave_login);
        if (!aux) return retornarError400(res, "Clave o Usuario Incorrecta");
        let log = { usuario: object.usuario, clave: object.claveN };
        aux = await verificarYup(log, 'login');
        if (aux.errors) return retornarError400(res);
        login = new Login(login[0].id_login, login[0].id_profesional,login[0].id_perfil, login[0].usuario_login, object.claveN, login[0].tipo_autorizacion, login[0].instancia_login, login[0].activo_login);
        aux = await login.modificarClave();
        if (aux instanceof Error){
          console.log(`Error al modificar el Login ${aux}`);
          return retornarError(res);
        } 
        return retornarExito(res, "El Login fue modificado con exito");
    } catch (error) {
        console.log(`Error en modificarLogin: ${error}`);
        return retornarError(res);
    }
}

export async function recuperarLogin(req, res) {
    try {
        const object = req.body;
        let login = new Login(null, null,null, object.usuario, object.clave, null, null, null, object.claveProvisoria);
        let aux = await verificarYup(login, 'login');
        if (aux.errors){
          console.log(`Error en la tipologia del Login:${aux.errors}`);
           return retornarError400(res);
        } 
        let lo = await Login.consultaPorUsuario(login.usuario);
        if (lo instanceof Error){
          console.log( `Error al buscar el Login:${lo}`);
          return retornarError400(res);
        } 
        if (lo.length < 1){
          return retornarError400(res);
        } 
        if (!lo[0].activo_login){
             return retornarError400(res);
        } 
        aux = await Login.verificarHash(login.claveProvisoria, lo[0].clave_login_provisoria);
        if (!aux){
            return retornarError400(res, "Clave Provisoria Incorrecta, verificar en su email");
        } 
        login = new Login(lo[0].id_login, lo[0].id_profesional,lo[0].id_perfil, lo[0].usuario_login, object.clave, lo[0].tipo_autorizacion, lo[0].instancia_login, lo[0].activo_login, lo[0].clave_login_provisoria);
        aux = await login.borrarClaveProvisoria();
        if (aux instanceof Error){
          console.log(`Error al borrar la clave provisoria:${aux}`);
          return retornarError(res);
        } 
        aux = await login.modificarClave();
        if (aux instanceof Error){
          console.log(`Error al modificar la clave:${aux}`);
          return retornarError(res);
        } 
        return retornarExito(res, "La clave fue modificada con exito");
    } catch (error) {
        console.log( `Error en recuperarLogin: ${error}`)
        return retornarError(res);
    }
}

export async function enviarMail(req, res) {
    try {
        const object = req.body;
        let eMail;
        let n = generarNumeroAleatorio();
        let aux = await Login.consultaPorUsuario(object.usuario);
        if (aux instanceof Error) return retornarError(res, `Error al buscar el Login:${aux}`);
        if (aux.length < 1){
            return retornarError400(res);
        } 
        let lP = new Login(aux[0].id_login, aux[0].id_profesional,aux[0].id_perfil, aux[0].usuario_login, n, aux[0].tipo_autorizacion, aux[0].instancia_login, aux[0].activo_login, n);
        if (lP.tipoAutorizacion === 2 || lP.tipoAutorizacion == 3) {
            aux = await Profesional.consultaPorId(lP.idProfesional);
            if (aux instanceof Error){
              console.log( `Error al buscar el Profesional:${aux}`);
              return retornarError(res);
            } 
            if (aux.length < 1){
               return retornarError400(res);
            } 
            eMail = aux[0][0].e_mail;
        }
        if (lP.tipoAutorizacion === 5) {
            aux = await Perfil.consultaPorId(lP.idPerfil);
            if (aux instanceof Error){
              console.log( `Error al buscar el Profesional:${aux}`);
              return retornarError(res);
            } 
            if (aux.length < 1){
               return retornarError400(res);
            }
            eMail = aux[0].e_mail_perfil;
        }
        aux = await lP.modificarClaveProvisoria();
        if (aux instanceof Error){
          console.log( `Error al modificar la clave provisoria:${aux}`);
          return retornarError(res);
        } 
        const payload = {
            username: lP.usuario,
            tipoAutorizacion: lP.tipoAutorizacion,
        };
        const tokenP = jwt.sign(payload, jwtSecret, { expiresIn: '4h' });
        const response = await enviarCorreo(eMail, 'Clave Provisoria', `Su clave provisoria es: ${n} y tiene una duracion de 4 horas`);
        res.json({ message: `Correo enviado: ${response}`, token: tokenP });
    } catch (error) {
        console.log(`Error en enviarMail: ${error}`)
        return retornarError(res);
    }
}
export default {
    crearLogin,
    verificarLogin,
    modificarLogin,
    recuperarLogin,
    enviarMail,
    verificarToken,
    verifyToken
};
//export{manejadorLogin ,verifyToken,verificarToken};
 
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