pagina=`Pagina Personal de: ${perfil.nombrePersona} ${perfil.apellidoPersona}`;
let sectionPerfil=document.getElementById("sectionPerfil");
let sectionModificar=document.getElementById("sectionModificar");
function verPerfil(){
mostrar(sectionPerfil);
}
function modificarPerfil(){
mostrar(sectionModificar);
}
function buscarPersonas(){
    
}

document.getElementById('imagen').addEventListener('change', function(){
    document.getElementById('nombreArchivo').textContent = this.files[0]?.name || 'No se ha seleccionado archivo';
});

let selectModificar=document.getElementById("selectModificar");
let sectionModificarImagenPerfil=document.getElementById("sectionModificarImagenPerfil");
selectModificar.addEventListener('change',async function(){
    let selectedValue = this.value;
    switch(selectedValue) {
        case "1":
            modificarNombre();
            break;
        case "2":
            modificarApellido();
            break; 
        case "3":
            modificarEMail();
            ;
            break; 
        case "4":
            mostrar(sectionModificarImagenPerfil);
            break;  
        case "5":
            modificarIntereses();
            break;
        case "6":
            modificarAntecedentes();
            break;          
        default:
            console.log('Selección no válida');
            alerta(pagina,('Seleccion no valida'));         
    }
    selectModificar.selectedIndex = 0;
});
async function redirigirCarpetas(){
    //obtener datos de la query
    // Obtiene la query string de la URL
const params = new URLSearchParams(window.location.search);

// Obtiene el valor del parámetro 'datos'
const datosEncoded = params.get('datos');
let toke = {};
if (datosEncoded) {
    // Decodifica y parsea el objeto
    const datosDecoded = decodeURIComponent(datosEncoded);
    toke = JSON.parse(datosDecoded);
}
        
        let tokeJ=JSON.stringify(toke);
        let cadena=encodeURIComponent(tokeJ);
    
            window.location.href = `/accederAlbumes?datos=${cadena}`;
                      
}
let sectionBuscarPersonas=document.getElementById('sectionBuscarPersonas');
let mensageNoEncontrado=document.getElementById('mensageNoEncontrado');
function mostrarBuscarPersonas(){
    fOcultar();
    limpiarCampos(limpiar);
    mostrar(sectionBuscarPersonas);
}
let perfilesBuscados;
 document.getElementById('inputBuscarPersonas').addEventListener('keyup',async function(){
    if(this.value.length>2){
     let frac=this.value.toLowerCase();
     mensageNoEncontrado.style.display = 'none';
     let a={
        idPerfil:perfil.idPerfil,
        frac:frac
     }
     aux =await fechProtegidoPost('/buscarPerfilPorApellido',a);
      perfilesBuscados=aux.retorno[0];
     if(aux.success){
       if(perfilesBuscados.length<1){
        mensageNoEncontrado.style.display="block";
       }else{mensageNoEncontrado.style.display="none"}
     llenarTablaPerfiles(perfilesBuscados); 
    }
          
    }
    
     /*let albumesFiltrados=albumes.filter(alb=>alb.tituloAlbumPersonal.toLowerCase().includes(filtro));
     if(albumesFiltrados.length===0){
          mensageNoEncontrado.style.display = 'block';
          llenarTablaAlbumes(albumes);
     }else{
          llenarTablaAlbumes(albumesFiltrados);
     }*/
     
filtro="";//controlar que no se quede seleccionado
 });
 async function llenarTablaPerfiles(perfiles){
     eliminarHijos(cuerpo);
     for(let perf of perfiles){
          let tr=document.createElement('tr');
          cuerpo.appendChild(tr);
          agregarTdCuerpo(perf.id_perfil,tr);
          agregarTdCuerpo(perf.nombre_perfil,tr);
          agregarTdCuerpo(perf.nombre_persona,tr);
          agregarTdCuerpo(perf.apellido_persona,tr)
          let imgPerf=document.createElement('img');
          imgPerf.className="imgPerfil";
          imgPerf.src=perf.img_perfil;
          let td0=document.createElement('td');
          td0.appendChild(imgPerf)
          tr.appendChild(td0);
          let btn=document.createElement('button');
          btn.textContent='Seleccionar';
          btn.className = 'boton';
          btn.addEventListener('click', seleccionarPerfil);
          let td=document.createElement('td');
          td.appendChild(btn);
          tr.appendChild(td);
     }

 }
 let perfilSeleccionado;
 let divPerfilSeleccionado=document.getElementById('divPerfilSeleccionado');
 let imgPerfilSeleccionado=document.getElementById('imgPerfilSeleccionado');
