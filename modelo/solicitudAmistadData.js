import{ consulta1 ,pool} from './conexxionBD.js';
let query;
class SolocitudAmistadData{
static async altaSolicitud(sol){
    let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            
            
            const [idSolicitudResult] = await connection.execute(
                'INSERT INTO `solicitud_amistad` (`id_perfil_solicitante`,`id_perfil_solicitado`,`solicitud_aceptada`) VALUES (?,?,?)',
                [sol.idPerfilSolicitante ,sol.idPerfilSolicitado,false]
            );
    
            const id_solicitante_notificacion = idSolicitudResult.insertId;
            const [idNotificacionResult] = await connection.execute(
                'INSERT INTO `notificacion` (`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?,NOW())',
                [id_solicitante_notificacion,1,false]
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
export{SolocitudAmistadData}