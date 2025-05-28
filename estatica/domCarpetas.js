pagina='albumes';
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
let selectValue = selectTags.value;

if(!validar(inputValue.length<1||inputValue.length>parametros.tamaño1,pagina,`El Titulo es obligatorio y ${parametros.cartelTamño1}`,))bandera=false;
let a= await tags.some(tag => parseInt(tag.id_tags) === parseInt(selectValue));

if(!a||!bandera){
    alerta(pagina,`El titulo y el Tag son Obligatorios`);
}else{
    let album={
        tituloAlbumPersonal: inputValue,
        id_tags: selectValue
    };
    aux=await fechProtegidoPost('/crearAlbum',album);
    console.log(aux);
    if(aux.success){
            limpiarCampos(limpiar);
            fOcultar();
        }
}
}

