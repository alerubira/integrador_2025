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
        // el id es aque perfil dirige la accion
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
export async function marcarLeidaNotificacion(req,res){
try {
    let idNotificacion=req.body.idNotificacion;
    let aux=await existeBd(idNotificacion,'notificacion','id_notificacion');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe la notificacion:${Error}`)
    }
    if(!aux){
        return retornarError(res,'La Notificacion no existe')
    }
    aux=await Notificacion.modificarLeidaNotificacion(idNotificacion);
    if(aux instanceof Error){return retornarError(res,`Error al marcar la notificacion leida${aux}`)}
// el id es aque perfil dirige la accion
            if (clientes.has(req.body.idPerfil)) {
                const ws = clientes.get(req.body.idPerfil);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
    return retornarExito(res,"")
} catch (error) {
   console.log(`Error al mercar como leida la Notificacion:${error}`)
   return retornarError(res,`Error al mercar como leida la Notificacion:${error}`) 
}
}
export async function aceptarSolicitud(req,res){
try {
    let acepta=req.body;
    let aux=await existeBd(acepta.idSolicitanteNotificacion,'solicitud_amistad','id_solicitud_amistad');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe la solicitud de amistad:${Error}`)
    }
    if(!aux){
        return retornarError(res,'La solicitud de amistad no existe')
    }
    aux=await existeBd(acepta.idPerfilSeguidor,'perfil','id_perfil_seguidor');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe El Perfil Solicitado:${Error}`)
    }
    if(!aux){
        return retornarError(res,'El Perfil Solicitado no existe')
    }
    aux=await existeBd(acepta.idPerfilSeguido,'perfil','id_perfil_seguidor');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar si existe El Perfil Solicitanta:${Error}`)
    }
    if(!aux){
        return retornarError(res,'El Perfil Solicitanta no existe')
    }
     aux=await SolicitudAmistad.aceptarSolicitud(acepta)
     if(aux instanceof Error){
        return retornarError(res,`Error al aceptar la solicitud:${aux}`)
     }
     //devolver el mensaje a la persona que fue aceptada seguidor
     // el id es aque perfil dirige la accion
            if (clientes.has(acepta.idPerfilSeguidor)) {
                const ws = clientes.get(req.body.idPerfil);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
    return retornarExito(res,"La aceptacion de la solicitud fue enviada")

} catch (error) {
    console.log(`Error al contestar la solicitud de amistad:${error}`)
    return retornarError(res,`Error al contestar la solicitud de amistad:${error}`)
}
}

export default{
    generarSilicitudAmistad,
    buscarNotificacionesPorIdSolicitado,
    buscarNotificacionesNoLeidasPorIdSolicitado,
    marcarLeidaNotificacion,
    aceptarSolicitud
}