async function aceptarSolicitud() {
    //y contestar la solicitud
    let acep={
        idSolicitudAmistad:notificacionSeleccionada.id_solicitud_amistad,
        idPerfilSeguido:perfil.idPerfil,
        idPerfilSeguidor:perfilMomentaneo.idPerfil,
        nombreAlbumSeguidor:`${perfil.nombrePersona},${perfil.apellidoPersona},${perfil.nombrePerfil}`,
        idSolicitanteNotificacion:notificacionSeleccionada.id_solicitante_notificacion,
        solicitudAceptada:true
    }
    aux=await fechProtegidoPost('/aceptarSolicitud',acep)
    if(aux.success){
     fOcultar();
    limpiarCampos(limpiar);
    }
}
async function rechazarSolicitud(){
    let acep={
        idSolicitudAmistad:notificacionSeleccionada.id_solicitud_amistad,
        idPerfilSeguido:perfil.idPerfil,
        idPerfilSeguidor:perfilMomentaneo.idPerfil,
        nombreAlbumSeguidor:`${perfil.nombrePersona},${perfil.apellidoPersona},${perfil.nombrePerfil}`,
        idSolicitanteNotificacion:notificacionSeleccionada.id_solicitante_notificacion,
        solicitudAceptada:false
    }
    aux=await fechProtegidoPost('/aceptarSolicitud',acep)
    if(aux.success){
     fOcultar();
    limpiarCampos(limpiar);
    }
}
async function cargarNotificacionSolicitud(notificacion,divNotificacion){
                    id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id)
                    if (perf.success){
                    perfilMomentaneo= perf.retorno;
                    //console.log(perfilMomentaneo)
                        let imgP=document.createElement('img');
                        imgP.classList="imgPerfil";
                        if (!perfilMomentaneo.imgPerfil) {
                            imgP.src = "imagenesPerfil/fotoPerfil.svg";
                        }else{imgP.src=perfilMomentaneo.imgPerfil}
                        if(!notificacion.leida_notificacion){divNotificacion.className="divNotNoLeida"}
                        divNotificacion.appendChild(imgP);
                        let h6N=document.createElement('h6');
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombrePersona} ${perfilMomentaneo.apellidoPersona} te ha enviado una solicitud de amistad`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            capturarNotificacionSeleccionada(notificacion,perfilMomentaneo);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        return true;
                        }
}
async function cargarNotificacionSolicitudContestada(notificacion,divNotificacion){
           id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id)
                    if (perf.success){
                    perfilMomentaneo= perf.retorno;
                    //console.log(perfilMomentaneo)
                        let imgP=document.createElement('img');
                        imgP.classList="imgPerfil";
                        if (!perfilMomentaneo.imgPerfil) {
                            imgP.src = "imagenesPerfil/fotoPerfil.svg";
                        }else{imgP.src=perfilMomentaneo.imgPerfil}
                        if(!notificacion.leida_notificacion){divNotificacion.className="divNotNoLeida"}
                        divNotificacion.appendChild(imgP);
                        let h6N=document.createElement('h6');
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombrePersona} ${perfilMomentaneo.apellidoPersona} respondio tu solicitud de amistad`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            capturarNotificacionSeleccionada(notificacion,perfilMomentaneo);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        return true;
                    }
}
let divNotificacionSeleccionada=document.getElementById('divNotificacionSeleccionada');
let imgNotificacionseleccionada=document.getElementById('imgNotificacionseleccionada');
let datosPersona=document.getElementById('datosPersona');
let datosPerfil=document.getElementById('datosPerfil');
let interesesPerfil=document.getElementById('interesesPerfil');
let antecedentesPerfil=document.getElementById('antecedentesPerfil');
let botonAceptarSolicitud=document.getElementById('botonAceptarSolicitud');
let botonRechazarSolicitud=document.getElementById('botonRechazarSolicitud')
let pSolicitusAceptada=document.getElementById('pSolicitusAceptada');
let solicitudCapturada;
async function cargarSilicitudSeleccionada(){
           mostrar(divNotificacionSeleccionada);
                
                let id={id:notificacionSeleccionada.id_solicitud_amistad}
                 aux=await fechProtegidoPost('/traerSolicitudPorId',id);
                if(aux.success){
                      solicitudCapturada=aux.retorno[0]
                    }
                   // console.log(solicitudCapturada)
                 id={
                    id:solicitudCapturada.id_perfil_solicitante
                }
                let perf=await fechProtegidoPost('/buscarPerfilPorid',id);
                    if (perf.success){
                    perfilMomentaneo= perf.retorno;
                        if (!perfilMomentaneo.imgPerfil) {
                            imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                        }else{imgNotificacionseleccionada.src=perfilMomentaneo.imgPerfil}
                        datosPersona.textContent=`Nombre:${perfilMomentaneo.nombrePersona}-Apellido:${perfilMomentaneo.apellidoPersona}`;
                        datosPerfil.textContent=`Nombre del Perfil:${perfilMomentaneo.nombrePerfil}`;
                        let inte;
                        if(!perfilMomentaneo.intereses){
                            inte="No Contiene";
                        }else{
                            inte=perfilMomentaneo.intereses;
                        }
                        interesesPerfil.textContent=`Intereses:${inte}`;
                        if(!perfilMomentaneo.antecedentes){
                            inte="No Contiene";
                        }else{
                            inte=perfilMomentaneo.antecedentes;
                        }
                        antecedentesPerfil.textContent=`Antecedentes:${inte}`;
                        if(solicitudCapturada.solicitud_aceptada===1){
                            botonAceptarSolicitud.style.display='none';
                            botonRechazarSolicitud.style.display='none'
                            pSolicitusAceptada.textContent="Esta Solicitud ya fue Aceptada"
                        }
                        if(solicitudCapturada.solicitud_aceptada===0){
                            botonAceptarSolicitud.style.display='none';
                            botonRechazarSolicitud.style.display='none';
                            pSolicitusAceptada.textContent="Esta Solicitud fue RECHAZADA"
                        }
                    }        
}

