let divSubirImagen = document.getElementById('divSubirImagen');
let idPerfil=document.getElementById('idPerfil');
let idAlbumSeleccionado=document.getElementById('idAlbumSeleccionado');
function subirImagen() {
    bandera=true;
    if(!validar(albumSeleccionado.cantidadImagenes>parametros.tamaño5,pagina,`la carpeta esta completa ${parametros.cartelTamño5}`,))bandera=false;
    if(bandera){
    limpiarCampos(limpiar);
    eliminarHijos(divMostrarImagenes);
    fOcultar3();
    mostrar(divSubirImagen);
    idPerfil.value=perfil.idPerfil;
    idAlbumSeleccionado.value=parseInt(albumSeleccionado.idAlbumPersonal);
    document.getElementById('imagenSubir').addEventListener('change', function(){
    document.getElementById('nombreArchivoSubir').textContent = this.files[0]?.name || 'No se ha seleccionado archivo';
   });

}
}
document.getElementById('formSubirImagenAlbum').addEventListener('submit', async function(e) {
    e.preventDefault();
   aux=await subirImagenConToken('/subirImagen', this);
   if(aux.success){
       cartelExito(pagina,aux.responseBody.message)
       
       // Actualizar todas las imágenes con la nueva URL
    document.getElementById('nombreArchivoSubir').textContent = 'No se ha seleccionado archivo';
     limpiarCampos(limpiar);
    fOcultar();
    fOcultar2();
    fOcultar3();
       //alerta('Imagen subida correctamente');
   }else{
        alerta('Hubo un inconveniente al subir la imagen: ' );
   }
});
let divMostrarImagenes = document.getElementById('divMostrarImagenes');
async function verImagenes(){
aux=await fechProtegidoPost('/buscarImagenesPorIdAlbumPersonal', {idAlbum: albumSeleccionado.idAlbumPersonal})
eliminarHijos(divMostrarImagenes);
fOcultar3();
mostrar(divMostrarImagenes);
if(aux.success){
   let btn1=document.createElement('button');
   btn1.className="botonCerrar";
   btn1.onclick= () => ocultarElemento(divMostrarImagenes);
   divMostrarImagenes.appendChild(btn1);
//recorrer aux.urlImagen crear un div con la imagen agregarle un evento click para recuperar el idImagen y agregarlo al divMostrarImagenes
//agregar un evento click a cada imagen para capturar el idImagen
   aux.retorno.forEach(imagen => {
         let divImagen = document.createElement('div');
         divImagen.className = 'divContenedorImagen';
         divImagen.innerHTML = `<img src="${imagen.urlImagen}" alt="Imagen del álbum" class="imagenAlbum">`;
         divImagen.addEventListener('click', function() {
              capturarImagenSeleccionada(imagen);
         });
         divMostrarImagenes.appendChild(divImagen);
          let p=document.createElement('p');
         let titulo,caption,fecha,estado;
         fecha=formatearFecha(imagen.fechaCreacion);
         if(!imagen.tituloImagen){
            titulo="No contiene";
         }else{titulo=imagen.tituloImagen}
         if(!imagen.captionImagen){
            caption="No contiene";
         }else{caption=imagen.captionImagen}
         if(imagen.activoImagen){
            estado="Activo"
         }else{estado="Inactivo"}
         p.textContent=`fecha creacion:${fecha}--Titulo:${titulo}--Caption:${caption}---Visibilidad:${imagen.tituloVisibilidad}---Estado:${estado}`
         divMostrarImagenes.appendChild(p);
         //rescatar y agregar datos de la imagen
   });
}}
let divImagenSeleccionada = document.getElementById('divImagenSeleccionada');
let imgSeleccionada=document.getElementById('imgSeleccionada');
let pImagenSeleccionada=document.getElementById('pImagenSeleccionada');
let divDatosImagenSeleccionada=document.getElementById('divDatosImagenSeleccionada');
let imagenSeleccionada;
function capturarImagenSeleccionada(imagen) {
   imagenSeleccionada=imagen;
    eliminarHijos(divMostrarImagenes);
    limpiarCampos(limpiar);
    fOcultar3();
    mostrar(divImagenSeleccionada);
    mostrar(divDatosImagenSeleccionada);
    imgSeleccionada.src=imagen.urlImagen;
     let titulo,caption,fecha,estado;
         fecha=formatearFecha(imagen.fechaCreacion);
         if(!imagen.tituloImagen){
            titulo="No contiene";
         }else{titulo=imagen.tituloImagen}
         if(!imagen.captionImagen){
            caption="No contiene";
         }else{caption=imagen.captionImagen}
         if(imagen.activoImagen){
            estado="Activo"
         }else{estado="Inactivo"}
         pImagenSeleccionada.textContent=`fecha creacion:${fecha}--Titulo:${titulo}--Caption:${caption}---Visibilidad:${imagen.tituloVisibilidad}---Estado:${estado}`


}
let divModificarTituloImagen=document.getElementById('divModificarTituloImagen');
function mostrarModificarTituloImagen(){
   fOcultar2();
   limpiarCampos(limpiar);
   mostrar(divModificarTituloImagen);
}
let inputModificarTituloImagen=document.getElementById('inputModificarTituloImagen');
async function modificarTituloImagen(){
   //parametros.tamaño1
   bandera=true;
    inputValue=inputModificarTituloImagen.value;
   if(!validar(inputValue.length<1||inputValue.length>parametros.tamaño1,pagina,`El Titulo es obligatorio y ${parametros.cartelTamño1}`,))bandera=false;
   if(!bandera){
      alerta(pagina,"algo esta mal con el titulo seleccionado")
   }else{
      let img={}
      img=imagenSeleccionada;
      img.tituloImagen=inputValue;
       aux =await fechProtegidoPost('/modificarTituloImagenPorId',img);
        if(aux.success){
                    limpiarCampos(limpiar);
                    fOcultar2();
                }else{alerta(pagina,`Algo sali mal al crear Album:${aux.mensaje}`)}
   }
     
   }


