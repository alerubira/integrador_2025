import {consulta1}from './conexxionBD.js';
let query;
class NotificacionData{
     static async alta(not){
        query='INSERT INTO `notificacion` (`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`) VALUES (?,?,?)'
        return await consulta1(query,not.idSolicitanteNotificacion,not.idTipoNotificacion,false)
     }
}
export{NotificacionData}