let tblDenuncia=document.getElementById('tblDenuncia');
let cabeceraD=document.getElementById('cabeceraD');
let cuerpoD =document.getElementById('cuerpoD');
let divComentariosImagen=document.getElementById('divComentariosImagen');
let motivosDenuncia;
async function traerMotivosDenuncia(){
     let id={
        idProfesional:profesionalDePagina.idProfesional,
    }
  aux=await fechProtegidoPost('/traerMotivosDenuncia',id)
  if(aux.success){
    return aux.retorno;
  }
}
let motivo;
async function llenarTablaDenuncias(denuncias){
     motivosDenuncia=await traerMotivosDenuncia();
     eliminarHijos(cuerpoD);
     for(let denu of denuncias){
          let tr=document.createElement('tr');
          cuerpoD.appendChild(tr);
          agregarTdCuerpo(denu.idDenuncia,tr);
          agregarTdCuerpo(denu.idImagenDenunciada,tr)
          agregarTdCuerpo(denu.idPerfilDenunciante,tr);
          agregarTdCuerpo(denu.idPerfilDenunciado,tr);
          motivo=motivosDenuncia.find(motivo => motivo.idMotivoDenuncia === denu.idMotivoDenuncia);
          agregarTdCuerpo(motivo.nombreMotivoDenuncia,tr);
            if(denu.activoDenuncia===1){
               agregarTdCuerpo('Activo',tr);
          }else{
               agregarTdCuerpo('Inactivo',tr);
          }
          let  fecha=formatearFecha(denu.fechaDenuncia);
          agregarTdCuerpo(fecha,tr);
          
         
          let btn=document.createElement('button');
          btn.textContent='Seleccionar';
          btn.className = 'boton';
          btn.addEventListener('click', seleccionarDenuncia);
          let td=document.createElement('td');
          td.appendChild(btn);
          tr.appendChild(td);
     }
}
let divDenunciaSeleccionada=document.getElementById('divDenunciaSeleccionada')
let denuncia,imagenDenunciada,perfilDenunciado,perfilDenunciante;
let imagenDenunciadaI=document.getElementById('imagenDenunciadaI');
let nombreImagenDenunciada=document.getElementById('nombreImagenDenunciada');
let captionImagenDenunciada=document.getElementById('captionImagenDenunciada');
let imgPerfilDenunciado=document.getElementById('imgPerfilDenunciado');
let datosPersonaDenunciada=document.getElementById('datosPersonaDenunciada');
let  datosPerfilDenunciado=document.getElementById('datosPerfilDenunciado');
let imgPerfilDenunciante=document.getElementById('imgPerfilDenunciante');
let datosPersonaDenunciante=document.getElementById('datosPersonaDenunciante');
let datosPerfilDenunciante=document.getElementById('datosPerfilDenunciante');
let motivoDenunciaI=document.getElementById('motivoDenunciaI');
async function seleccionarDenuncia(event){
     eliminarHijos(cuerpoD); 
     eliminarHijos(divComentariosImagen)
     fOcultar();
     limpiarCampos(limpiar)
     mostrar(divDenunciaSeleccionada);
     motivoDenunciaI.textContent=`Motivo de la denuncia:${motivo.nombreMotivoDenuncia}`;
      // Obtener el botón que se hizo clic
      let btn = event.target;
     
      // Encontrar la fila (<tr>) que contiene el botón
      let fila = btn.closest('tr');
     
      // Obtener todas las celdas (<td>) dentro de esa fila
      let celdas = fila.getElementsByTagName('td');
     denuncia={};
      // Recorrer las celdas y obtener los valores
      denuncia=await denuncias.find(den=>den.idDenuncia===parseInt(celdas[0].textContent));
      console.log(denuncia);
      aux=await fechProtegidoPost('/buscarImagenPorId', {idImagen: denuncia.idImagenDenunciada});
     if(aux.success){
        imagenDenunciada=aux.retorno;
        console.log(imagenDenunciada)
        imagenDenunciadaI.src=imagenDenunciada.url_imagen;
        nombreImagenDenunciada.textContent=`Titulo:${imagenDenunciada.titulo_imagen}`;
        captionImagenDenunciada.textContent=`Caption:${imagenDenunciada.caption_imagen}`;
         }
     aux=await fechProtegidoPost('/buscarPerfilPorid', {id: denuncia.idPerfilDenunciado});
     if(aux.success){
        perfilDenunciado=aux.retorno[0];
        console.log(perfilDenunciado);
        if(!perfilDenunciado.img_perfil){
            imgPerfilDenunciado.src='/Iconos/usuario.svg'
        }else{
            imgPerfilDenunciado.src=perfilDenunciado.img_perfil; 
        }
        datosPersonaDenunciada.textContent=`Nombre: ${perfilDenunciado.nombre_persona} Apellido :${perfilDenunciado.apellido_persona}`;

       
        }
    aux=await fechProtegidoPost('/buscarPerfilPorid', {id: denuncia.idPerfilDenunciante});
     if(aux.success){
        perfilDenunciante=aux.retorno[0];
        console.log(perfilDenunciante);
        if(!perfilDenunciado.img_perfil){
            imgPerfilDenunciado.src='/Iconos/usuario.svg'
        }else{
            imgPerfilDenunciante.src=perfilDenunciante.img_perfil;
        }

        
     }
    }    
async function verComentarios(){
let idImagen={
       idImagen:imagenDenunciada.id_imagen
  }
  aux=await traerComentarios(idImagen)
}  
async function bajaImagen(){

}   
async function bajaPerfilDenunciado(){

}  
async function bajaPerfilDenunciante() {
    
}

