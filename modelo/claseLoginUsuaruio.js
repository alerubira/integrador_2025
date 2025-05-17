import {  hash as _hash, compare } from 'bcrypt';
import { crearHash } from '../utils/crearHash.js';
import { LoginUsuarioData } from './loginUsuarioData.js';
class LoginUsuario {
    constructor(idLoginUsuario,idPerfil,usuarioLogin, claveLoginUsuario,claveLoginProvisoriaUsuario,activoLoginUsuario) {
       
        this.idLoginUsuario=idLoginUsuario;
        this.idPerfil=idPerfil;
        this.usuarioLogin=usuarioLogin;
        this.claveLoginUsuario=claveLoginUsuario;
        this.claveLoginProvisoriaUsuario=claveLoginProvisoriaUsuario;
        this.activoLoginUsuario=activoLoginUsuario;
    }
        // Método para alta de login
    static async alta(log) {
            let clave=await crearHash(log.claveLoginUsuario);
            log.claveLoginUsuario=clave;
           return await LoginUsuarioData.altaLogin(log);
         }
    async modificarActivo(){
        this.activoLogin = !this.activoLogin;
        return await LoginUsuarioData.modificarActivoLogin(this)
    } 
    static async consultaPorUsuario(usuario){
      return await  LoginUsuarioData.buscarLoginPorUsuario(usuario)
    } 
    /*static async consultaActivosPorUsuario(usuario){
      return await  LoginData.buscarActivosPorUsuario(usuario)
    }*/


    async modificarClaveUsuario(){
        let clave=await crearHash(this.claveUsuario);
        this.claveUsuario=clave;
        return await LoginUsuarioData.modificarClaveLogin(this)
    }
    async modificarClaveProvisoria(){
        let clave=await crearHash(this.claveProvisoria);
        this.claveProvisoria=clave;
        return await LoginUsuarioData.modificarClaveProvisoriaLogin(this)
    }
    async borrarClaveProvisoria(){
        this.claveProvisoria=null;
        return await LoginUsuarioData.borrarClaveProvisoriaLogin(this)
    }
    static async  verificarHash(password, hashedPassword) {
    
        const match = await compare(password, hashedPassword);
        return match; // Devuelve true si la contraseña coincide, de lo contrario false
    }
}
export { LoginUsuario };

