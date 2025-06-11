
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
                cargarNotificacionSolicitud();
                  
                        }
             if(notificacion.id_tipo_notificacion===2){
                  cargarNotificacionSolicitudContestada();
                    
                }
             if(notificacion.id_tipo_notificacion===3){
                    cargarNotificacionComentario();
                        }
             if(notificacion.id_tipo_notificacion===4){
                    cargarNotificacionComentarioContestado();
             }
        }
}
}
//trasladar para abajo
let divNotificacionSeleccionada=document.getElementById('divNotificacionSeleccionada');
let imgNotificacionseleccionada=document.getElementById('imgNotificacionseleccionada');
let datosPersona=document.getElementById('datosPersona');
let datosPerfil=document.getElementById('datosPerfil');
let interesesPerfil=document.getElementById('interesesPerfil');
let antecedentesPerfil=document.getElementById('antecedentesPerfil');
let botonAceptarSolicitud=document.getElementById('botonAceptarSolicitud');
let pSolicitusAceptada=document.getElementById('pSolicitusAceptada');
let solicitudCapturada;
let comentarioCapturado;
let divNotificacionomentarioSeleccionada=document.getElementById('divNotificacionomentarioSeleccionada');
let imgNotificacionseleccionadaC=document.getElementById('imgNotificacionseleccionadaC');
let datosPersonaC=document.getElementById('datosPersonaC');
let datosPerfilC=document.getElementById('datosPerfilC');
let interesesPerfilC=document.getElementById('interesesPerfilC');
let antecedentesPerfilC=document.getElementById('antecedentesPerfilC');
let imgComentario=document.getElementById('imgComentario');
let tituloImagenComentario=document.getElementById('tituloImagenComentario');
let comentarioImagen=document.getElementById('comentarioImagen');


async function capturarNotificacionSeleccionada(notificacion,perfilMomentaneo){
     eliminarHijos(divNotificaciones);
    fOcultar()
    limpiarCampos(limpiar);
      if(notificacion.id_tipo_notificacion===1){
                mostrar(divNotificacionSeleccionada);
                let id={id:notificacion.id_solicitante_notificacion}
                 aux=await fechProtegidoPost('/traerSolicitudPorId',id);
                if(aux.success){
                      solicitudCapturada=aux.retorno[0]
                      console.log(solicitudCapturada)
                }
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
                if(solicitudCapturada.solicitud_aceptada===1){
                    botonAceptarSolicitud.style.display='none';
                    pSolicitusAceptada.textContent="Esta Solicitud ya fue Aceptada"
                }
            }
     if(notificacion.id_tipo_notificacion===2){
             mostrar(divNotificacionSeleccionada);
               let id={id:notificacion.id_solicitante_notificacion}
                aux=await fechProtegidoPost('/traerSolicitudPorId',id);
                if(aux.success){
                      solicitudCapturada=aux.retorno[0]
                      console.log(solicitudCapturada)
                }
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
                
                if(solicitudCapturada.solicitud_aceptada===1){
                    botonAceptarSolicitud.style.display='none';
                    pSolicitusAceptada.textContent="Acepto tu solicitud de amistad"
                }
     }
     if(notificacion.id_tipo_notificacion===3){
                console.log(notificacion,perfilMomentaneo);
                mostrar(divNotificacionomentarioSeleccionada);
                 let id={id:notificacion.id_solicitante_notificacion}
                 aux=await fechProtegidoPost('/traerComentarioPorId',id);
                if(aux.success){
                      comentarioCapturado=aux.retorno[0]
                      console.log(comentarioCapturado)
                   }
                if (!perfilMomentaneo.img_perfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionadaC.src=perfilMomentaneo.img_perfil}
                datosPersonaC.textContent=`Nombre:${perfilMomentaneo.nombre_persona}-Apellido:${perfilMomentaneo.apellido_persona}`;
                datosPerfilC.textContent=`Nombre del Perfil:${perfilMomentaneo.nombre_perfil}`;
                let inte;
                if(!perfilMomentaneo.intereses_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.intereses_perfil;
                }
                interesesPerfilC.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentes_perfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentes_perfil;
                }
                antecedentesPerfilC.textContent=`Antecedentes:${inte}`; 
                imgComentario.src=comentarioCapturado.url_imagen

                tituloImagenComentario.textContent=`Titulo:${comentarioCapturado.titulo_imagen}`
                comentarioImagen.textContent=`Comentario:${comentarioCapturado.texto_comentario}` 

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

let texComentarioContestado=document.getElementById('texComentarioContestado');

async function contestarComentario(){
console.log(texComentarioContestado.value)
limpiarCampos(limpiar);
ocultarDosElementos(divNotificacionomentarioSeleccionada,divImagenesUsuarios)
}