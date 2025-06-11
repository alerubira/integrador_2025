
// Conecta el WebSocket al cargar la página
const ws = new WebSocket('ws://localhost:3000');

// Envía el idPerfil al conectar (para asociar el socket en el servidor)
ws.onopen = () => {
    ws.send(JSON.stringify({ idPerfil: perfil.idPerfil }));
};

// Escucha mensajes del servidor
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.tipo === 'nuevaNotificacion') {
        notificacionesNoLidas(); // Llama a tu función para actualizar el DOM
    }
};
let divNotificacionesNoLeidas=document.getElementById('divNotificacionesNoLeidas');
async function notificacionesNoLidas(){
    let id={
        idPerfilSolicitado:perfil.idPerfil
    }
   aux=await fechProtegidoPost('/buscarNotificacionesNoLeidas',id)
   eliminarHijos(divNotificacionesNoLeidas)
   if(aux.success){
    if(aux.retorno.length>0){
        let p=document.createElement('p');
        p.textContent=`Tiene ${aux.retorno.length} Notificaciones sin leer`;
        divNotificacionesNoLeidas.appendChild(p);
    }else{eliminarHijos(divNotificacionesNoLeidas)}
   }
}

notificacionesNoLidas();
let notificaciones,perfilMomentaneo;
let divNotificaciones=document.getElementById('divNotificaciones');   
async function VerNotificaciones(){
    fOcultar();
    limpiarCampos(limpiar);
    eliminarHijos(divNotificaciones);
    mostrar(divNotificaciones);
    let btnCerrar=document.createElement('button');
    btnCerrar.className="botonCerrar";
    btnCerrar.onclick=() => ocultarDosElementos(divNotificaciones,divImagenesUsuarios);
    divNotificaciones.appendChild(btnCerrar);
    let id={
        idPerfilSolicitado:perfil.idPerfil
    }
aux=await fechProtegidoPost('/buscarNotificaciones',id)
if(aux.success){
        notificaciones=aux.retorno;
        console.log(notificaciones)
        if(notificaciones.length<1){alerta(pagina,"NoTiene Notificaciones")}
       for(let notificacion of notificaciones) {
             let divNotificacion = document.createElement('div');
             divNotificacion.className = 'divNotificacion';

             if(notificacion.id_tipo_notificacion===1){
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
             if(notificacion.id_tipo_notificacion===2){
                  
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
             if(notificacion.id_tipo_notificacion===3){
                        id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id);
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
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombre_persona} ${perfilMomentaneo.apellido_persona} a comentado una foto tuya`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            capturarNotificacionSeleccionada(notificacion,perfilMomentaneo);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        }
                        }
             if(notificacion.id_tipo_notificacion===4){

             }
             
       

}
}
}
let divNotificacionSeleccionada=document.getElementById('divNotificacionSeleccionada');
let imgNotificacionseleccionada=document.getElementById('imgNotificacionseleccionada');
let datosPersona=document.getElementById('datosPersona');
let datosPerfil=document.getElementById('datosPerfil');
let interesesPerfil=document.getElementById('interesesPerfil');
let antecedentesPerfil=document.getElementById('antecedentesPerfil');
let botonAceptarSolicitud=document.getElementById('botonAceptarSolicitud');
let pSolicitusAceptada=document.getElementById('pSolicitusAceptada');

async function capturarNotificacionSeleccionada(notificacion,perfilMomentaneo){
     eliminarHijos(divNotificaciones);
    fOcultar()
    limpiarCampos(limpiar);
    console.log(notificacion)
      if(notificacion.id_tipo_notificacion===1){
                mostrar(divNotificacionSeleccionada);
                //hacer loa endpi completo para traer la solicirud o el comentario por id_notificacion,clases y procesar de nuevo la informacion
                if (!perfilMomentaneo.img_perfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionada.src=perfilMomentaneo.img_perfil}
                datosPersona.textContent=`Nombre:${perfilMomentaneo.nombre_persona}-Apellido:${perfilMomentaneo.apellido_persona}`;
                datosPerfil.textContent=`Nombre del Perfil:${perfilMomentaneo.nombre_perfil}`;
                let inte;
                if(!perfilMomentaneo.intereses_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.intereses_perfil;
                }
                interesesPerfil.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentes_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentes_perfil;
                }
                antecedentesPerfil.textContent=`Antecedentes:${inte}`;
                if(notificacion.solicitud_aceptada===1){
                    botonAceptarSolicitud.style.display='none';
                    pSolicitusAceptada.textContent="Esta Solicitud ya fue Aceptada"
                }
            }
     if(notificacion.id_tipo_notificacion===2){
             mostrar(divNotificacionSeleccionada);
                if (!perfilMomentaneo.img_perfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionada.src=perfilMomentaneo.img_perfil}
                datosPersona.textContent=`Nombre:${perfilMomentaneo.nombre_persona}-Apellido:${perfilMomentaneo.apellido_persona}`;
                datosPerfil.textContent=`Nombre del Perfil:${perfilMomentaneo.nombre_perfil}`;
                let inte;
                if(!perfilMomentaneo.intereses_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.intereses_perfil;
                }
                interesesPerfil.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentes_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentes_perfil;
                }
                antecedentesPerfil.textContent=`Antecedentes:${inte}`;
                if(notificacion.solicitud_aceptada===1){
                    botonAceptarSolicitud.style.display='none';
                    pSolicitusAceptada.textContent="Acepto tu solicitud de amistad"
                }
     }
     if(notificacion.id_tipo_notificacion===3){
        console.log(notificacion,perfilMomentaneo);
     }
     if(notificacion.id_tipo_notificacion===4){
        
     }
   
   notificacionSeleccionada=notificacion;

   let ids={
    idNotificacion:notificacion.id_notificacion,
    idPerfil:perfil.idPerfil
   }
   aux=await fechProtegidoPost('/marcarLeidaNotificacion',ids)
   
   
}
let notificacionSeleccionada;
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