import{consulta1,pool}from './conexxionBD.js';
let query;
class ComentarioData{
    static async alta(com){
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
    
            const [idComentarioResult] = await connection.execute(
                'INSERT INTO `comentario` (`id_imagen`,`id_perfil_comentador`,`texto_comentario`,`activo_comentario`,`fecha_comentario`) VALUES (?,?,?,?,NOW())',
                [com.idImagen,com.idPerfilComentador,com.textoComentario,true]
            );
            const [idANotificacionResult] = await connection.execute(
                'INSERT INTO `notificacion`( `id_remitente`, `id_destinatario`, `id_solicitante_notificacion`, `id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?,?,?,NOW())',
                [com.idPerfilComentador,com.idPerfilImagen,idComentarioResult.insertId,3,false]
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
     static async consultaPorId(id){
        query='SELECT * FROM `comentario` com JOIN imagen img ON com.id_imagen=img.id_imagen WHERE id_comentario=?'
        return await consulta1(query,id)
     } 
     static async consultaPorIdImagen(idImagen){
        query='SELECT co.id_perfil_comentador,co.texto_comentario,co.fecha_comentario,cc.texto_comentario_contestado,cc.fecha_comentario_contestado FROM `comentario` co JOIN imagen img ON img.id_imagen=co.id_imagen JOIN comentario_contestado cc ON co.id_comentario=cc.id_comentario WHERE img.id_imagen=13;'
        return await consulta1(query,idImagen)
     } 

}
export{ComentarioData}