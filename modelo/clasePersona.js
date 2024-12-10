import { altaPersona } from "./personaData";
class Persona{
    constructor(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        this.idPersona=idPersona;
        this.dniPersona=dniPersona;
        this.nombrePersona=nombrePersona;
        this.apellidoPersona=apellidoPersona;
        this.activoPersona=activoPersona;
        }
        // Método para mostrar la información del usuario
    async alta(per) {
        await altaPersona(per);
        
    }
}