let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');
let imagenePublicaPublicas;
async function traerImagenesPublicasPublicas(){
    eliminarHijos(divImagenesUsuarios);
    mostrar(divImagenesUsuarios);
    let perf={
        idPerfil:perfil.idPerfil
    }
    if(imgFiltradas){
      llenarImagenes(imgFiltradas,6)
    }
    aux=await fechProtegidoPost('/traerImagenesEtiqutadasPersonal',perf)
    if(aux.success){
      llenarImagenes(aux.retorno,5)
    }
    aux=await fechProtegidoPost('/traerImagenesParaSeguidores',perf)
    if(aux.success){
      llenarImagenes(aux.retorno,3)
    }
    aux =await fechProtegidoPost('/traerImagenesPublicasPublicas',perf)
    if(aux.success){
      imagenePublicaPublicas=aux.retorno;
      llenarImagenes(aux.retorno,2)
    }
    
    
}
traerImagenesPublicasPublicas();
function llenarImagenes(imagenes,tipoVisibilidad){
         for(let imagen of imagenes){
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
               if(tipoVisibilidad===2){
               let h6m=document.createElement('h6');
               h6m.textContent=`Publicacion solo para usuarios:`
               divImg.appendChild(h6m);
               }
                if(tipoVisibilidad===3){
                  let h6m=document.createElement('h6');
                h6m.textContent=`Publicacion solo para seguidores de:`
                divImg.appendChild(h6m);
              }
               if(tipoVisibilidad===5){
                  let h6m=document.createElement('h6');
                h6m.textContent=`Publicacion exclusiva parti:`
                divImg.appendChild(h6m);
              }
               if(tipoVisibilidad===6){
                  let h6m=document.createElement('h6');
                h6m.textContent=`Imagen Publicada bajola Etiqueta:${tagFiltrado.nombre_tags}`
                divImg.appendChild(h6m);
              }
                h6.textContent=`USARIO:${imagen.nombre_persona},${imagen.apellido_persona},PERFIL:${imagen.nombre_perfil},TITULO:${imagen.titulo_imagen}`
                divImg.appendChild(h6);
               let h66=document.createElement('h6');
                h66.textContent=`Fecha De Creacion :${formatearFecha(imagen.fecha_creacion_imagen)}`;
                divImg.appendChild(h66)
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
let idImagen={
       idImagen:imgSeleccionada.id_imagen
  }
  aux=await traerComentarios(idImagen)
}  

  
