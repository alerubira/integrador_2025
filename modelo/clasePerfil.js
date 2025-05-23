//import e from "express";
import { Persona } from "./clasePersona.js";
import { PerfilData } from "../modelo/PerfilData.js";
class Perfil extends Persona{
    constructor(idPerfil,idPersona,intereses,antecedentes,eMail,imgPerfil,activoPerfil,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        super(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona)
        this.idPerfil=idPerfil;
        this.activoPerfil=activoPerfil;
        this.intereses=intereses;
        this.antecedentes=antecedentes; 
        this.eMail=eMail;
        this.imgPerfil=imgPerfil;
    }
    // Método para mostrar la información del usuario
    static async alta(per,login) {
       return await PerfilData.altaPerfil(per,login);
     }
    static async consulta(){
        return await PerfilData.consultaPerfil();
    } 
    static async consultaPorId(id){
        return await PerfilData.consultaPerfilPorId(id);
    }
     static async modificarActivoPerfil(){
        this.activoPerfil = !this.activoPerfil;
        return await PerfilData.modificarActivoProfesional(this)
    }
    static async modificarActivoPorId(id){
        return await PerfilData.modificarActivoPorId(id);
    }
}
export{Perfil};