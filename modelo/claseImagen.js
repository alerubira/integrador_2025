import { ImagenData } from "./imagenData.js";
class Imagen{
    constructor(idImagen,urlImagen,fechaCreacion,tituloImagen,captionImagen,idVisivilidad,activoImagen)
    {
        this.idImagen = idImagen;
        this.urlImagen = urlImagen;
        this.fechaCreacion = fechaCreacion;
        this.tituloImagen = tituloImagen;
        this.captionImagen = captionImagen;
        this.idVisivilidad = idVisivilidad;
        this.activoImagen = activoImagen;
    }
    static async alta(imagen,idAlbumPersonal,cantidad) {
        return await ImagenData.alta(imagen,idAlbumPersonal,cantidad);
    }
    static async buscarImagenesPorIdAlbumPersonal(idAlbumPersonal) {
        return await ImagenData.buscarImagenesPorIdAlbumPersonal(idAlbumPersonal);
    }
}
export { Imagen };