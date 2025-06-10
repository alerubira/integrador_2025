let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');
async function traerImagenesPublcas(){
    eliminarHijos(divImagenesUsuarios);
    let perf={
        idPerfil:perfil.idPerfil
    }
    aux=await fechProtegidoPost('/traerImagenesPublicas',perf)
    console.log(aux.retorno);
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
        h6.textContent=`Usuario:${imagen.nombre_persona},${imagen.apellido_persona},Perfil:${imagen.nombre_perfil}`
         divImg.appendChild(h6);
          divImg.addEventListener('click', function() {
                        capturarImagen(imagen);
                    });
         divImagenesUsuarios.appendChild(divImg);
      }
    }
    
    
}
traerImagenesPublcas();
let imagenSeleccionada=document.getElementById('imagenSeleccionada');
let divImagenUsuarioSeleccionada=document.getElementById('divImagenUsuarioSeleccionada');

async function capturarImagen(imagenCapturada){
    //eliminarHijos(divImagenesUsuarios);
    mostrar(divImagenUsuarioSeleccionada);
console.log(imagenCapturada)
imagenSeleccionada.src=imagenCapturada.url_imagen

}