pagina="Visitantes";
let divImagenesPublicas=document.getElementById('divImagenesPublicas')
async function traerImagenesPublicas(){
    eliminarHijos(divImagenesPublicas);
   
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
        h6.textContent=`USARIO:${imagen.nombre_persona},${imagen.apellido_persona},PERFIL:${imagen.nombre_perfil},TITULO:${imagen.titulo_imagen}`
         divImg.appendChild(h6);
        let h66=document.createElement('h6');
        h66.textContent=`Fecha De Creacion :${formatearFecha(imagen.fecha_creacion_imagen)}`;
        divImg.appendChild(h66)
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