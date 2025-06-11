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
                'INSERT INTO `notificacion` (`id_remitente`,`id_destinatario`,`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?,?,?,NOW())',
                [sol.idPerfilSolicitante,sol.idPerfilSolicitado,id_solicitante_notificacion,1,false]
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
static async aceptarSolicitud(acepta){

    let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            
            const [idSolicitudResult] = await connection.execute(
                'UPDATE `solicitud_amistad` SET solicitud_aceptada=1 WHERE id_solicitud_amistad=?',
                [acepta.idSolicitanteNotificacion]
            );
    
            const id_solicitante_notificacion = idSolicitudResult.insertId;
            const [idNotificacionResult] = await connection.execute(
                'INSERT INTO `notificacion` (`id_remitente`,`id_destinatario`,`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?,?,?,NOW())',
                [acepta.idPerfilSeguido,acepta.idPerfilSeguidor,acepta.idSolicitanteNotificacion,2,false]
            );
            const [idAlbumSeguidorResult] = await connection.execute(
                'INSERT INTO `album_seguidor`( `id_perfil_seguidor`, `id_perfil_seguido`, `nombre_album_seguidor`, `activo_album_seguidor`) VALUES (?,?,?,?)',
                [acepta.idPerfilSeguidor,acepta.idPerfilSeguido,acepta.nombreAlbumSeguidor,true]
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
    /*let acep={
        idPerfilSeguido:perfil.idPerfil,
        idPerfilSeguidor:perfilMomentaneo.id_perfil,
        nombreAlbumSeguidor:`${perfil.nombrePersona},${perfil.apellidoPersona},${perfi.nombrePerfil}`,
        idSolicitanteNotificacion:notificacionSeleccionada.id_solicitante_notificacion
    }*/
   
     }
 static async consultaPorId(id){
    query='SELECT * FROM `solicitud_amistad` WHERE `id_solicitud_amistad`=?;'
    return await consulta1(query,id);
 }    
}
export{SolocitudAmistadData}