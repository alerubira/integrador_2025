let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');
async function traerImagenesPublicasPublicas(){
    eliminarHijos(divImagenesUsuarios);
    mostrar(divImagenesUsuarios);
    let perf={
        idPerfil:perfil.idPerfil
    }
    //aux=await fechProtegidoPost('/traerImagenesPublicas',perf)
    aux =await fechProtegidoPost('/traerImagenesPublicasPublicas',perf)
    if(aux.success){
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
        imgPerf.src=imagen.img_perfil;
        divImg.appendChild(imgPerf);
        let h6=document.createElement('h6');
        h6.textContent=`UUARIO:${imagen.nombre_persona},${imagen.apellido_persona},PERFIL:${imagen.nombre_perfil},TITULO:${imagen.titulo_imagen}`
         divImg.appendChild(h6);
          divImg.addEventListener('click', function() {
                        capturarImagen(imagen);
                    });
         divImagenesUsuarios.appendChild(divImg);
      }
    }
    
    
}
traerImagenesPublicasPublicas();
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
