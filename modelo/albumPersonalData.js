import { consulta1,consulta2 } from "./conexxionBD.js";
let query;
class AlbumPersonalData {
    static async altaAlbumPersonal(alb) {
        query = 'INSERT INTO `album_personal` (`titulo_album_personal`,`cantidad_imagenes`,`id_perfil_personal`,`id_tags`,`activo_album_personal`) VALUES (?,?,?,?,?)';
        return await consulta1(query, alb.tituloAlbum_personal,0,idPerfilPersonal,idTags, true);
    }
//revisar para abajo
    static async consultaAlbumPersonal() {
        query = 'SELECT * FROM `album_personal` WHERE 1';
        return await consulta1(query);
    }

    static async modificarActivoAlbumPersonal(alb) {
        query = 'UPDATE `album_personal` SET `activo_album` = ? WHERE `id_album` = ?';
        return await consulta1(query, alb.activoAlbum, alb.idAlbum);
    }

    static async modificarNombreAlbumPersonal(alb) {
        query = 'UPDATE `album_personal` SET `nombre_album` = ? WHERE `id_album` = ?';
        return await consulta1(query, alb.nombreAlbum, alb.idAlbum);
    }
}
export{ AlbumPersonalData };