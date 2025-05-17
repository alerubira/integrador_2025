import {  consulta1} from "./conexxionBD.js";
let query;
class LoginUsuarioData{
  static async  altaLogin(log){
    
    query= 'INSERT INTO `login_usuario`(`id_perfil`, `usuario_login`, `clave_login_usuario`, `clave_login_provisoria_usuario`, `activo_login_usuario`) VALUES (?,?,?,?,?)';
   return await consulta1(query,log.idPerfil,log.usuarioLogin,log.claveLoginUsuario,null,true);
}
static async  buscarLoginPorUsuario(usuario){
  query=  'SELECT * FROM `login_usuario` WHERE usuario_login = ?';
    return await consulta1(query,usuario);
  }
 /*static async buscarActivosPorUsuario(usuario){
    query=  'CALL buscarActivosPorUsuario(?);';
    return await consulta1(query,usuario);
  } */
 static async  modificarClaveLogin(log){
   query = "UPDATE `login_usuario` SET `clave_login`=? WHERE id_login_usuario=?";
    return await consulta1(query,log.claveLoginUsuario,log.idLoginUsuario);
   }
static async  modificarClaveProvisoriaLogin(log){
  query = "UPDATE `login_usuario` SET `clave_login_provisoria_usuario`=? WHERE id_login_usuario=?";
  return await consulta1(query,log.claveLoginProvisoriaUsuario,log.idLoginUsuario);
   }   
static async modificarActivoLogin(log){
  query = "UPDATE `login_usuario` SET `activo_login_usuario`=? WHERE id_login_usuario=?";
  return await consulta1(query,log.activoLoginUsuario,log.idLoginUsuario);
   }
static async borrarClaveProvisoriaLogin(log){
  query = "UPDATE `login_usuario` SET `clave_login_provisoria_usuario`=null WHERE id_login_usuario=?";
  return await consulta1(query,log.idLogin);
   }   
  }
export { LoginUsuarioData };  