import { retornarError, retornarExito } from "./funsionesControlador.js";
import { existeBd } from "../modelo/conexxionBD.js";
import {SolicitudAmistad} from "../modelo/claseSolicitudAmistad.js";
import {Notificacion} from "../modelo/claseNotificacion.js";
export async function generarSilicitudAmistad(req,res){
    try {
        
        let aux=await existeBd(req.body.idPerfilSolicitante,'perfil','id_perfil')
        if(aux instanceof Error){
            return retornarError(res,`Error al buscar el perfil Solicitante:${aux}`)
        }
        if(!aux){
            return retornarError(res,'El Perfil solicitante no existe')
        }
        aux=await existeBd(req.body.idPerfilSolicitado,'perfil','id_perfil')
        if(aux instanceof Error){
            return retornarError(res,`Error al buscar el perfil solicitado:${aux}`)
        }
        if(!aux){
            return retornarError(res,`El Perfil solicitado no existe`)
        }
        let sol=req.body;
        aux=await SolicitudAmistad.alta(sol);
        if(aux instanceof Error){
            return retornarError(res,`Error al crear la solicitud:${Error}`)
        }
       
       return retornarExito(res,"Solicitud Enviada con exito")
    } catch (error) {
        console.log(`Error al generar la solicitud:${error}`)
        return retornarError(res,`Error al generar la solicitud:${error}`)
    }

}
export async function buscarNotificacionesPorIdSolicitado(req,res){
try {
    //hacer el buscador en notifcacion data y clase notificacion
} catch (error) {
    console.log(`Error al buscar Notificaciones:${error}`)
    return retornarError(res,`Error al buscar Notificaciones:${error}`)
}
}
export default{
    generarSilicitudAmistad,
    buscarNotificacionesPorIdSolicitado
}