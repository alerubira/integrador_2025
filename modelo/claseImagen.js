import { ImagenData } from "./imagenData.js";
class Imagen{
    constructor(idImagen,urlImagen,fechaCreacion,tituloImagen,captionImagen,idVisivilidad,tituloVisibilidad,activoImagen)
    {
        this.idImagen = idImagen;
        this.urlImagen = urlImagen;
        this.fechaCreacion = fechaCreacion;
        this.tituloImagen = tituloImagen;
        this.captionImagen = captionImagen;
        this.idVisivilidad = idVisivilidad;
        this.tituloVisibilidad=tituloVisibilidad;
        this.activoImagen = activoImagen;
    }
    static async alta(imagen,idAlbumPersonal,cantidad) {
        return await ImagenData.alta(imagen,idAlbumPersonal,cantidad);
    }
    static async buscarImagenesPorIdAlbumPersonal(idAlbumPersonal) {
        return await ImagenData.buscarImagenesPorIdAlbumPersonal(idAlbumPersonal);
    }
    static async modificarTiyuloPorId(img){
        return await ImagenData.modificarTituloPorId(img);
    }
    static async modificarCaptionPorId(img){
        return await ImagenData.modificarCaptionPorId(img);
    }
}
export { Imagen };