import { ComentarioData } from "./comentarioData.js";
class Comentario{
    constructor(idComentario,idImagen,idPerfilComentador,textoComentario,activiComentario,fechaComentario){
        this.idComentario=idComentario;
        this.idImagen=idImagen;
        this.idPerfilComentador=idPerfilComentador;
        this.textoComentario=textoComentario;
        this.activiComentario=activiComentario;
        this.fechaComentario=fechaComentario;
    }
    static async alta(com){
        return await ComentarioData.alta(com);
    }
    static async consultaPorId(id){
        return await ComentarioData.consultaPorId(id);
    }

}
export {Comentario}