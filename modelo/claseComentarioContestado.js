import { ComentarioContestadoData } from "./comentarioContestadoData.js";
class ComentarioContestado{
    constructor(idComentarioContestado,idComentario,textoComentarioContestado,activoComentarioContestado,fechaComentarioContestado){
        this.idComentarioContestado=idComentarioContestado;
        this.idComentario=idComentario;
        this.textoComentarioContestado=textoComentarioContestado;
        this.activoComentarioContestado=activoComentarioContestado;
        this.fechaComentarioContestado=fechaComentarioContestado
    }
    static async alta(comContestado){
        return await ComentarioContestadoData.alta(comContestado)
    }
}