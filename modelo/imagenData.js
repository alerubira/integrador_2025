import { consulta1,existeBd,pool } from "./conexxionBD.js";
let query;
class ImagenData{
    static async  alta(imagen,idAlbum) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            
             const [imagenResult] = await connection.execute(
                'INSERT INTO `imagen`(`url_imagen`, `fecha_creacion_imagen`, `titulo_imagen`,`caption_imagen`,`id_visibilidad`,`activo_imagen`) VALUES (?,?,?,?,?,?)',
                [imagen.urlImagen, imagen.fechaCreacion, imagen.tituloImagen, imagen.captionImagen, imagen.idVisivilidad, imagen.activoImagen],
            );
    
            const id_imagen = imagenResult.insertId;
            const [albumImagenResult]=await connection.execute(
                'INSERT INTO `album_imagen`(`id_album`, `id_imagen`,`activo_album_imagen`) VALUES (?,?,?)',
                [idAlbum, id_imagen,true]
            );
           
            await connection.commit();
            return { success: true };
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error en la transacción:', error);
            throw new Error(`Error en la Transaccion:${error}`);
        } finally {
            if (connection) {
                connection.release(); // Devolvemos la conexión al pool
            }
        }
    }
    static async buscarImagenesPorIdAlbumPersonal(idAlbumPersonal) {
         query = "SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,img.id_visibilidad,img.activo_imagen FROM imagen img JOIN album_imagen a_i ON img.id_imagen=a_i.id_imagen JOIN album_personal a_p on a_i.id_album=a_p.id_album_personal WHERE a_p.id_album_personal=?;";
          return await consulta1(query, idAlbumPersonal);

    }
}

export { ImagenData };