async function cargarSolicitudAceptadaSeleccionada(){
     mostrar(divNotificacionSeleccionada);
               let id={id:notificacionSeleccionada.id_solicitud_amistad}
                aux=await fechProtegidoPost('/traerSolicitudPorId',id);
                if(aux.success){
                      solicitudCapturada=aux.retorno[0]
                      console.log(solicitudCapturada)
                }
                id={
                    id:solicitudCapturada.id_perfil_solicitado
                }
                let perf=await fechProtegidoPost('/buscarPerfilPorid',id);
                    if (perf.success){
                    perfilMomentaneo= perf.retorno;
                    }
                if (!perfilMomentaneo.imgPerfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionada.src=perfilMomentaneo.imgPerfil}
                datosPersona.textContent=`Nombre:${perfilMomentaneo.nombrePersona}-Apellido:${perfilMomentaneo.apellidoPersona}`;
                datosPerfil.textContent=`Nombre del Perfil:${perfilMomentaneo.nombrePerfil}`;
                let inte;
                if(!perfilMomentaneo.intereses){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.intereses;
                }
                interesesPerfil.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentes){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentes;
                }
                antecedentesPerfil.textContent=`Antecedentes:${inte}`;
                
                if(solicitudCapturada.solicitud_aceptada===1){
                    botonAceptarSolicitud.style.display='none';
                    botonRechazarSolicitud.style.display='none' 
                    pSolicitusAceptada.textContent="Acepto tu solicitud de amistad"
                }
                 if(solicitudCapturada.solicitud_aceptada===0){
                    botonAceptarSolicitud.style.display='none';
                     botonRechazarSolicitud.style.display='none' 
                    pSolicitusAceptada.textContent="RECHAZO tu solicitud de amistad"
                }

}