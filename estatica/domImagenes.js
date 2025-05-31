let divSubirImagen = document.getElementById('divSubirImagen');
let idPerfil=document.getElementById('idPerfil');
let idAlbumSeleccionado=document.getElementById('idAlbumSeleccionado');
function subirImagen() {
    limpiarCampos(limpiar);
    mostrar(divSubirImagen);
    idPerfil.value=perfil.idPerfil;
    idAlbumSeleccionado.value=albumSeleccionado.idAlbumPersonal;
    document.getElementById('imagenSubir').addEventListener('change', function(){
    document.getElementById('nombreArchivoSubir').textContent = this.files[0]?.name || 'No se ha seleccionado archivo';
});

}
document.getElementById('formSubirImagenAlbum').addEventListener('submit', async function(e) {
    e.preventDefault();
   aux=await subirImagenConToken('/subirImagen', this);
   if(aux.success){
       // Aquí puedes mostrar un mensaje de éxito en español
       caretelExito('Imagen subida correctamente');
       // Actualizar todas las imágenes con la nueva URL
    document.getElementById('nombreArchivoSubir').textContent = 'No se ha seleccionado archivo';
     limpiarCampos(limpiar);
    fOcultar();
    fOcultar2();
       //alerta('Imagen subida correctamente');
   }else{
        alerta('Hubo un inconveniente al subir la imagen: ' + errorData.message);
   }
});