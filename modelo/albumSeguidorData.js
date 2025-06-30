import { consulta1,existeBd,pool } from "./conexxionBD.js";
let query;
class AlbumSeguidorData{
      static async buscarPorIds(idPerfilSeguidor,idPerfilSeguido){
        let query='SELECT * FROM `album_seguidor` als WHERE als.id_perfil_seguidor=?&&als.id_perfil_seguido=?;';
        return await consulta1(query,idPerfilSeguidor,idPerfilSeguido);
      }
}
export{AlbumSeguidorData}