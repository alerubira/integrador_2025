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
                [com.idPerfilComentador,com.idPerfilImagen,idComentarioResult,3,false]
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

}
export{ComentarioData}