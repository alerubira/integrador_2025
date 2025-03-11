let divCrearProfesional=document.getElementById('divCrearProfesional');
let divMostrarPrefesionales=document.getElementById('divMostrarProfesionales');
let cuerpo=document.getElementById('cuerpo');
let divModificarProfesional=document.getElementById('divModificarProfesional');
let profesional;
let cuerpo2=document.getElementById('cuerpo2');

async function seleccionarProfesional(event){
     fOcultar();
     mostrar(divModificarProfesional);
      // Obtener el botón que se hizo clic
      let btn = event.target;
     
      // Encontrar la fila (<tr>) que contiene el botón
      let fila = btn.closest('tr');
     
      // Obtener todas las celdas (<td>) dentro de esa fila
      let celdas = fila.getElementsByTagName('td');
     profesional={};
      // Recorrer las celdas y obtener los valores
      
      profesional=await profesionales.find(prof=>prof.idProfesional===parseInt(celdas[1].textContent));

      eliminarHijos(cuerpo2);
      let tr2=document.createElement('tr');
                         cuerpo2.appendChild(tr2);
                         agregarTdCuerpo(profesional.idPersona,tr2);
                         agregarTdCuerpo(profesional.idProfesional,tr2);
                         agregarTdCuerpo(profesional.dniPersona,tr2);
                         agregarTdCuerpo(profesional.apellidoPersona,tr2);
                         agregarTdCuerpo(profesional.nombrePersona,tr2);
                         agregarTdCuerpo(profesional.idProfesion,tr2);
                         agregarTdCuerpo(profesional.nombreProfesion,tr2);
                         agregarTdCuerpo(profesional.eMail,tr2);
                         if(profesional.activoPersona===1){
                              agregarTdCuerpo('Activo',tr2);
                         }else{
                              agregarTdCuerpo('Inactivo',tr2);
                         }
                         if(profesional.activoProfesional===1){
                              agregarTdCuerpo('Activo',tr2);
                         }else{
                              agregarTdCuerpo('Inactivo',tr2);
                         }
     eliminarHijos(cuerpo);                    
     
     }

     let inputDniPersona=document.getElementById('dniPersona');
     let inputNombrePersona=document.getElementById('nombrePersona');
     let inputApellidoPersona=document.getElementById('apellidoPersona');
     let profesionProfesional=document.getElementById('profesionProfesional');
     let inputEMail=document.getElementById('eMail');
async function crearProfesional(){
     let regDni =convertirExpresionRegular(parametros.dni);
     let regNombres=convertirExpresionRegular(parametros.nombres);
     let regEMail=convertirExpresionRegular(parametros.eMail);
     let idProfesionProfesionalValue=parseInt(profesionProfesional.value);
     let dniPersonaValue=parseInt(inputDniPersona.value);
     let eMailValue=inputEMail.value;
     bandera=true;
     if(!validar(!regDni.test(dniPersonaValue),pagina,`${parametros.cartelDni}`)){bandera=false};
     if(!validar(!regNombres.test(inputNombrePersona.value),pagina,`en el Nombre ${parametros.cartelNombres}`)){bandera=false};
     if(!validar(inputNombrePersona.value.length<1||inputNombrePersona.value.length>parametros.tamaño1,pagina,`El Nombre es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
     if(!validar(!regNombres.test(inputApellidoPersona.value),pagina,`en el Apellido ${parametros.cartelNombres}`)){bandera=false};
     if(!validar(inputApellidoPersona.value.length<1||inputApellidoPersona.value.length>parametros.tamaño1,pagina,`El Apellido es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
     if(!validar(!regEMail.test(eMailValue)||eMailValue.length<1,pagina,`${parametros.cartelEMail}`)){bandera=false}
     let aux=profesiones.filter(prof=>prof.idProfesion===idProfesionProfesionalValue);
     if(!validar(!aux,pagina,"La Profesion es obligatoria y debe existir")){bandera=false};
     if(bandera){
     let prof={
          dniPersona:dniPersonaValue,
          nombrePersona:inputNombrePersona.value,
          apellidoPersona:inputApellidoPersona.value,
          idProfesionProfesional:idProfesionProfesionalValue,
          eMail:eMailValue
     }
     aux=await fechProtegidoPost('/crearProfesional',prof);
     if(aux.success){
          limpiarCampos(limpiar);
          fOcultar();
     }
     }
     }
let divModificarProfesionProfesional=document.getElementById('divModificarProfesionProfesional');     
let dtlProfesiones=document.getElementById('dtlProfesiones');
slctModificarProfesional.addEventListener('change',async function() {
   
        limpiarCampos(limpiar);
        let selectedValue = this.value;
        switch(selectedValue) {
             case "crearLogin":
                  mostrar(divCrearLogin);
                  break;
             case "modificarEstadoPersona":
                aux=await fechProtegidoPost('/modificarEstadoPersona',profesional);
                break;
            case "modificarEstadoProfesional":
                aux=await fechProtegidoPost('/modificarEstadoProfesional',profesional);
                break;
            case "modificarProfesion":
                profesiones=await buscarProfesiones();
                mostrar(divModificarProfesionProfesional);
                llenarDl(dtlProfesiones,profesiones,'nombreProfesion','idProfesion');
                break;
            case "modificarEMail":
                break;    
            case "modificarNombrePersona":
                break;
            case "modificarApellidoPersona":
                break;
            case "modificarDniPersona":
                break;

             default:
                  console.log('Selección no válida');
                  alerta(pagina,('Seleccion no valida'));      
             }
             slctModificarProfesional.selectedIndex = 0;
         }); 
async function modificarProfesionProfesional(){
     console.log('modificarProfesionProfesional');
}           