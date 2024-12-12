import { Persona } from "./clasePersona.js";
import { ProfesionalData } from "./profesionalData.js";
class Profesional extends Persona{
    constructor(idProfesional,idProfesion,activoProfesional,idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        super(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona)
        this.idProfesional=idProfesional;
        this.idProfesion=idProfesion;
        this.activoProfesional=activoProfesional;
        }
        // Método para mostrar la información del usuario
    static async alta(prof) {
       return await ProfesionalData.alta(prof);
     }
    static async consulta(){
        return await ProfesionalData.consulta();
    } 
    async modificarActivo(){
        this.activoPersona = !this.activoPersona;
        return await ProfesionalData.modificarActivoProfesional(this)
    }
    async modificarProfesion(){
        return await ProfesionalData.modificarProfesionProfesional(this);
    }
}
export{Profesional}