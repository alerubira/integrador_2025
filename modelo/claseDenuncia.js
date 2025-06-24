import { DenunciaData } from "./denunciaData.js";
class Denuncia{
    constructor(idDenuncia, idMotivoDenuncia, idImagenDenunciada, idPerfilDenunciante, idPerfilDenunciado, activoDenuncia, fechaDenuncia) {
        this.idDenuncia = idDenuncia;
        this.idMotivoDenuncia = idMotivoDenuncia;
        this.idImagenDenunciada = idImagenDenunciada;
        this.idPerfilDenunciante = idPerfilDenunciante;
        this.idPerfilDenunciado = idPerfilDenunciado;
        this.activoDenuncia = activoDenuncia;
        this.fechaDenuncia = fechaDenuncia;
    }

    static async alta(denuncia) {
        return await DenunciaData.alta(denuncia);
    }
    static async consulta(){
        return await DenunciaData.consulta();
    }
}
export { Denuncia };