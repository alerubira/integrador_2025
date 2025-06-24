import { ImagenData } from "./imagenData.js";
class Imagen{
    constructor(idImagen,urlImagen,fechaCreacion,tituloImagen,captionImagen,idVisibilidad,tituloVisibilidad,activoImagen)
    {
        this.idImagen = idImagen;
        this.urlImagen = urlImagen;
        this.fechaCreacion = fechaCreacion;
        this.tituloImagen = tituloImagen;
        this.captionImagen = captionImagen;
        this.idVisibilidad = idVisibilidad;
        this.tituloVisibilidad=tituloVisibilidad;
        this.activoImagen = activoImagen;
    }
    static async alta(imagen,idAlbumPersonal,cantidad) {
        return await ImagenData.alta(imagen,idAlbumPersonal,cantidad);
    }
    static async buscarImagenesPorIdAlbumPersonal(idAlbumPersonal) {
        return await ImagenData.buscarImagenesPorIdAlbumPersonal(idAlbumPersonal);
    }
    static async modificarTiTuloPorId(img){
        return await ImagenData.modificarTituloPorId(img);
    }
    static async modificarCaptionPorId(img){
        return await ImagenData.modificarCaptionPorId(img);
    }
    static async modificarVisibilidad(img){
        return await ImagenData.modificarVisibilidad(img);
    }
    static async modificarActivoImagen(img){
        if(img.activoImagen===1){
            img.activoImagen=0;
        }else{img.activoImagen=1;}
       return await ImagenData.modificarActivoImagen(img)
    }
    static async buscarImagenesPublicas(){
        return await ImagenData.BuscarImagenesPublicas();
    }
    static async buscarImagenesPublicasPublicas(){
        return await ImagenData.buscarImagenesPublicasPublicas();
    }
    static async buscarImagenesPorSeguidor(idSeguidor){
        return await ImagenData.buscarImagenesParaSeguidores(idSeguidor)
    }
    static async buscarImagenesEtiquetadaPersonal(idSeguidor){
        return await ImagenData.buscarImagenesEtiquetadasPersonal(idSeguidor)
    }
    static async consultaPorId(idImagen){
        return await ImagenData.consultaPorId(idImagen);
    }
}
export { Imagen };