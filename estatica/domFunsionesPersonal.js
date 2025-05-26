let aux;
async function subirImagenConToken(endpoint, formElement) {
    const token = localStorage.getItem('token');
    const formData = new FormData(formElement);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // No pongas 'Content-Type', fetch lo maneja con FormData
            },
            body: formData
        });

        if (response.ok) {
            const responseBody = await response.json();
            // Aquí puedes mostrar un mensaje de éxito en español
           // caretelExito('Imagen subida correctamente');
            return {
                success: true,
                responseBody:responseBody
            };
        } else {
            const errorData = await response.json();
            //alerta('Hubo un inconveniente al subir la imagen: ' + errorData.message);
            return {
                success: false,
                message: 'Hubo un inconveniente al subir la imagen: ' + errorData.message
            };
        }
    } catch (error) {
        //alerta('Error al acceder al servidor: ' + error.message);
        //console.error('Error al acceder al endpoint protegido:', error.message);
        return {
            success: false,
            message: 'Error al acceder al servidor: ' + error.message
        };
    }
}
let imgPerfil=document.getElementById("imgPerfil");
document.getElementById('formSubirImagen').addEventListener('submit', async function(e) {
    e.preventDefault();
   aux=await subirImagenConToken('/subirImagenPerfil', this);
   if(aux.success){
       // Aquí puedes mostrar un mensaje de éxito en español
       //caretelExito('Imagen subida correctamente');
       // Actualizar todas las imágenes con la nueva URL
    actualizarTodasLasImagenes('imgPerfil', aux.responseBody.urlImagen);
    document.getElementById('nombreArchivo').textContent = 'No se ha seleccionado archivo';
     limpiarCampos(limpiar);
    fOcultar();
       //alerta('Imagen subida correctamente');
   }else{
        alerta('Hubo un inconveniente al subir la imagen: ' + errorData.message);
   }
});
function actualizarTodasLasImagenes(nombreClase,nuevaUrl) {
    const imagenes = document.getElementsByClassName(nombreClase);
    for (let img of imagenes) {
        img.src = nuevaUrl;
    }
}