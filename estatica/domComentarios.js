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
           ocultarDosElementos(divImagenUsuarioSeleccionada,divImagenesUsuari)
        }
}
}

async function cargarNotificacionComentario(){
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
async function cargarNotificacionComentarioContestado(){
    
}
function verComentarios(){
  console.log("ver comentarios")
}