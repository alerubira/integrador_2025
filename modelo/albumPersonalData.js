import { consulta1,consulta2 } from "./conexxionBD.js";
let query;
class AlbumPersonalData {
    static async altaAlbumPersonal(alb) {
        query = 'INSERT INTO `album_personal` (`titulo_album_personal`,`cantidad_imagenes`,`id_perfil_personal`,`id_tags`,`activo_album_personal`) VALUES (?,?,?,?,?)';
        return await consulta1(query, alb.tituloAlbumPersonal,0,alb.idPerfilPersonal,alb.idTags, true);
    }
    static async consultaPorIdPersonal(idPerfilPersonal) {
        query = 'CALL buscarAlbumesPersonalesPorIdPerfil(?)';
;
        return await consulta1(query, idPerfilPersonal);
    }
    static async modificarTitulo(album) {
        query = 'UPDATE `album_personal` SET `titulo_album_personal` = ? WHERE `id_album_personal` = ?';
        return await consulta1(query, album.tituloAlbumPersonal, album.idAlbumPersonal);
    }
    static async modificarTags(album) {
        query = 'UPDATE `album_personal` SET `id_tags` = ? WHERE `id_album_personal` = ?';
        return await consulta1(query, album.idTags, album.idAlbumPersonal);
    }
    static modificarActivoAlbumPersonal(alb) {  
        query = 'UPDATE `album_personal` SET `activo_album_personal` = ? WHERE `id_album_personal` = ?';
        return consulta1(query, alb.activoAlbumPersonal, alb.idAlbumPersonal);
    }
    //revirsar para abajo
    static async consultaAlbumPersonal() {
        query = 'SELECT * FROM `album_personal` WHERE 1';
        return await consulta1(query);
    }

   

    static async modificarNombreAlbumPersonal(alb) {
        query = 'UPDATE `album_personal` SET `nombre_album` = ? WHERE `id_album` = ?';
        return await consulta1(query, alb.nombreAlbum, alb.idAlbum);
    }
    static async consultaCantidaImagenesPorId(id){
        query='SELECT cantidad_imagenes FROM `album_personal` WHERE id_album_personal=?';
        return await consulta1(query,id);
    }
}
export{ AlbumPersonalData };