let pPerfilSeleccionado=document.getElementById('pPerfilSeleccionado');
let PerfilSeleccionad1=document.getElementById('PerfilSeleccionad1'); 
function seleccionarPerfil(){
    let idPerfilSeleccionado = parseInt(this.parentNode.parentNode.firstChild.textContent);
    
    perfilSeleccionado=perfilesBuscados.find(perf=>perf.id_perfil===idPerfilSeleccionado);
    eliminarHijos(cuerpo);
        fOcultar();
    imgPerfilSeleccionado.src=perfilSeleccionado.img_perfil;
    pPerfilSeleccionado.textContent=`Nombre:${perfilSeleccionado.nombre_persona}//Apellido:${perfilSeleccionado.apellido_persona}//Nombre del Perfil:${perfilSeleccionado.nombre_perfil}`;
    let int;
    if(perfilSeleccionado.intereses_perfil===null){
        int="No Contiene";
    }else{int=perfilSeleccionado.intereses_perfil}
    let ant;
    if(perfilSeleccionado.antecedentes_perfil===null){
         ant="No contiene";
    }else{ant=perfilSeleccionado.antecedentes_perfil}
    PerfilSeleccionad1.textContent=`Intereses:${int}//Antecedentes:${ant}`
    mostrar(divPerfilSeleccionado);     
}
async function solicitarAmistad(){
    let solicitud={
        idPerfilSolicitante:perfil.idPerfil,
        idPerfilSolicitado:perfilSeleccionado.id_perfil
    }
    aux=await fechProtegidoPost('/generarSolicitudAmistad',solicitud)
    if(aux.success){
        fOcultar();
        limpiarCampos(limpiar);

    }else{alerta(aux)}

}
// Conecta el WebSocket al cargar la página
const ws = new WebSocket('ws://localhost:3000');

// Envía el idPerfil al conectar (para asociar el socket en el servidor)
ws.onopen = () => {
    ws.send(JSON.stringify({ idPerfil: perfil.idPerfil }));
};

// Escucha mensajes del servidor
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.tipo === 'nuevaNotificacion') {
        notificacionesNoLidas(); // Llama a tu función para actualizar el DOM
    }
};
let divNotificacionesNoLeidas=document.getElementById('divNotificacionesNoLeidas');
async function notificacionesNoLidas(){
    let id={
        idPerfilSolicitado:perfil.idPerfil
    }
   aux=await fechProtegidoPost('/buscarNotificacionesNoLeidas',id)
   if(aux.success){
    if(aux.retorno.length>0){
        let p=document.createElement('p');
        p.textContent=`Tiene ${aux.retorno.length} Notificaciones sin leer`;
        divNotificacionesNoLeidas.appendChild(p);
    }else{eliminarHijos(divNotificacionesNoLeidas)}
   }
}
notificacionesNoLidas();
let notificaciones,perfilMomentaneo;
let divNotificaciones=document.getElementById('divNotificaciones');
async function VerNotificaciones(){
    let id={
        idPerfilSolicitado:perfil.idPerfil
    }
aux=await fechProtegidoPost('/buscarNotificaciones',id)
if(aux.success){
        notificaciones=aux.retorno;
       console.log(notificaciones);
       for(let notificacion of notificaciones) {
             if(notificacion.id_tipo_notificacion===1){
                id={
                    id:notificacion.id_perfil_solicitante
                }
                let perf=await fechProtegidoPost('/buscarPerfilPorid',id)
                if (perf.success){
                  perfilMomentaneo= perf.retorno;
                  console.log(perfilMomentaneo)
                }
                 
               
             }
             if(notificacion.id_tipo_notificacion===2){

             }
             if(notificacion.id_tipo_notificacion===3){

             }
             if(notificacion.id_tipo_notificacion===4){

             }
             
       };

}
}

