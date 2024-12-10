import { genSalt, hash as _hash, compare } from 'bcrypt';
import { crearLogin } from './loginData';

class UsuarioClave{
    constructor(usuario,clave){
        this.usuario=usuario;
        this.clave=clave;
        }
        // Método para mostrar la información del usuario
    async alta(uC) {
        let clave=await crearHash(uC.clave);
        uC.clave=clave;
        await crearLogin(uC);
        
    }
}
class Login extends UsuarioClave{
    constructor(idLogin,idProfecional,usuario, clave,tipoAutorizacion,instancia,activoLogin) {
        super(usuario,clave);
        this.idLogin=idLogin;
        this.idProfecional=idProfecional;
        this.tipoAutorizacion=tipoAutorizacion;
        this.instancia=instancia;
        this.activoLogin=activoLogin;
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
async function verificarHash(password, hashedPassword) {
    
    const match = await compare(password, hashedPassword);
    return match; // Devuelve true si la contraseña coincide, de lo contrario false
}

export{crearHash,verificarHash,Login,usuarioClave};