import AlbumPersonalData from '../data/albumPersonalData.js';
class AlbumPersonal{
constructor (idAlbumPersonal,tituloAlbumPersonal,cantidadImagenes,idPerfilPersonal,idTags,activoAlbumPersonal){
    this.idAlbumPersonal = idAlbumPersonal;
    this.tituloAlbumPersonal = tituloAlbumPersonal;
    this.cantidadImagenes = cantidadImagenes;
    this.idPerfilPersonal = idPerfilPersonal;
    this.idTags = idTags;
    this.activoAlbumPersonal = activoAlbumPersonal;
}

static async alta(album) {
    return await AlbumPersonalData.altaAlbumPersonal(album);
}
}
export{ AlbumPersonal
};