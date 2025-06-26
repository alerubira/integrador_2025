import {  hash as _hash, compare } from 'bcrypt';
//import { crearHash } from '../utils/crearHash.js';
import { LoginData } from './loginData.js';

class Login {
    constructor(idLogin,idProfesional,idPerfil,usuario, clave,tipoAutorizacion,instancia,activoLogin,claveProvisoria) {
       
        this.idLogin=idLogin;
        this.idProfesional=idProfesional;
        this.idPerfil=idPerfil;
        this.usuario=usuario;
        this.clave=clave;
        this.tipoAutorizacion=tipoAutorizacion;
        this.instancia=instancia;
        this.activoLogin=activoLogin;
        this.claveProvisoria=claveProvisoria;
    }
        // Método para alta de login
    static async alta(log) {
            let clave=await Login.crearHash(log.clave);
            log.clave=clave;
           return await LoginData.altaLogin(log);
         }
    async modificarActivo(){
        this.activoLogin = !this.activoLogin;
        return await LoginData.modificarActivoLogin(this)
    } 
    static async consultaPorUsuario(usuario){
      return await  LoginData.buscarLoginPorUsuario(usuario)
    } 
    static async consultaActivosPorUsuario(usuario){
      return await  LoginData.buscarActivosPorUsuario(usuario)
    }


    async modificarClave(){
        let clave=await Login.crearHash(this.clave);
        this.clave=clave;
        this.instancia=this.instancia +1;
        return await LoginData.modificarClaveLogin(this)
    }
    async modificarClaveProvisoria(){
        let clave=await Login.crearHash(this.claveProvisoria);
        this.claveProvisoria=clave;
        return await LoginData.modificarClaveProvisoriaLogin(this)
    }
    async borrarClaveProvisoria(){
        this.claveProvisoria=null;
        return await LoginData.borrarClaveProvisoriaLogin(this)
    }
    static async crearHash(password) {
        // Genera un hash de la contraseña
        const saltRounds = 10; // Número de rondas de sal
        const hashedPassword = await _hash(password, saltRounds);
        return hashedPassword; // Devuelve el hash generado
    }
    static async  verificarHash(password, hashedPassword) {
    
        const match = await compare(password, hashedPassword);
        return match; // Devuelve true si la contraseña coincide, de lo contrario false
    }
}



// Función para verificar una contraseña


export{Login};