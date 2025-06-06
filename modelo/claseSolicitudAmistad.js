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
}
export{SolicitudAmistad}