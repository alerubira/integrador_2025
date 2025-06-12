let divHacerComentario=document.getElementById('divHacerComentario');
 function hacerComentario(){
    mostrar(divHacerComentario);
}
let texComentario=document.getElementById('texComentario');

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
           ocultarDosElementos(divImagenUsuarioSeleccionada,divImagenesUsuario)
        }
}
}

async function cargarNotificacionComentario(notificacion,divNotificacion){
    
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
                            console.log(notificacion)
                            capturarNotificacionSeleccionada(notificacion);
                        });
                        divNotificaciones.appendChild(divNotificacion);
                        }
}
async function cargarNotificacionComentarioContestado(){
    
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
async function cargarNotificacionComentarioSeleccionado(){
                mostrar(divNotificacionomentarioSeleccionada);
                 let id={id:notificacionSeleccionada.id_solicitante_notificacion}
                 aux=await fechProtegidoPost('/traerComentarioPorId',id);
                if(aux.success){
                      comentarioCapturado=aux.retorno[0]
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
let texComentarioContestado=document.getElementById('texComentarioContestado');
async function contestarComentario(){
    bandera=true;
console.log(texComentarioContestado.value)
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
            idDestinatario:perfilMomentaneo.id_perfil
        }
        aux=await fechProtegidoPost('/contestarComentario',comContestado)
        if(aux.success){
             limpiarCampos(limpiar);
             ocultarDosElementos(divNotificacionomentarioSeleccionada,divImagenesUsuarios)
        }
}

}
function verComentarios(){
  console.log("ver comentarios")
}