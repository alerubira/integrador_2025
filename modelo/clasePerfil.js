import e from "express";
import { Persona } from "./clasePersona.js";
class Perfil extends Persona{
    constructor(idPerfil,nombrePerfil,activoPerfil,idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        super(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona)
        this.idPerfil=idPerfil;
        this.nombrePerfil=nombrePerfil;
        this.activoPerfil=activoPerfil;
    }
    // Método para mostrar la información del usuario
    static async alta(per) {
       return await PerfilData.altaPerfil(per);
     }
    static async consulta(){
        return await PerfilData.consultaPerfil();
    } 
    static async consultaPorId(id){
        return await PerfilData.consultaPerfilPorId(id);
    }
}
export{Perfil};