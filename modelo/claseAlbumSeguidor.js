import{AlbumSeguidorData} from "./albumSeguidorData.js";;
class AlbumSeguidor{
    contructor(idAlbumSegidor,idPerfilSeguidor,idPerfilSeguido,nombreAlbumSeguidor,activoAlbumSeguidor){
        this.idAlbumSegidor=idAlbumSegidor,
        this.idPerfilSeguidor=idPerfilSeguidor,
        this.idPerfilSeguido=idPerfilSeguido,
        this.nombreAlbumSeguidor=nombreAlbumSeguidor,
        this.activoAlbumSeguidor=activoAlbumSeguidor
    }
         static async buscarPorIds(idPerfilSeguidor,idPerfilSeguido){
            return await AlbumSeguidorData.buscarPorIds(idPerfilSeguidor,idPerfilSeguido);
         }
}
export{AlbumSeguidor}