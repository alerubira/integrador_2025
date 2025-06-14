import {consulta1}from './conexxionBD.js';
let query;
class NotificacionData{
     /*static async alta(not){
        query='INSERT INTO `notificacion` (`id_solicitante_notificacion`,`id_tipo_notificacion`,`leida_notificacion`,`fecha_notificacion`) VALUES (?,?,?)'
        return await consulta1(query,not.idSolicitanteNotificacion,not.idTipoNotificacion,false,Date.now())
     }*/
    /* 
      ='SELECT * FROM notificacion noti  JOIN solicitud_amistad sa ON noti.id_solicitante_notificacion=sa.id_solicitud_amistad WHERE noti.id_destinatario=?;'
          
   }*/
   
   static async buscarNotificacionesPorIdSolicitado(id){
      query='SELECT * FROM notificacion noti WHERE noti.id_destinatario=? ORDER BY fecha_notificacion DESC;'
      return await consulta1(query,id)
   } 
   static async buscarNotificacionesNoLeidasPorIdSolicitado(id){
      query='SELECT * FROM notificacion noti WHERE noti.id_destinatario=?&&noti.leida_notificacion=0;'
       return await consulta1(query,id)
   }
   static async modificacionNotificacionLeida(idNotificacion){
      query='UPDATE `notificacion` SET `leida_notificacion`=1 WHERE id_notificacion=?';
      return await consulta1(query,idNotificacion);
   }
}
export{NotificacionData}