import { genSalt, hash as _hash, compare } from 'bcrypt';
import { crearLogin } from './loginData';


class Login {
    constructor(idLogin,idProfecional,usuario, clave,tipoAutorizacion,instancia,activoLogin) {
       
        this.idLogin=idLogin;
        this.idProfecional=idProfecional;
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
            await crearLogin(log);
            
     }
     //realizar todos lo metodos,consulta,modificar clave,baja,hacer loginData
}

// Función para hashear una contraseña
async function crearHash(hashear) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await genSalt(saltRounds);
    const hash = await _hash(hashear, salt);
    return hash;
}

// Función para verificar una contraseña
async function verificarHash(password, hashedPassword) {
    
    const match = await compare(password, hashedPassword);
    return match; // Devuelve true si la contraseña coincide, de lo contrario false
}

export{verificarHash,Login};