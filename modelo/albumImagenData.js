import { consulta1,consulta2 } from "./conexxionBD.js";
let query;
class AlbumImagenData{
     static async alta(imgComp){
        query='INSERT INTO `album_imagen`( `id_album`, `id_imagen`, `activo_album_imagen`, `img_compartida`) VALUES (?,?,?,?)'
        return await consulta1(query,imgComp.idAlbumSegidor,imgComp.IdImgSeleccionada,true,true)
     }
}
export{AlbumImagenData}