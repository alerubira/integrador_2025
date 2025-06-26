let divHacerComentario=document.getElementById('divHacerComentario');
 function hacerComentario(){
    mostrar(divHacerComentario);
}
let texComentario=document.getElementById('texComentario');
//let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');
async function enviarComentario(){
  let comen=texComentario.value;
  bandera=true;
  if(comen.length<2||comen.length>parametros.tamaño4){
                    alerta(pagina,`El comentario es obligatorio y ${parametros.cartelTamaño4}`)
                    bandera=false;
                }
  if(bandera){
        let comentario={
        idImagen:imgSeleccionada.id_imagen,
        idPerfilComentador:perfil.idPerfil,
        idPerfilImagen:imgSeleccionada.id_perfil,//agregar en la consulta idPrfil al que peryenece la imagen
        textoComentario:comen
        }
        auw=await fechProtegidoPost('/enviarComentario',comentario);
        if(aux.success){
           ocultarDosElementos(divImagenUsuarioSeleccionada,divImagenesUsuarios)
        }
}
}

async function cargarNotificacionComentario(notificacion,divNotificacion){
    
                  id={
                        id:notificacion.id_remitente
                    }
                    let perf=await fechProtegidoPost('/buscarPerfilPorid',id);
                    if (perf.success){
                        perfilMomentaneo="";
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
                        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombrePersona} ${perfilMomentaneo.apellidoPersona} a comentado una foto tuya`;
                        divNotificacion.appendChild(h6N);
                        divNotificacion.addEventListener('click', function() {
                            
                            capturarNotificacionSeleccionada(notificacion);
                       
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        return true
                        }
}
async function cargarNotificacionComentarioContestado(notificacion,divNotificacion){
    id={
        id:notificacion.id_remitente
    }
    let perf=await fechProtegidoPost('/buscarPerfilPorid',id);
    if (perf.success){
        perfilMomentaneo="";
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
        h6N.textContent=`En la Fecha:${formatearFecha(notificacion.fecha_notificacion)},${perfilMomentaneo.nombrePersona} ${perfilMomentaneo.apellidoPersona} a respondido aun comentario`;
        divNotificacion.appendChild(h6N);
        divNotificacion.addEventListener('click', function() {
            capturarNotificacionSeleccionada(notificacion);
        });
        divNotificaciones.appendChild(divNotificacion);
        return true;
        }
}
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
let perfiMomentaneoComentario;
let texConCon=document.getElementById('texConCon')
async function cargarNotificacionComentarioSeleccionado(){
                mostrar(divNotificacionomentarioSeleccionada);
                     let idP={
                            id:notificacionSeleccionada.id_remitente
                        }
                        let perf=await fechProtegidoPost('/buscarPerfilPorid',idP);
                        if (perf.success){
                            perfilMomentaneo="";
                        perfilMomentaneo= perf.retorno;
                        }
                 let id={id:notificacionSeleccionada.id_solicitante_notificacion}
                 aux=await fechProtegidoPost('/traerComentarioPorId',id);
                if(aux.success){
                      comentarioCapturado=aux.retorno[0]
                   }
                if (!perfilMomentaneo.imgPerfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionadaC.src=perfilMomentaneo.imgPerfil}
                datosPersonaC.textContent=`Nombre:${perfilMomentaneo.nombrePersona}-Apellido:${perfilMomentaneo.apellidoPersona}`;
                datosPerfilC.textContent=`Nombre del Perfil:${perfilMomentaneo.nombrePerfil}`;
                let inte;
                if(!perfilMomentaneo.interesesPerfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.interesesPerfil;
                }
                interesesPerfilC.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentesPerfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentesPerfil;
                }
                antecedentesPerfilC.textContent=`Antecedentes:${inte}`; 
                imgComentario.src=comentarioCapturado.url_imagen

                tituloImagenComentario.textContent=`Titulo:${comentarioCapturado.titulo_imagen}`
                comentarioImagen.textContent=`Comentario:${comentarioCapturado.texto_comentario}` 
                texComentarioContestado.style.display="block" 
                botonContestarComentario.style.display="block"
}
let h6comentarioContestado=document.getElementById('h6comentarioContestado');
let comentarioContestadoCapturado;
async function cargarNotificacionComentarioContestadoSeleccionado(){
   //acomodar en el divNotificacionomentarioSeleccionada
    mostrar(divNotificacionomentarioSeleccionada);
               let idP={
                       id:notificacionSeleccionada.id_remitente
                        }
                      let perf=await fechProtegidoPost('/buscarPerfilPorid',idP);
                      if (perf.success){
                     perfilMomentaneo="";
                    perfilMomentaneo= perf.retorno;
                      }
                 let id={id:notificacionSeleccionada.id_solicitante_notificacion}
                 aux=await fechProtegidoPost('/traerComentarioContestadoPorId',id);
                if(aux.success){
                    //console.log(aux)
                      comentarioContestadoCapturado=aux.retorno[0];
                      //console.log(comentarioContestadoCapturado)
                   }
                if (!perfilMomentaneo.imgPerfil) {
                    imgNotificacionseleccionada.src = "imagenesPerfil/fotoPerfil.svg";
                }else{imgNotificacionseleccionadaC.src=perfilMomentaneo.imgPerfil}
                datosPersonaC.textContent=`Nombre:${perfilMomentaneo.nombrePersona}-Apellido:${perfilMomentaneo.apellidoPersona}`;
                datosPerfilC.textContent=`Nombre del Perfil:${perfilMomentaneo.nombrePerfil}`;
                let inte;
                if(!perfilMomentaneo.interesesPerfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.interesesPerfil;
                }
                interesesPerfilC.textContent=`Intereses:${inte}`;
                if(!perfilMomentaneo.antecedentesPerfil){
                    inte="No Contiene";
                }else{
                    inte=perfilMomentaneo.antecedentesPerfil;
                }
                antecedentesPerfilC.textContent=`Antecedentes:${inte}`; 
                imgComentario.src=comentarioContestadoCapturado.url_imagen

                tituloImagenComentario.textContent=`Titulo:${comentarioContestadoCapturado.titulo_imagen}`
                comentarioImagen.textContent=`Comentario:${comentarioContestadoCapturado.texto_comentario}` 
                h6comentarioContestado.textContent=`Respuesta de comentario;${comentarioContestadoCapturado.texto_comentario_contestado}`
                texComentarioContestado.style.display="none" 
                botonContestarComentario.style.display="none"
            }

let texComentarioContestado=document.getElementById('texComentarioContestado');
async function contestarComentario(){
    bandera=true;
let value=texComentarioContestado.value;
if(value.length<1||value.length>parametros.cartelTamaño4){
    alerta(pagina,`La Contestacion es obligatoria y ${parametros.cartelTamaño4}`)
    bandera=false;
}
if(bandera){
        let comContestado={
            idComentario:comentarioCapturado.id_comentario,
            textoComentarioContestado:value,
            idRemitente:perfil.idPerfil,
            idDestinatario:perfilMomentaneo.idPerfil
        }
        aux=await fechProtegidoPost('/contestarComentario',comContestado)
        if(aux.success){
             limpiarCampos(limpiar);
             ocultarDosElementos(divNotificacionomentarioSeleccionada,divImagenesUsuarios)
        }
}

}
