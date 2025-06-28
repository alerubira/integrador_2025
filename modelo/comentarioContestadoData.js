import {consulta1,pool} from './conexxionBD.js';
let query;
class ComentarioContestadoData{
    static async alta(comContestado){
          let connection;
                 try {
                     connection = await pool.getConnection();
                     await connection.beginTransaction();
             
                     const [idComentarioContestadoResult] = await connection.execute(
                         'INSERT INTO `comentario_contestado` (`id_comentario`,`texto_comentario_contestado`,`activo_comentario_contestado`,`fecha_comentario_contestado`) VALUES (?,?,?,NOW())',
                         [comContestado.idComentario,comContestado.textoComentarioContestado,true]
                     );
                     const[SolicitudNotificacion]=await connection.execute(
                        'INSERT INTO `solicitante_notificacion`(`id_comentario_contestado`) VALUES (?)',
                        [idComentarioContestadoResult.insertId] 
                        );
                     const [idANotificacionResult] = await connection.execute(
                         'INSERT INTO `notificacion`( `id_remitente`, `id_destinatario`, `id_solicitante_notificacion`, `id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?,?,?,NOW())',
                         [comContestado.idRemitente,comContestado.idDestinatario,SolicitudNotificacion.insertId,4,false]
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
             query='SELECT * FROM `comentario_contestado` cc JOIN comentario co ON cc.id_comentario=co.id_comentario JOIN imagen img ON img.id_imagen=co.id_imagen WHERE cc.id_comentario_contestado=?;'
             return consulta1(query,id)
    }
    static async consultaPorIdComentario(idC){
        query='SELECT * FROM `comentario_contestado` WHERE id_comentario=?;'
        return await consulta1(query,idC);
    }
}
export{ComentarioContestadoData}