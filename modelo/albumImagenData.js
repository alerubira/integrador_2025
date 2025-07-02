import { consulta1,consulta2 } from "./conexxionBD.js";
let query;
class AlbumImagenData{
     static async alta(imgComp){
        query='INSERT INTO `album_imagen`( `id_album_seguidor`, `id_imagen`, `activo_album_imagen`) VALUES (?,?,?)'
        return await consulta1(query,imgComp.idAlbumSegidor,imgComp.IdImgSeleccionada,true)
     }
     static async buscarPorIds(idAlbumSeguidor,idImagen){
      query='SELECT * FROM `album_imagen` WHERE id_album_seguidor=?&&id_imagen=?;';
      return await consulta1(query,idAlbumSeguidor,idImagen)
     }
}
export{AlbumImagenData}