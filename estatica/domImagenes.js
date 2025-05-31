let divSubirImagen = document.getElementById('divSubirImagen');
let idPerfil=document.getElementById('idPerfil');
let idAlbumSeleccionado=document.getElementById('idAlbumSeleccionado');
function subirImagen() {
    limpiarCampos(limpiar);
    mostrar(divSubirImagen);
    idPerfil.value=perfil.idPerfil;
    idAlbumSeleccionado.value=parseInt(albumSeleccionado.idAlbumPersonal);
    document.getElementById('imagenSubir').addEventListener('change', function(){
    document.getElementById('nombreArchivoSubir').textContent = this.files[0]?.name || 'No se ha seleccionado archivo';
});

}
document.getElementById('formSubirImagenAlbum').addEventListener('submit', async function(e) {
    e.preventDefault();
   aux=await subirImagenConToken('/subirImagen', this);
   if(aux.success){
       // Aquí puedes mostrar un mensaje de éxito en español
       
       // Actualizar todas las imágenes con la nueva URL
    document.getElementById('nombreArchivoSubir').textContent = 'No se ha seleccionado archivo';
     limpiarCampos(limpiar);
    fOcultar();
    fOcultar2();
       //alerta('Imagen subida correctamente');
   }else{
        alerta('Hubo un inconveniente al subir la imagen: ' );
   }
});
let divMostrarImagenes = document.getElementById('divMostrarImagenes');
let divImagenSeleccionada = document.getElementById('divImagenSeleccionada');
async function verImagenes(){
aux=await fechProtegidoPost('/buscarImagenesPorIdAlbumPersonal', {idAlbum: albumSeleccionado.idAlbumPersonal})

if(aux.success){
//recorrer aux.urlImagen crear un div con la imagen agregarle un evento click para recuperar el idImagen y agregarlo al divMostrarImagenes
//agregar un evento click a cada imagen para capturar el idImagen
   aux.urlImagen.forEach(imagen => {
         let divImagen = document.createElement('div');
         divImagen.className = 'imagenAlbum';
         divImagen.innerHTML = `<img src="${imagen.urlImagen}" alt="Imagen del álbum" class="img-thumbnail">`;
         divImagen.addEventListener('click', function() {
              capturarImagenSeleccionada(imagen.idImagen);
         });
         divMostrarImagenes.appendChild(divImagen);
   });
}}
function capturarImagenSeleccionada(idImagen) {
    console.log("Imagen seleccionada con ID:", idImagen);
    limpiarCampos(limpiar);
}
