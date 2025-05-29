pagina='Albumes';
function verAlbumes(){

}
let sectionCrearAlbum = document.getElementById("sectionCrearAlbum");
function mostrarCrearAlbum(){
   limpiarCampos(limpiar);
   mostrar(sectionCrearAlbum);
}
let inputTituloAlbum = document.getElementById("inputTituloAlbum");
let selectTags = document.getElementById("selectTags");
async function crearAlbum(){
            bandera=true;
        let inputValue = inputTituloAlbum.value;
        let selectValue = parseInt(selectTags.value);

        if(!validar(inputValue.length<1||inputValue.length>parametros.tamaño1,pagina,`El Titulo es obligatorio y ${parametros.cartelTamño1}`,))bandera=false;
        let a= await tags.some(tag => parseInt(tag.id_tags) === selectValue);

        if(!a||!bandera){
            alerta(pagina,`El titulo y el Tag son Obligatorios`);
        }else{
            let album={
                tituloAlbumPersonal: inputValue,
                idTags: selectValue,
                idPerfilPersonal:perfil.idPerfil
            };
            aux=await fechProtegidoPost('/crearAlbum',album);
            console.log(aux);
            if(aux.success){
                    limpiarCampos(limpiar);
                    fOcultar();
                    selectTags.selectedIndex=0;
                }
        }
}
let divMostrarAlbumes = document.getElementById("divMostrarAlbumes");
function mostrarAlbumes(){
    limpiarCampos(limpiar);
    fOcultar();
    mostrar(divMostrarAlbumes);
//buscar y mostrar todos los albuen personales del perfil
}
 let mensageNoEncontrado=document.getElementById('mensageNoEncontrado');
 let albumes=await fechProtegidoPost('/buscarAlbumesPersonalesPorId',{ idPerfilPersonal: perfilPersonal.idPerfilPersonal });
 
 document.getElementById('inputBuscarApellidoPersona').addEventListener('keyup',async function(){
     let filtro=this.value.toLowerCase();
     mensageNoEncontrado.style.display = 'none';
     let profesionalesFiltrados=profesionales.filter(prof=>prof.apellidoPersona.toLowerCase().includes(filtro));
     if(profesionalesFiltrados.length===0){
          mensageNoEncontradoApellido.style.display = 'block';
          llenarTablaProfesionales(profesionales);
     }else{
          llenarTablaProfesionales(profesionalesFiltrados);
     }
     
filtro="";//controlar que no se quede seleccionado
 });

