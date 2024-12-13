//import { altaPersona } from "./personaData";
class Persona{
    constructor(idPersona,dniPersona,nombrePersona,apellidoPersona,activoPersona){
        this.idPersona=idPersona;
        this.dniPersona=dniPersona;
        this.nombrePersona=nombrePersona;
        this.apellidoPersona=apellidoPersona;
        this.activoPersona=activoPersona;
        }
        // Método para mostrar la información del usuario
        static async alta(per) {
                await altaPersona(per);
        }
        static async consulta() {
            return await PersonaData.consultaPersona();
        }
        static async buscarIdPorDni(dni){
           return await PersonaData.buscarIdPorDni(dni);
        }
    
        async modificarActivo() {
            this.activoPersona = !this.activoPersona;
            return await PersonaData.modificarActivoPersona(this);
        }
    
        async modificarNombre() {
            return await PersonaData.modificarNombrePersona(this);
        }
        async modificarApellido() {
            return await PersonaData.modificarApellidoPersona(this);    
        }
        async modificarDni() {
            return await PersonaData.modificarDniPersona(this);
        }
    }
export{Persona}    