async function aceptarSolicitud() {
    //y contestar la solicitud
    let acep={
        idPerfilSeguido:perfil.idPerfil,
        idPerfilSeguidor:perfilMomentaneo.id_perfil,
        nombreAlbumSeguidor:`${perfil.nombrePersona},${perfil.apellidoPersona},${perfil.nombrePerfil}`,
        idSolicitanteNotificacion:notificacionSeleccionada.id_solicitante_notificacion
    }
    aux=await fechProtegidoPost('/aceptarSolicitud',acep)
    if(aux.success){
     fOcultar();
    limpiarCampos(limpiar);
    }
}
async function cargarNotificacionSolicitud(){
      id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id)
                    if (perf.success){
                    perfilMomentaneo= perf.retorno[0];
                    //console.log(perfilMomentaneo)
                        let imgP=document.createElement('img');
                        imgP.classList="imgPerfil";
                        if (!perfilMomentaneo.img_perfil) {
                            imgP.src = "imagenesPerfil/fotoPerfil.svg";
                        }else{imgP.src=perfilMomentaneo.img_perfil}
                        if(!notificacion.leida_notificacion){divNotificacion.className="divNotNoLeida"}
                        divNotificacion.appendChild(imgP);
                        let h6N=document.createElement('h6');
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombre_persona} ${perfilMomentaneo.apellido_persona} te ha enviado una solicitud de amistad`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            capturarNotificacionSeleccionada(notificacion,perfilMomentaneo);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        }
}
async function cargarNotificacionSolicitudContestada(){
           id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id)
                    if (perf.success){
                    perfilMomentaneo= perf.retorno[0];
                    //console.log(perfilMomentaneo)
                        let imgP=document.createElement('img');
                        imgP.classList="imgPerfil";
                        if (!perfilMomentaneo.img_perfil) {
                            imgP.src = "imagenesPerfil/fotoPerfil.svg";
                        }else{imgP.src=perfilMomentaneo.img_perfil}
                        if(!notificacion.leida_notificacion){divNotificacion.className="divNotNoLeida"}
                        divNotificacion.appendChild(imgP);
                        let h6N=document.createElement('h6');
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombre_persona} ${perfilMomentaneo.apellido_persona} acepto tu solicitud de amistad`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            capturarNotificacionSeleccionada(notificacion,perfilMomentaneo);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                    }
}