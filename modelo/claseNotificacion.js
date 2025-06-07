import { NotificacionData } from "./notificacionData.js";
class Notificacion{
    constructor(idNotificacion,idSolicitanteNotificacion,idTipoNotificacion,leidaNotificacion){
     this.idNotificacion=idNotificacion;
     this.idSolicitanteNotificacion=idSolicitanteNotificacion;
     this.idTipoNotificacion=idTipoNotificacion;
     this.leidaNotificacion=leidaNotificacion;
}
static async alta(not){
    return await NotificacionData.alta(not);
}
static async buscarNotificacionesPorIdSolicitado(id){
    return await NotificacionData.buscarNotificacionesPorIdSolicitado(id);
}
static async buscarNotificacionesNoLeidasPorIdSolicitado(id){
    return await NotificacionData.buscarNotificacionesNoLeidasPorIdSolicitado(id);
}
    }

export{Notificacion}