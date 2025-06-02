import { AlbumPersonalData } from "./albumPersonalData.js";
class AlbumPersonal{
constructor (idAlbumPersonal,tituloAlbumPersonal,cantidadImagenes,idPerfilPersonal,idTags,activoAlbumPersonal,nombreTags){
    this.idAlbumPersonal = idAlbumPersonal;
    this.tituloAlbumPersonal = tituloAlbumPersonal;
    this.cantidadImagenes = cantidadImagenes;
    this.idPerfilPersonal = idPerfilPersonal;
    this.idTags = idTags;
    this.activoAlbumPersonal = activoAlbumPersonal;
    this.nombreTags = nombreTags;
}

static async alta(album) {
    return await AlbumPersonalData.altaAlbumPersonal(album);
}
static async consultaPorIdPerfilPersonal(idPerfilPersonal) {
    return await AlbumPersonalData.consultaPorIdPersonal(idPerfilPersonal); 
}
static async modificarTitulo(album) {
    return await AlbumPersonalData.modificarTitulo(album);
}
static async modificarTags(album) {
    return await AlbumPersonalData.modificarTags(album);
}
static async modificarActivoAlbumPersonal(album) {
    if(album.activoAlbumPersonal===1){
        album.activoAlbumPersonal=0;
    }else{
        album.activoAlbumPersonal=1;
    }
    return await AlbumPersonalData.modificarActivoAlbumPersonal(album); 
}
static async consultaCantidaImagenesPorId(id){
    return await AlbumPersonalData.consultaCantidaImagenesPorId(id);
}
}
export{ AlbumPersonal
};