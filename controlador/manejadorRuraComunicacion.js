import { retornarError, retornarExito } from "./funsionesControlador.js";
import { existeBd } from "../modelo/conexxionBD.js";
import {SolicitudAmistad} from "../modelo/claseSolicitudAmistad.js";
import {Notificacion} from "../modelo/claseNotificacion.js";
import{clientes }from "../index.js"
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
        // ...dentro de la función que crea la solicitud de amistad:
            if (clientes.has(req.body.idPerfilSolicitado)) {
                const ws = clientes.get(req.body.idPerfilSolicitado);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
       
       return retornarExito(res,"Solicitud Enviada con exito")
    } catch (error) {
        console.log(`Error al generar la solicitud:${error}`)
        return retornarError(res,`Error al generar la solicitud:${error}`)
    }

}
export async function buscarNotificacionesPorIdSolicitado(req,res){
try {
    let id=req.body.idPerfilSolicitado;
    let aux=await existeBd(id,'perfil','id_perfil');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe el perfil:${Error}`)
    }
    if(!aux){
        return retornarError(res,'El Perfil no existe')
    }
    aux=await Notificacion.buscarNotificacionesPorIdSolicitado(id);
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar notificaciones:${aux}`)
    }
    return retornarExito(res,'',aux)
} catch (error) {
    console.log(`Error al buscar Notificaciones:${error}`)
    return retornarError(res,`Error al buscar Notificaciones:${error}`)
}
}
export async function buscarNotificacionesNoLeidasPorIdSolicitado(req,res){
    try {
        let id=req.body.idPerfilSolicitado;
    let aux=await existeBd(id,'perfil','id_perfil');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe el perfil:${Error}`)
    }
    if(!aux){
        return retornarError(res,'El Perfil no existe')
    }
    aux=await Notificacion.buscarNotificacionesNoLeidasPorIdSolicitado(id);
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar notificaciones:${aux}`)
    }
    return retornarExito(res,'',aux)
    } catch (error) {
        console.log(`Error al buscar notificaciones no leidas:${error}`)
        return retornarError(res,`Error al buscar notificaciones no leidas:${error}`)
    }

}
export default{
    generarSilicitudAmistad,
    buscarNotificacionesPorIdSolicitado,
    buscarNotificacionesNoLeidasPorIdSolicitado
}