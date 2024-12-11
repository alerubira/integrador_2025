import { ProfesionData } from "./profesionData.js";

class Profesion {
    constructor(idProfesion, nombreProfesion,activoProfesion) {
        this.idProfesion = idProfesion;
        this.nombreProfesion = nombreProfesion;
        this.activoProfesion=activoProfesion;
    }

    static async alta(pro) {
        return await ProfesionData.altaProfesion(pro);
    }

    static async consulta() {
        return await ProfesionData.consultaProfesion();
    }

    async modificarActivo() {
        this.activoProfesion = !this.activoProfesion;
        return await ProfesionData.modificarActivoProfesion(this);
    }

    async modificarNombre() {
        return await ProfesionData.modificarNombreProfesion(this);
    }
}

export { Profesion };
