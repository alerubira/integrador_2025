import { consulta1,existeBd,pool } from "./conexxionBD.js";
let query;
class ImagenData{
    static async  alta(imagen,idAlbum,cantidad) {
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
                'INSERT INTO `album_imagen`(`id_album`, `id_imagen`,`activo_album_imagen`,`img_compartida`) VALUES (?,?,?,?)',
                [idAlbum, id_imagen,true,false]
            );
             let cant=cantidad+1;
           const [sumarCantidadResult] = await connection.execute(
                'UPDATE album_personal SET cantidad_imagenes=? WHERE id_album_personal = ?',
                  [cant, idAlbum]
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
         query = "SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,img.id_visibilidad,vi.titulo_visibilidad,img.activo_imagen FROM imagen img JOIN album_imagen a_i ON img.id_imagen=a_i.id_imagen JOIN album_personal a_p on a_i.id_album=a_p.id_album_personal JOIN visibilidad vi on img.id_visibilidad=vi.id_visibilidad WHERE a_p.id_album_personal=?&&a_i.img_compartida=0;";
          return await consulta1(query, idAlbumPersonal);

    }
    static async modificarTituloPorId(img){
         query='UPDATE imagen SET titulo_imagen=? WHERE id_imagen = ?'
         return await consulta1(query,img.tituloImagen,img.idImagen) 
           }
    static async modificarCaptionPorId(img){
        query='UPDATE imagen SET caption_imagen=? WHERE id_imagen = ?'
         return await consulta1(query,img.captionImagen,img.idImagen) 
    }
    static async modificarVisibilidad(img){
        query='UPDATE imagen SET id_visibilidad=? WHERE id_imagen = ?'
        return await consulta1(query,img.idVisibilidad,img.idImagen)
    }
    static async modificarActivoImagen(img){
        query='UPDATE imagen SET activo_imagen=? WHERE id_imagen = ?'
        return await consulta1(query,img.activoImagen,img.idImagen);
    }
    static async BuscarImagenesPublicas(){
        query='SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,pe.img_perfil,pe.nombre_perfil,per.nombre_persona,per.apellido_persona FROM imagen img JOIN album_imagen ai ON img.id_imagen=ai.id_imagen JOIN album_personal ap ON ai.id_album=ap.id_album_personal JOIN perfil pe on ap.id_perfil_personal=pe.id_perfil JOIN persona per ON pe.id_persona=per.id_persona WHERE img.id_visibilidad=1&&img.activo_imagen=1&&ai.img_compartida=0;'
        return await consulta1(query);
    }
    static async buscarImagenesPublicasPublicas(){
        query='SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,pe.img_perfil,pe.nombre_perfil,pe.id_perfil,per.nombre_persona,per.apellido_persona,ap.id_tags FROM imagen img JOIN album_imagen ai ON img.id_imagen=ai.id_imagen JOIN album_personal ap ON ai.id_album=ap.id_album_personal JOIN perfil pe on ap.id_perfil_personal=pe.id_perfil JOIN persona per ON pe.id_persona=per.id_persona WHERE (img.id_visibilidad=1||img.id_visibilidad=2)&&img.activo_imagen=1&&ai.img_compartida=0 ORDER BY img.fecha_creacion_imagen DESC;'
        return await consulta1(query);
    }
    static async buscarImagenesParaSeguidores(idSeguidor){
        query='SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,pe.img_perfil,pe.nombre_perfil,pe.id_perfil,per.nombre_persona,per.apellido_persona FROM imagen img JOIN album_imagen ai ON img.id_imagen=ai.id_imagen JOIN album_personal ap ON ai.id_album=ap.id_album_personal JOIN perfil pe on ap.id_perfil_personal=pe.id_perfil JOIN persona per ON pe.id_persona=per.id_persona JOIN album_seguidor als on als.id_perfil_seguido=pe.id_perfil WHERE (img.id_visibilidad=3)&&(img.activo_imagen=1)&&(als.id_perfil_seguidor=?&&ai.img_compartida=0) ORDER BY img.fecha_creacion_imagen DESC;'
        return await consulta1(query,idSeguidor)
    }
    static async buscarImagenesEtiquetadasPersonal(idSeguidor){
        //query='SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,pe.img_perfil,pe.nombre_perfil,pe.id_perfil,per.nombre_persona,per.apellido_persona FROM imagen img JOIN album_imagen ai ON img.id_imagen=ai.id_imagen JOIN album_personal ap ON ai.id_album=ap.id_album_personal JOIN perfil pe on ap.id_perfil_personal=pe.id_perfil JOIN persona per ON pe.id_persona=per.id_persona JOIN album_seguidor als on als.id_perfil_seguido=pe.id_perfil WHERE(img.activo_imagen=1)&&ai.img_compartida=1 &&(als.id_perfil_seguidor)=? ORDER BY img.fecha_creacion_imagen DESC;'
        query='SELECT img.id_imagen,img.url_imagen,img.fecha_creacion_imagen,img.titulo_imagen,img.caption_imagen,pe.img_perfil,pe.nombre_perfil,pe.id_perfil,per.nombre_persona,per.apellido_persona FROM imagen img JOIN album_imagen ai ON img.id_imagen=ai.id_imagen JOIN album_seguidor als on als.id_album_seguidor=ai.id_album JOIN perfil pe on als.id_perfil_seguido=pe.id_perfil JOIN persona per ON pe.id_persona=per.id_persona WHERE(img.activo_imagen=1)&&ai.img_compartida=1 &&(als.id_perfil_seguidor)=? ORDER BY img.fecha_creacion_imagen DESC;'
        return await consulta1(query,idSeguidor);
    }
    
}

export { ImagenData };