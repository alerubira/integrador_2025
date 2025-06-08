import { SolocitudAmistadData } from "./solicitudAmistadData.js";
class SolicitudAmistad{
      constructor(idSolicitudAmistad,idPerfilSolicitante,idPerfilSolicitado,solicitudAceptada){
        this.idSolicitudAmistad=idSolicitudAmistad;
        this.idPerfilSolicitante=idPerfilSolicitante;
        this.idPerfilSolicitado=idPerfilSolicitado;
        this.solicitudAceptada=solicitudAceptada;
      }
      static async alta(sol){
        return await SolocitudAmistadData.altaSolicitud(sol);
      }
      static async aceptarSolicitud(acept){
        return await SolocitudAmistadData.aceptarSolicitud(acept)
      }
}
export{SolicitudAmistad}