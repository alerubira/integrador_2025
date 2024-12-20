import { genSalt, hash as _hash, compare } from 'bcrypt';
import { LoginData } from './loginData.js';

class Login {
    constructor(idLogin,idProfesional,usuario, clave,tipoAutorizacion,instancia,activoLogin) {
       
        this.idLogin=idLogin;
        this.idProfesional=idProfesional;
        this.usuario=usuario;
        this.clave=clave;
        this.tipoAutorizacion=tipoAutorizacion;
        this.instancia=instancia;
        this.activoLogin=activoLogin;
    }
        // Método para alta de login
    static async alta(log) {
            let clave=await crearHash(log.clave);
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
    async modificarClave(){
        let clave=await crearHash(this.clave);
        this.clave=clave;
        this.instancia=this.instancia +1;
        return await LoginData.modificarClaveLogin(this)
    }
    static async  verificarHash(password, hashedPassword) {
    
        const match = await compare(password, hashedPassword);
        return match; // Devuelve true si la contraseña coincide, de lo contrario false
    }
}

// Función para hashear una contraseña
async function crearHash(hashear) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await genSalt(saltRounds);
    const hash = await _hash(hashear, salt);
    return hash;
}

// Función para verificar una contraseña


export{Login};