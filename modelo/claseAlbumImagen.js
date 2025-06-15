import { AlbumImagenData } from "./albumImagenData.js";
class AlbumImagen{
    constructor(idAlbumImagen,idAlbum,IdImagen,activoAlbumImagen,imgCompartida){
        this.idAlbumImagen=idAlbumImagen;
        this.idAlbum=idAlbum;
        this.IdImagen=IdImagen;
        this.activoAlbumImagen=activoAlbumImagen;
        this.imgCompartida=imgCompartida;
    }
    static async alta(imgComp){
       return await AlbumImagenData.alta(imgComp)
    }
}

export{AlbumImagen}