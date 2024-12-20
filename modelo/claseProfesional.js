import { Persona } from "./clasePersona.js";
import { ProfesionalData } from "./profesionalData.js";
class Profesional extends Persona{
    constructor(idProfesional,idProfesion,nombreProfesion,activoProfesional,idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        super(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona)
        this.idProfesional=idProfesional;
        this.idProfesion=idProfesion;
        this.nombreProfesion=nombreProfesion;
        this.activoProfesional=activoProfesional;
        }
        // Método para mostrar la información del usuario
    static async alta(prof) {
       return await ProfesionalData.altaProfesional(prof);
     }
    static async consulta(){
        return await ProfesionalData.consultaProfesional();
    } 
    static async consultaPorId(id){
        return await ProfesionalData.consultaProfesionalPorId(id);
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