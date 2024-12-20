import {  consulta1} from "./conexxionBD.js";
let query;
class LoginData{
  static async  altaLogin(log){
    
    query= 'INSERT INTO `login`(`id_profesional`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia_login`,`activo_login`) VALUES (?,?,?,?,?,?)';
   return await consulta1(query,log.idProfesional,log.usuario,log.clave,log.tipoAutorizacion,1,true);
}
static async  buscarLoginPorUsuario(usuario){
  query=  'SELECT * FROM `login` WHERE usuario_login = ?';
    return await consulta1(query,usuario);
  }
 static async  modificarClaveLogin(log){
   query = "UPDATE `login` SET `clave_login`=?, `instancia_login`=? WHERE id_login=?";
    return await consulta1(query,log.clave,log.instancia,log.idLogin);
   }
static async modificarActivoLogin(log){
  query = "UPDATE `login` SET `activo_login`=? WHERE id_login=?";
  return await consulta1(query,log.activoLogin,log.idLogin);
   }
  }



export{LoginData};