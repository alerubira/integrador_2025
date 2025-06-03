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
let albumes,tagss;
dtlTagsFiltrar=document.getElementById('dtlTagsFiltrar');
async function mostrarAlbumes(){
    limpiarCampos(limpiar);
    fOcultar();
    fOcultar3();
    fOcultar2();
    mostrar(divMostrarAlbumes);
    aux=await fechProtegidoPost('/buscarAlbumesPersonalesPorId',{ idPerfilPersonal: perfil.idPerfil });
    if(aux.success){
        albumes=aux.albumes;
        tagss=aux.tags;
        if(albumes.length>0){
            llenarTablaAlbumes(albumes);
        }else{
            mensageNoEncontrado.style.display = 'block';
            eliminarHijos(cuerpo);
        }
         llenarDl(dtlTagsFiltrar,tagss,'nombreTags','nombreTags');
    }
    else{
        alerta(pagina,aux.mensaje);
    }    
}

 let mensageNoEncontrado=document.getElementById('mensageNoEncontrado');
let cuerpo=document.getElementById('cuerpo');
 async function llenarTablaAlbumes(albumes){
     eliminarHijos(cuerpo);
     for(let prof of albumes){
          let tr=document.createElement('tr');
          cuerpo.appendChild(tr);
          agregarTdCuerpo(prof.idAlbumPersonal,tr);
          agregarTdCuerpo(prof.tituloAlbumPersonal,tr);
          agregarTdCuerpo(prof.nombreTags,tr);
         
          if(prof.activoAlbumPersonal===1){
               agregarTdCuerpo('Activo',tr);
          }else{
               agregarTdCuerpo('Inactivo',tr);
          }
         
          let btn=document.createElement('button');
          btn.textContent='Seleccionar';
          btn.className = 'boton';
          btn.addEventListener('click', seleccionarAlbum);
          let td=document.createElement('td');
          td.appendChild(btn);
          tr.appendChild(td);
     }

 }

 document.getElementById('inputBuscarTituloAlbum').addEventListener('keyup',async function(){
     let filtro=this.value.toLowerCase();
     mensageNoEncontrado.style.display = 'none';
     let albumesFiltrados=albumes.filter(alb=>alb.tituloAlbumPersonal.toLowerCase().includes(filtro));
     if(albumesFiltrados.length===0){
          mensageNoEncontrado.style.display = 'block';
          llenarTablaAlbumes(albumes);
     }else{
          llenarTablaAlbumes(albumesFiltrados);
     }
     
filtro="";//controlar que no se quede seleccionado
 });

 document.getElementById('filtrarPorTags').addEventListener('change',async function() {
     let selecValor = this.value;
     mensageNoEncontrado.style.display="none";
     if(selecValor==='0'){
          llenarTablaAlbumes(Albumes);
     }else{
         let albumFiltrado=albumes.filter(alb=>alb.nombreTags===selecValor);
          if(albumFiltrado.length===0){
           mensageNoEncontrado.style.display = 'block';  
           llenarTablaAlbumes(albumes);
         }else{
          llenarTablaAlbumes(albumFiltrado);
         }
     }
     this.value= "";//controlar que no se quede seleccionado
 });
 let albumSeleccionado;
 let divAlbumSeleccionado= document.getElementById('divAlbumPersonalSeleccionado');
 let pDatosAlbumSeleccionado=document.getElementById('pDatosAlbumSeleccionado');
 function seleccionarAlbum(){
        
        let idAlbumPersonal = parseInt(this.parentNode.parentNode.firstChild.textContent);
        albumSeleccionado = albumes.find(album => album.idAlbumPersonal === idAlbumPersonal);
        eliminarHijos(cuerpo);
        fOcultar();
        mostrar(divAlbumPersonalSeleccionado);
        let activo;
        if(albumSeleccionado.activoAlbumPersonal===1){
            activo = 'Activo';
        }else{
            activo = 'Inactivo';
        }
        pDatosAlbumSeleccionado.textContent = `Titulo: ${albumSeleccionado.tituloAlbumPersonal} - Tag: ${albumSeleccionado.nombreTags} - Estado: ${activo}`;
    }
let divModificarTitulo = document.getElementById('divModificarTitulo');    
function modificarTitulo(){
    //fOcultar2();
    fOcultar3();
    limpiarCampos(limpiar);
    mostrar(divModificarTitulo);
    eliminarHijos(divMostrarImagenes);
}  
let inputModificarTituloAlbum = document.getElementById('inputModificarTituloAlbum');  
async function modificarTituloAlbum(){
    let nuevoTitulo = inputModificarTituloAlbum.value;
    bandera=true;
    if(!albumSeleccionado){
        alerta(pagina,`Debe seleccionar un Album Personal`);
        return;
    }
    if(!validar(nuevoTitulo.length<1||nuevoTitulo.length>parametros.tamaño1,pagina,`El Titulo es obligatorio y ${parametros.cartelTamño1}`,))bandera=false;
    if(bandera){
        albumSeleccionado.tituloAlbumPersonal = nuevoTitulo;
        aux = await fechProtegidoPost('/modificarTituloAlbum', albumSeleccionado);
        if(aux.success){
            //hacer algo con el album modificado
            albumSeleccionado.tituloAlbumPersonal = nuevoTitulo;
            limpiarCampos(limpiar);
            fOcultar2();
        }else{
            alerta(pagina,aux.mensaje);
        }
    }
}
let divModificarTags = document.getElementById('divModificarTags');
function modificarTags(){
    fOcultar3();
    limpiarCampos(limpiar);
    mostrar(divModificarTags);
    eliminarHijos(divMostrarImagenes);
    //llenarSelect(selectTags,tagss,'id_tags','nombre_tags');
}
let selectModificarTags = document.getElementById('selectModificarTags');
async function modificarTagsAlbum(){
bandera=true;
    let selectValue = parseInt(selectModificarTags.value);
    console.log(selectValue);
    if(!albumSeleccionado){
        alerta(pagina,`Debe seleccionar un Album Personal`);
        return;
    }
    let a= await tags.some(tag => parseInt(tag.id_tags) === selectValue);
    if(!a||!bandera){
        alerta(pagina,`El Tag es Obligatorio`);
    }else{
        albumSeleccionado.idTags = selectValue;
        aux = await fechProtegidoPost('/modificarTagsAlbum', albumSeleccionado);
        if(aux.success){
            //hacer algo con el album modificado
            albumSeleccionado.idTags = selectValue;
            limpiarCampos(limpiar);
            fOcultar3();
        }else{
            alerta(pagina,aux.mensaje);
        }
    }
}
let divModificarEstadoAlbum=document.getElementById('divModificarEstadoAlbum');
function modificarEstadoAlbum(){
    fOcultar3();
    limpiarCampos(limpiar);
    mostrar(divModificarEstadoAlbum);
    eliminarHijos(divMostrarImagenes);
}

async function modificarEstadoAlbumPersonal(){
    if(!albumSeleccionado){
        alerta(pagina,`Debe seleccionar un Album Personal`);
        return;
    }
   
    aux = await fechProtegidoPost('/modificarActivoAlbumPersonal', albumSeleccionado);
    if(aux.success){
        limpiarCampos(limpiar);
        fOcultar3();
    }else{
        alerta(pagina,aux.mensaje);
    }
}

        
 
