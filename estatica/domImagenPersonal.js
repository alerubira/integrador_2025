let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');

async function traerImagenesPublicasPublicas(){
    eliminarHijos(divImagenesUsuarios);
    mostrar(divImagenesUsuarios);
    let perf={
        idPerfil:perfil.idPerfil
    }
    aux=await fechProtegidoPost('/traerImagenesParaSeguidores',perf)
    if(aux.success){
      llenarImagenes(aux.retorno)
    }
    aux =await fechProtegidoPost('/traerImagenesPublicasPublicas',perf)
    if(aux.success){
      llenarImagenes(aux.retorno)
    }
    
    
}
traerImagenesPublicasPublicas();
function llenarImagenes(imagenes){
         for(let imagen of aux.retorno){
        let divImg=document.createElement('div');
        divImg.className="divContenedorImagen1"
        let imgpublica=document.createElement('img');
         imgpublica.className="imagenAlbun";
         imgpublica.src=imagen.url_imagen;
         divImg.appendChild(imgpublica);
         let br=document.createElement('br');
         divImg.appendChild(br);
         let imgPerf=document.createElement('img');
          imgPerf.className="imgPerfil";
                if(!imagen.img_perfil){
                    imgPerf.src="/imagenesPerfil/fotoPerfil.svg"
                }else{
                  imgPerf.src=imagen.img_perfil;
                }
        
        divImg.appendChild(imgPerf);
        let h6=document.createElement('h6');
        h6.textContent=`USARIO:${imagen.nombre_persona},${imagen.apellido_persona},PERFIL:${imagen.nombre_perfil},TITULO:${imagen.titulo_imagen}`
         divImg.appendChild(h6);
          divImg.addEventListener('click', function() {
                        capturarImagen(imagen);
                    });
         divImagenesUsuarios.appendChild(divImg);
      }
}

let imagenSeleccionada=document.getElementById('imagenSeleccionada');
let divImagenUsuarioSeleccionada=document.getElementById('divImagenUsuarioSeleccionada');
let datosPersonaImgSeleccionada=document.getElementById('datosPersonaImgSeleccionada');
let datosPerfilImgSeleccionado=document.getElementById('datosPerfilImgSeleccionado');
let imgSeleccionada;
let nombreImagenSeleccionada=document.getElementById('nombreImagenSeleccionada');
let captionImagenSeleccionada=document.getElementById('captionImagenSeleccionada');
let imgPerfilSeleccionad=document.getElementById('imgPerfilSeleccionad');

async function capturarImagen(imagenCapturada){
    //eliminarHijos(divImagenesUsuarios);
    eliminarHijos(divComentariosImagen)
    limpiarCampos(limpiar);
    ocultarDosElementos(divImagenUsuarioSeleccionada,divImagenesUsuarios)
    mostrar(divImagenUsuarioSeleccionada);
    imagenSeleccionada.src=imagenCapturada.url_imagen
    imgPerfilSeleccionad.src=imagenCapturada.img_perfil;
    datosPersonaImgSeleccionada.textContent=`Usuario:${imagenCapturada.nombre_persona},${imagenCapturada.apellido_persona}`
    datosPerfilImgSeleccionado.textContent=`Perfil:${imagenCapturada.nombre_perfil}`
    nombreImagenSeleccionada.textContent=`nombre de la imagen:${imagenCapturada.titulo_imagen}`;
    captionImagenSeleccionada.textContent=`caption de la Imagen:${imagenCapturada.caption_imagen}`
    imgSeleccionada=imagenCapturada;
}
let divComentariosImagen=document.getElementById('divComentariosImagen');

async function verComentarios(){
  eliminarHijos(divComentariosImagen);
  
  let idImagen={
       idImagen:imgSeleccionada.id_imagen
  }
  aux= await fechProtegidoPost('/traerComentariosPorIdImagen',idImagen)
  
  if(aux.success){
    let comentarios=aux.retorno;
        if(comentarios.length<1){
          let h6=document.createElement('h6');
          h6.textContent="Esta imagen no contiene comentarios";
          divComentariosImagen.appendChild(h6)
        }else{
               for(let com of comentarios){
                  let idP={
                      id:com.id_perfil_comentador
                      }
                   let perf=await fechProtegidoPost('/buscarPerfilPorid',idP);
                    if (perf.success){
                                  let perfi=perf.retorno[0];
                                  
                                  let imgP=document.createElement('img');
                                  imgP.className="imgPerfil";
                                  if(!perfi.img_perfil){
                                         imgP.src="/imagenesPerfil/fotoPerfil.svg"
                                  }else{
                                         imgP.src=perfi.img_perfil;
                                  }
                                  let h66=document.createElement('h6');
                                  h66.appendChild(imgP);
                                  h66.append(`${perfi.nombre_persona} ${perfi.apellido_persona}Comento:${com.texto_comentario}`);
                                  divComentariosImagen.appendChild(h66);
                                  
                                  let idC={
                                    idC:com.id_comentario
                                  }
                                  
                                  let cC=await fechProtegidoPost('/buscarContestadosPorComentario',idC);
                                  if(cC.success){
                                    
                                    if(cC.retorno.length>0){
                                      for(let cc of cC.retorno){
                                           let h6C=document.createElement('h6');
                                           h6C.className="h6cc";
                                           h6C.textContent=`Respuesta:${cc.texto_comentario_contestado}`
                                           divComentariosImagen.appendChild(h6C);
                                      }
                                      

                                  }
                                  }
        }
  }
  
        }}}

  
