import { NotificacionData } from "./notificacionData.js";
class Notificacion{
    constructor(idNotificacion,idRemitente,idDestinatario,idTipoNotificacion,leidaNotificacion){
     this.idNotificacion=idNotificacion;
     this.idRemitente=idRemitente;
     this.idDestinatario=idDestinatario;
     this.idTipoNotificacion=idTipoNotificacion;
     this.leidaNotificacion=leidaNotificacion;
}
static async alta(not){
    return await NotificacionData.alta(not);
}
    }

export{Notificacion}