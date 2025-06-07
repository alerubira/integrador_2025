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
    }

export{Notificacion}