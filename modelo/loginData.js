import { pool , consulta1} from "./conexxionBD.js";
import { Login } from "./loginn.js";
let logins=[];
let query;

async function buscarLoginPorUsuario(usuario){
let query=  'SELECT * FROM `login` WHERE usuario_login = ?';
  let result=await consulta1(query,usuario);
  return result;
}
async function crearLogin(uC){
    
    query= 'INSERT INTO `login`(`id_profecional`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia`,`activo_login`) VALUES (?,?,?,?,?,?)';
   return await consulta1(query,uC.idProfecional,uC.login,clave,uC.tipoAutorizacion,1,true);
}
async function modificarLogin(l){
    const query = "UPDATE `login` SET `clave_login`=?, `instancia`=?,`palabra_clave`=? WHERE id_login=?";
  //  const values = [l.clave,l.instancia, 6];
    
let result=await consulta1(query,l.clave,l.instancia,l.palabraClave,l.idLogin);
return result;
}
export{logins,buscarLoginPorUsuario,modificarLogin,crearLogin};