let divModificarCaptionImagen=document.getElementById('divModificarCaptionImagen');
function mostrarModificarCaption(){
    fOcultar2();
   limpiarCampos(limpiar);
   mostrar(divModificarCaptionImagen);
}
let inputModificarCaptionImagen=document.getElementById('inputModificarCaptionImagen');
async function modificarCaptionImagen(){

 bandera=true;
    inputValue=inputModificarCaptionImagen.value;
if(!validar(inputValue.length<1||inputValue.length>parametros.tamaño1,pagina,`El Caption es obligatorio y ${parametros.cartelTamño1}`,))bandera=false;
   if(!bandera){
      alerta(pagina,"algo esta mal con el Caption seleccionado")
   }else{
      let img={}
      img=imagenSeleccionada;
      img.captionImagen=inputValue;
      
       aux =await fechProtegidoPost('/modificarCaptionImagenPorId',img);
        if(aux.success){
                    limpiarCampos(limpiar);
                    fOcultar2();
                }else{alerta(pagina,`Algo sali mal al crear Album:${aux.mensaje}`)}
   }
}
let divModificarVisibilidad=document.getElementById('divModificarVisibilidad');
let visibilidades;
let dtlVisibilidad=document.getElementById('dtlVisibilidad');
async function mostrarModificarVisibilidad(){
     fOcultar2();
   limpiarCampos(limpiar);
   mostrar(divModificarVisibilidad);
   let idPerf={
      idPerfil:perfil.idPerfil
   }
   aux=await fechProtegidoPost('/buscarVisibilidad',idPerf)
   if(aux.success){ 
      visibilidades=aux.retorno;
                    limpiarCampos(limpiar);
                    llenarDl(dtlVisibilidad,visibilidades,'tituloVisibilidad','tituloVisibilidad');

                }else{alerta(pagina,`Algo salio mal al buscar visibilidades:${aux.mensaje}`)}
}
let inputVisibilidad=document.getElementById('inputVisibilidad');
async function modificarVisibilidadImagen(){
   bandera=true;
   let inputValue=inputVisibilidad.value;
    aux= visibilidades.filter(vis=>vis.tituloVisibilidad===inputValue);
    if(!validar(aux.length<1,'La visibilidad no existe o es obligatoria')){bandera=false}
    imagenSeleccionada.idVisibilidad=aux[0].idVisibilidad;
    aux=await fechProtegidoPost('/modificarVisibilidadImagen',imagenSeleccionada)        
    if(aux.success){
       limpiarCampos(limpiar);
       fOcultar2();
       eliminarHijos(dtlVisibilidad);
    }else{
      alerta(pagina,'Algo salio mal al modificar la visibilidad')
    }
}
async function modificarActivoImagen(){
    aux=await llenarDivCorroborar('Alta o Baja de Imagen');
       if(aux){
               aux=await fechProtegidoPost('/modificarActiviImagen',imagenSeleccionada)
               if(aux.success){
                  limpiarCampos(limpiar);
                     fOcultar2();
               }else{alerta(pagina,"Algo salio mal al activar inactivar la imagen")}
         
       }

}



