
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
let notificaciones,perfilMomentaneo,notificacionS;
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
        if(notificaciones.length<1){alerta(pagina,"NoTiene Notificaciones")}
       for(let notificacion of notificaciones) {
        //console.log(notificacion)
             let divNotificacion = document.createElement('div');
             divNotificacion.className = 'divNotificacion';

             if(notificacion.id_tipo_notificacion===1){
                cargarNotificacionSolicitud(notificacion,divNotificacion);
                  
                        }
             if(notificacion.id_tipo_notificacion===2){
                  cargarNotificacionSolicitudContestada(notificacion,divNotificacion);
                    
                }
             if(notificacion.id_tipo_notificacion===3){
                    cargarNotificacionComentario(notificacion,divNotificacion);
                        }
             if(notificacion.id_tipo_notificacion===4){
                    cargarNotificacionComentarioContestado(notificacion,divNotificacion);
             }
        }
}
}





async function capturarNotificacionSeleccionada(notificacion){
     eliminarHijos(divNotificaciones);
    fOcultar()
    limpiarCampos(limpiar);
    notificacionSeleccionada=notificacion;
      if(notificacion.id_tipo_notificacion===1){
                cargarSilicitudSeleccionada()
              
            }
     if(notificacion.id_tipo_notificacion===2){
             cargarSolicitudAceptadaSeleccionada()
            
     }
     if(notificacion.id_tipo_notificacion===3){
                cargarNotificacionComentarioSeleccionado()
               
     }
     if(notificacion.id_tipo_notificacion===4){
        cargarNotificacionComentarioContestadoSeleccionado()
     }
   
   

   let ids={
    idNotificacion:notificacion.id_notificacion,
    idPerfil:perfil.idPerfil
   }
   aux=await fechProtegidoPost('/marcarLeidaNotificacion',ids)
   
   
}
let notificacionSeleccionada;



