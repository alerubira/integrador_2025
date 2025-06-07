import {consulta1}from './conexxionBD.js';
let query;
class NotificacionData{
     static async alta(not){
        query='INSERT INTO `notificacion` (`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`) VALUES (?,?,?)'
        return await consulta1(query,not.idSolicitanteNotificacion,not.idTipoNotificacion,false)
     }
     static async buscarNotificacionesPorIdSolicitado(id){
      query='SELECT * FROM notificacion noti  JOIN solicitud_amistad sa ON noti.id_solicitante_notificacion=sa.id_solicitud_amistad WHERE sa.id_perfil_solicitado=?;'
      return await consulta1(query,id)     
   }
   static async buscarNotificacionesNoLeidasPorIdSolicitado(id){
      query='SELECT * FROM notificacion noti JOIN solicitud_amistad sa on noti.id_solicitante_notificacion=sa.id_solicitud_amistad WHERE sa.id_perfil_solicitado=?&&noti.leida_notificacion=0;'
       return await consulta1(query,id)
   }
}
export{NotificacionData}