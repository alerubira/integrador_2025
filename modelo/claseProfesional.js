class Profesional{
    constructor(idProfesional,idPersona,idProfesion,activoProfesional){
        this.idProfesional=idProfesional;
        this.idPersona=idPersona;
        this.idProfesion=idProfesion;
        this.activoProfesional=activoProfesional;
        }
        // Método para mostrar la información del usuario
    async alta(per) {
        await altaPersona(per);
        
    }
}