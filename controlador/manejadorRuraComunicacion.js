import { retornarError, retornarExito,retornarError400 } from "./funsionesControlador.js";
import { existeBd } from "../modelo/conexxionBD.js";
import {SolicitudAmistad} from "../modelo/claseSolicitudAmistad.js";
import {Notificacion} from "../modelo/claseNotificacion.js";
import{clientes }from "../index.js"
import { verificarYup } from "./verificaryup.js";
import {Comentario} from "../modelo/claseComentario.js"
import {ComentarioContestado}from "../modelo/claseComentarioContestado.js"
import { AlbumSeguidor } from "../modelo/claseAlbumSeguidor.js";
export async function generarSilicitudAmistad(req,res){
    try {
        
        let aux=await existeBd(req.body.idPerfilSolicitante,'perfil','id_perfil')
        if(aux instanceof Error){
            console.log(`Error al buscar el perfil Solicitante:${aux}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await existeBd(req.body.idPerfilSolicitado,'perfil','id_perfil')
        if(aux instanceof Error){
            console.log(`Error al buscar el perfil solicitado:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await AlbumSeguidor.buscarPorIds(req.body.idPerfilSolicitante,req.body.idPerfilSolicitado);
        if(aux instanceof Error){
            console.log(`Error al buscar el album seguidor:${aux}`)
            return retornarError(res)
        }
        if(aux.length>0){
            console.log("El Perfil que solicita la amistad ya es seguidor del perfil seleccionado");
            return retornarError400(res,"El Perfil que solicita la amistad ya es seguidor del perfil seleccionado")
        }
        let sol=req.body;
        aux=await SolicitudAmistad.alta(sol);
        if(aux instanceof Error){
            console.log(`Error al crear la solicitud:${aux}`)
            return retornarError(res)
        }
        // el id es aque perfil dirige la accion
            if (clientes.has(req.body.idPerfilSolicitado)) {
                const ws = clientes.get(req.body.idPerfilSolicitado);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
       
       return retornarExito(res,"Solicitud Enviada con exito")
    } catch (error) {
        console.log(`Error al generar la solicitud de amistad:${error}`)
        return retornarError(res)
    }

}
export async function buscarNotificacionesPorIdSolicitado(req,res){
try {
    let id=req.body.idPerfilSolicitado;
    let aux=await existeBd(id,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe el perfil:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Notificacion.buscarNotificacionesPorIdSolicitado(id);
    if(aux instanceof Error){
        console.log(`Error al buscar notificaciones:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
} catch (error) {
    console.log(`Error al buscar Notificaciones:${error}`)
    return retornarError(res)
}
}
export async function buscarNotificacionesNoLeidasPorIdSolicitado(req,res){
    try {
        let id=req.body.idPerfilSolicitado;
    let aux=await existeBd(id,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe el perfil:${Error}`);
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Notificacion.buscarNotificacionesNoLeidasPorIdSolicitado(id);
    if(aux instanceof Error){
        console.log(`Error al buscar notificaciones:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
    } catch (error) {
        console.log(`Error al buscar notificaciones no leidas:${error}`)
        return retornarError(res)
    }

}
export async function marcarLeidaNotificacion(req,res){
try {
    let idNotificacion=req.body.idNotificacion;
    let aux=await existeBd(idNotificacion,'notificacion','id_notificacion');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe la notificacion:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Notificacion.modificarLeidaNotificacion(idNotificacion);
    if(aux instanceof Error){
        console.log(`Error al marcar la notificacion leida${aux}`)
        return retornarError(res)
    }
// el id es aque perfil dirige la accion
            if (clientes.has(req.body.idPerfil)) {
                const ws = clientes.get(req.body.idPerfil);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
    return retornarExito(res,"")
} catch (error) {
   console.log(`Error al mercar como leida la Notificacion:${error}`)
   return retornarError(res) 
}
}
export async function aceptarSolicitud(req,res){
try {
    let acepta=req.body;
    let aux=await existeBd(acepta.idSolicitanteNotificacion,'solicitante_notificacion','id_solicitante_notificacion');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe la solicitud de amistad:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await existeBd(acepta.idPerfilSeguidor,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe El Perfil Solicitado:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await existeBd(acepta.idPerfilSeguido,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar si existe El Perfil Solicitanta:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
     aux=await SolicitudAmistad.aceptarSolicitud(acepta)
     if(aux instanceof Error){
        console.log(`Error al aceptar la solicitud:${aux}`)
        return retornarError(res)
     }
     //devolver el mensaje a la persona que fue aceptada seguidor
     // el id es aque perfil dirige la accion
            if (clientes.has(acepta.idPerfilSeguidor)) {
                const ws = clientes.get(acepta.idPerfilSeguidor);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
    return retornarExito(res,"La aceptacion de la solicitud fue enviada",aux)

} catch (error) {
    console.log(`Error al contestar la solicitud de amistad:${error}`)
    return retornarError(res)
}
}
export async function crearComentario(req,res){
    try {
        let aux,com;
        com=req.body;
        aux=await verificarYup(com,'comentario')
        if(aux instanceof Error){
            console.log(`Error al verificar la tipologia del comentario:${aux}`)
            return retornarError(res)
        }
        aux=await existeBd(com.idImagen,'imagen','id_imagen');
        if(aux instanceof Error){
            console.log(`Error al buscar la imagen:${aux}`)
            return retornarError(res);
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await existeBd(com.idPerfilComentador,'perfil','id_perfil');
        if(aux instanceof Error){
            console.log(`Error al buscar el perfil comentador${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await existeBd(com.idPerfilImagen,'perfil','id_perfil');
        if(aux instanceof Error){
            console.log(`Erroe al buscar el perfil propietario de la Imagen:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await Comentario.alta(com);
        if(aux instanceof Error){
            console.log(`Error al crear el comentario:${aux}`)
            return retornarError(res)
        }
        //devolver el mensaje a la persona dueña de la imagen
     // el id es aque perfil dirige la accion
            if (clientes.has(com.idPerfilImagen)) {
                const ws = clientes.get(com.idPerfilImagen);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
            return retornarExito(res,'Comentario enviado con exito')
        
    } catch (error) {
        console.log(`Error al crear comentario:${error}`);
        return retornarError(res)
    }

}
export async function traerSolicitudPorId(req,res){
    try {
        let aux;
        let id=req.body.id;
        aux=await existeBd(id,'solicitud_amistad','id_solicitud_amistad');
        if(aux instanceof Error){
            console.log(`Error al buscar la solicitud:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await SolicitudAmistad.consultaPorId(id);
         if(aux instanceof Error){
            console.log(`Error al buscar la solicitud por id:${aux}`)
            return retornarError(res)
         }
         retornarExito(res,"",aux)
    } catch (error) {
        console.log(`Error al buscar la solicitud por id;${error}`)
        return retornarError(res)
    }
}
export async function traerComentarioPorId(req,res){
        try {
            let id,aux
            id=req.body.id;
            aux=await existeBd(id,'comentario','id_comentario')
             if(aux instanceof Error){
                console.log(`Error al buscar el comentario:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await Comentario.consultaPorId(id);
        if(aux instanceof Error){
            console.log(`Error al ha cer la consulat de comentario:${aux}`)
            return retornarError(res)
        }
        retornarExito(res,"",aux)
            
        } catch (error) {
            console.log(`Error al buscar el comentario:${error}`)
            return retornarError(res)
        }
}
export async function contestarComentario(req,res){
try {
    let aux;
    let comContestado=req.body;
    aux=await verificarYup(comContestado,'comentarioContestado')
        if(aux instanceof Error){
            console.log(`Error al verificar la tipologia del comentario contestado:${aux}`)
            return retornarError(res)
        }
        aux=await existeBd(comContestado.idComentario,'comentario','id_comentario');
        if(aux instanceof Error){
            console.log(`Error al buscar el comentario:${aux}`)
            return retornarError(res);
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await existeBd(comContestado.idRemitente,'perfil','id_perfil');
        if(aux instanceof Error){
            console.log(`Error al buscar el perfil comentador${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError(res)
        }
        aux=await existeBd(comContestado.idDestinatario,'perfil','id_perfil');
        if(aux instanceof Error){
            console.log(`Error al buscar el perfil propietario de la Imagen:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await ComentarioContestado.alta(comContestado);
        if(aux instanceof Error){
            console.log(`Error al crear el comentario:${aux}`)
            return retornarError(res)
        }
        //devolver el mensaje a la persona dueña de la imagen
     // el id es aque perfil dirige la accion
            if (clientes.has(comContestado.idDestinatario)) {
                const ws = clientes.get(comContestado.idDestinatario);
                ws.send(JSON.stringify({ tipo: 'nuevaNotificacion' }));
            }
        
   
    return retornarExito(res,"el comentario se contesto correctamente",aux)
} catch (error) {
    console.log(`Error al contestar el comentario:${error}`)
    return retornarError(res)
}
}
export async function traerComentarioContestadoPorId(req,res){
 try {
            let id,aux
            id=req.body.id;
            aux=await existeBd(id,'comentario_contestado','id_comentario_contestado')
             if(aux instanceof Error){
                console.log(`Error al buscar el comentario contestado:${aux}`)
            return retornarError(res)
        }
        if(!aux){
            return retornarError(res)
        }
        aux=await ComentarioContestado.consultaPorId(id);
        if(aux instanceof Error){
            console.log(`Error al hacer la consulata de comentario contestado:${aux}`)
            return retornarError(res)
        }
        retornarExito(res,"",aux)
            
        } catch (error) {
            console.log(`Error al buscar el comentario contestado:${error}`)
            return retornarError(res)
        }
}

export default{
    generarSilicitudAmistad,
    buscarNotificacionesPorIdSolicitado,
    buscarNotificacionesNoLeidasPorIdSolicitado,
    marcarLeidaNotificacion,
    aceptarSolicitud,
    crearComentario,
    traerSolicitudPorId,
    traerComentarioPorId,
    contestarComentario,
    traerComentarioContestadoPorId
}