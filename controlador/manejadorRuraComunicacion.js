import { retornarError, retornarExito } from "./funsionesControlador.js";
import { existeBd } from "../modelo/conexxionBD.js";
import {SolicitudAmistad} from "../modelo/claseSolicitudAmistad.js";
import {Notificacion} from "../modelo/claseNotificacion.js";
export async function generarSilicitudAmistad(req,res){
console.log(req.body);
return retornarExito(res,"Solicitud Enviada con exito",req.body)
}
export default{
    generarSilicitudAmistad
}