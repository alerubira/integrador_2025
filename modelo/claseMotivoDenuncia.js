import { MotivoDenuniaData } from "./motivoDenunciaData.js";
class MotivoDenuncia{
    constructor(idMotivoDenuncia,nombreMotivoDenuncia) {
        this.idMotivoDenuncia = idMotivoDenuncia;
        this.nombreMotivoDenuncia = nombreMotivoDenuncia;
    }
    static async consulta(){
        return await MotivoDenuniaData.consulta();
    }
}
export { MotivoDenuncia };