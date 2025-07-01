//import e from "express";
import { Persona } from "./clasePersona.js";
import { PerfilData } from "../modelo/perfilData.js";
class Perfil extends Persona{
    constructor(idPerfil,idPersona,intereses,antecedentes,eMail,imgPerfil,activoPerfil,nombrePerfil,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        super(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona)
        this.idPerfil=idPerfil;
        this.activoPerfil=activoPerfil;
        this.intereses=intereses;
        this.antecedentes=antecedentes; 
        this.eMail=eMail;
        this.imgPerfil=imgPerfil;
        this.nombrePerfil=nombrePerfil;
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
     static async modificarActivoPerfil(perf){
        if(perf.activoPerfil===1){
            perf.activoPerfil=0;
        }else{
            perf.activoPerfil=1;
        }
        return await PerfilData.modificarActivoPerfil(perf)
    }
    static async modificarActivoPorId(id){
        return await PerfilData.modificarActivoPorId(id);
    }
    static async modificarImagenPorIdPerfil(id,img){
        return await PerfilData.modificarImagenPorIdPerfil(id,img);
    }
    static async modificarEMailPorIdPerfil(id,email){
        return await PerfilData.modificarEMailPorIdPerfil(id,email);
    }
    static async modificarInteresesPorIdPerfil(id,intereses){
        return await PerfilData.modificarInteresesPorIdPerfil(id,intereses);
    }
    static async modificarAntecedentesPorIdPerfil(id,antecedentes){
        return await PerfilData.modificarAntecedentesPorIdPerfil(id,antecedentes);
    }
    static async buscarPerfilPorApellido(frac){
        return await PerfilData.buscarPerfilPorApellido(frac);
    }
    static async buscarPerfilSeguidoresPorApellido(frac,idPerf){
        return await PerfilData.buscarPerfilSegidoresrPorApellido(frac,idPerf);
    }
    static async buscarActivoPorIdPerfil(id){
        return await PerfilData.buscarActivoPoIdPerfil(id);
    }
}
export{Perfil};