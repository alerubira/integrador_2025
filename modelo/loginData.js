import {  consulta1} from "./conexxionBD.js";
let query;
class LoginData{
  static async  altaLogin(log){
    query= 'INSERT INTO `login`(`id_profesional`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia_login`,`activo_login`,clave_login_provisoria) VALUES (?,?,?,?,?,?,?)';
   return await consulta1(query,log.idProfesional,log.usuario,log.clave,log.tipoAutorizacion,1,log.activoLogin,log.claveProvisoria);
}
static async  buscarLoginPorUsuario(usuario){
  query=  'SELECT * FROM `login` WHERE usuario_login = ?';
    return await consulta1(query,usuario);
  }
 static async buscarActivosPorUsuario(usuario){
    query=  'CALL buscarActivosPorUsuario(?);';
    return await consulta1(query,usuario);
  } 
 static async  modificarClaveLogin(log){
   query = "UPDATE `login` SET `clave_login`=?, `instancia_login`=? WHERE id_login=?";
    return await consulta1(query,log.clave,log.instancia,log.idLogin);
   }
static async  modificarClaveProvisoriaLogin(log){
  query = "UPDATE `login` SET `clave_login_provisoria`=? WHERE id_login=?";
  return await consulta1(query,log.claveProvisoria,log.idLogin);
   }   
static async modificarActivoLogin(log){
  query = "UPDATE `login` SET `activo_login`=? WHERE id_login=?";
  return await consulta1(query,log.activoLogin,log.idLogin);
   }
static async borrarClaveProvisoriaLogin(log){
  query = "UPDATE `login` SET `clave_login_provisoria`=null WHERE id_login=?";
  return await consulta1(query,log.idLogin);
   } 
 static async adelantarInstancia(log){
              query='UPDATE `login` SET instancia_login=? WHERE id_login=?';
              return await consulta1(query,log.instancia,log.idLogin)
  }
  }
 



export{LoginData};