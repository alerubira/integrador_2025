pagina="Visitantes";
let divImagenesPublicas=document.getElementById('divImagenesPublicas')
async function traerImagenesPublicas(){
    eliminarHijos(divImagenesPublicas);
    //mostrar(divImagenesUsuarios);
    /*let perf={
        idPerfil:12
    }
   /* if(imgFiltradas){
      llenarImagenes(imgFiltradas,6)
    }
    aux=await fechProtegidoPost('/traerImagenesEtiqutadasPersonal',perf)
    if(aux.success){
      llenarImagenes(aux.retorno,5)
    }
    aux=await fechProtegidoPost('/traerImagenesParaSeguidores',perf)
    if(aux.success){
      llenarImagenes(aux.retorno,3)
    }*/
    aux =await fechProtegidoPost('/traerImagenesPublicas')
    if(aux.success){
      //imagenePublicaPublicas=aux.retorno;
      llenarImagenes(aux.retorno)
    }
    function llenarImagenes(imagenes){
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
               /*if(tipoVisibilidad===2){
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
              }*/
        h6.textContent=`USARIO:${imagen.nombre_persona},${imagen.apellido_persona},PERFIL:${imagen.nombre_perfil},TITULO:${imagen.titulo_imagen}`
         divImg.appendChild(h6);
       
          divImg.addEventListener('click', function() {
                        capturarSeleccion();
                    });
         divImagenesPublicas.appendChild(divImg);
      }
}
    
    
}
traerImagenesPublicas();
function capturarSeleccion(){
    alerta(pagina,"Para acceder al las imagenes debe estar registrado")
}