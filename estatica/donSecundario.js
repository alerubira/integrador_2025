

pagina="secundaria";
let aux;
let profesiones,profesionales;
let slctCrudProfecion=document.getElementById('slctCrudProfesion');
let divCrearProfesion=document.getElementById('divCrearProfesion');
let divCrearProfesional=document.getElementById('divCrearProfesional');
let divCrearLogin=document.getElementById('divCrearLogin');
let divMostrarPrefesionales=document.getElementById('divMostrarProfesionales');
let divMostrarProfesiones=document.getElementById('divMostrarProfesiones');
let dtlProfesion=document.getElementById('dtlProfesionProfesional');
let inputNombreProfesion=document.getElementById('inputNombreProfesion');
let cuerpo=document.getElementById('cuerpo');
slctCrudProfecion.addEventListener('change',async function() {
    limpiarCampos(limpiar);
    fOcultar();
    let selectedValue = this.value;
    fOcultar();
    switch(selectedValue) {
         case 'crearProfesion':
             /* eliminarHijos(dlNombreGenerico);
              eliminarHijos(dlForma);
              eliminarHijos(dlPresentacion);
              nombresGenericos=await traerNombresGenericos();
              formas=await traerFormas();
              presentaciones=await traerPresentaciones();
              llenarDl(dlNombreGenerico,nombresGenericos.data,'nombre_generico');
              llenarDl(dlForma,formas.data,'nombre_forma');
              llenarDl(dlPresentacion,presentaciones.data,'nombre_presentacion');*/
              limpiarCampos(limpiar);
              mostrar(divCrearProfesion);
              
              break;
         
         case 'buscarProfesiones':
             fOcultar();
             eliminarHijos(cuerpoProfesion);
             limpiarCampos(limpiar);
             mostrar(divMostrarProfesiones);
             aux=await fechGetProtegido('/buscarProfesiones');
             profesiones=aux.data;
             if(!aux.error){
               console.log(aux.data);
             }
             for(let p of profesiones){
               let tr=document.createElement('tr');
               cuerpoProfesion.appendChild(tr);
               agregarTdCuerpo(p.idProfesion,tr);
               agregarTdCuerpo(p.nombreProfesion,tr);
               if(p.activoProfesion===1){
                    agregarTdCuerpo('Activo',tr);
               }else{
                    agregarTdCuerpo('Inactivo',tr);
               }
               
               let btn=document.createElement('button');
                         btn.textContent = 'Seleccionar';
                         btn.className = 'boton';
                         btn.addEventListener('click', seleccionarProfesion);
                        let td=document.createElement('td');
                        td.appendChild(btn);
                        tr.appendChild(td);
                         }
             
           
                             
                 
               break;
         
          case "crearProfesional":
               mostrar(divCrearProfesional);
               aux=await fechGetProtegido('/buscarProfesiones');
               profesiones=aux.data;
               llenarDl(dtlProfesion,profesiones,'nombreProfesion','idProfesion');
               
               break;
          
          case "buscarProfesionales":
               mostrar(divMostrarPrefesionales);
               eliminarHijos(cuerpo);   
               aux=await fechGetProtegido('/buscarProfesionales');
               profesionales=aux.data;
               for(let p of profesionales){
                   let tr=document.createElement('tr');
                   cuerpo.appendChild(tr);
                   agregarTdCuerpo(p.idPersona,tr);
                   agregarTdCuerpo(p.idProfesional,tr);
                   agregarTdCuerpo(p.dniPersona,tr);
                   agregarTdCuerpo(p.apellidoPersona,tr);
                   agregarTdCuerpo(p.nombrePersona,tr);
                   agregarTdCuerpo(p.idProfesion,tr);
                   agregarTdCuerpo(p.nombreProfesion,tr);
                   if(p.activoPersona===1){
                        agregarTdCuerpo('Activo',tr);
                   }else{
                        agregarTdCuerpo('Inactivo',tr);
                   }
                   if(p.activoProfesional===1){
                    agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                   let btn=document.createElement('button');
                             btn.textContent = 'Seleccionar';
                             btn.className = 'boton';
                             btn.addEventListener('click', seleccionarProfesional);
                            let td=document.createElement('td');
                            td.appendChild(btn);
                            tr.appendChild(td);
                             }
                 
          
              break;         
              
         default:
              console.log('Selección no válida');
              alerta(pagina,('Seleccion no valida'));
    }
    slctCrudProfecion.selectedIndex = 0;
});
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
let prefesion={}; 
let cuerpoProfesion2=document.getElementById('cuerpoProfesion2');  
let divModificarProfesion=document.getElementById('divModificarProfesion');  
async function seleccionarProfesion(event){
     fOcultar();
     mostrar(divModificarProfesion);
      // Obtener el botón que se hizo clic
      let btn = event.target;
     
      // Encontrar la fila (<tr>) que contiene el botón
      let fila = btn.closest('tr');
     
      // Obtener todas las celdas (<td>) dentro de esa fila
      let celdas = fila.getElementsByTagName('td');
     profesion={};
      // Recorrer las celdas y obtener los valores
      
      profesion=await profesiones.find(prof=>prof.idProfesion===parseInt(celdas[0].textContent));
     
      let tr2=document.createElement('tr');
                         cuerpoProfesion2.appendChild(tr2);
                         agregarTdCuerpo(profesion.idProfesion,tr2);
                         agregarTdCuerpo(profesion.nombreProfesion,tr2);
                         if(profesion.activoProfesion===1){
                              agregarTdCuerpo('Activo',tr2);
                         }else{
                              agregarTdCuerpo('Inactivo',tr2);
                         }
     eliminarHijos(cuerpoProfesion);                    
     
     } 
let slctModificarProfesion=document.getElementById('slctModificarProfesion');
let divModificarNombreProfesion=document.getElementById('divModificarNombreProfesion');  
slctModificarProfesion.addEventListener('change',async function() {
    
     let selectedValue = this.value;
     switch(selectedValue) {
          case "modificarNombre":
               mostrar(divModificarNombreProfesion);
               break;
          case "modificarEstado":
               aux =await fechProtegidoPost('/modificarEstadoProfesion',profesion);
               break; 
                  
         default:
          console.log('Selección no válida');
          alerta(pagina,('Seleccion no valida'));         
     }
     }); 
   
async function modificarNombreProfesion(){
     bandera=true;
    
     let nombreProfesion=document.getElementById('inputNuevoNombreProfesion');
     if(!validar(nombreProfesion.value.length<1||nombreProfesion.value.length>parametros.tamaño1,pagina,`El Nombre de la Profesion es Obligatorio y no debe superar los ${parametros.tamaño1} caracteres`)){bandera=false}
     if(!validar(!profesiones.some(p=>p.idProfesion===profesion.idProfesion),pagina,'La Profesion no existe')){bandera=false}
     if(bandera){
          let p={idProfesion:profesion.idProfesion,nombreProfesion:nombreProfesion.value,activoProfesion:profesion.activoProfesion};
          aux=await fechProtegidoPost('/modificarNombreProfesion',p);
          if(aux.success){
               eliminarHijos(cuerpoProfesion2);
               limpiarCampos(limpiar);
               fOcultar();
          }
     }
    
}
let inputDniPersona=document.getElementById('dniPersona');
let inputNombrePersona=document.getElementById('nombrePersona');
let inputApellidoPersona=document.getElementById('apellidoPersona');
let profesionProfesional=document.getElementById('profesionProfesional');

async function crearProfesional(){
let regDni =convertirExpresionRegular(parametros.dni);
let regNombres=convertirExpresionRegular(parametros.nombres);
let idProfesionProfesionalValue=parseInt(profesionProfesional.value);
let dniPersonaValue=parseInt(inputDniPersona.value);
bandera=true;
if(!validar(!regDni.test(dniPersonaValue),pagina,`${parametros.cartelDni}`)){bandera=false};
if(!validar(!regNombres.test(inputNombrePersona.value),pagina,`en el Nombre ${parametros.cartelNombres}`)){bandera=false};
if(!validar(inputNombrePersona.value.length<1||inputNombrePersona.value.length>parametros.tamaño1,pagina,`El Nombre es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
if(!validar(!regNombres.test(inputApellidoPersona.value),pagina,`en el Apellido ${parametros.cartelNombres}`)){bandera=false};
if(!validar(inputApellidoPersona.value.length<1||inputApellidoPersona.value.length>parametros.tamaño1,pagina,`El Apellido es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
let aux=profesiones.filter(prof=>prof.idProfesion===idProfesionProfesionalValue);
if(!validar(!aux,pagina,"La Profesion es obligatoria y debe existir")){bandera=false};
if(bandera){
let prof={
     dniPersona:dniPersonaValue,
     nombrePersona:inputNombrePersona.value,
     apellidoPersona:inputApellidoPersona.value,
     idProfesionProfesional:idProfesionProfesionalValue
}
aux=await fechProtegidoPost('/crearProfesional',prof);
if(aux.success){
     limpiarCampos(limpiar);
     fOcultar();
}
}
}
let inputUsuario=document.getElementById('usuario');
let inputClave=document.getElementById('clave');
let inputTipoAutorizacion=document.getElementById('tipoAutorizacion');
async function crearLogin(){
     let idProfesional=profesional.idProfesional;
     let usuarioValue=inputUsuario.value;
     let claveValue=inputClave.value;
     let tipoAutorizasionValue=parseInt(inputTipoAutorizacion.value);
     let regClave =convertirExpresionRegular(parametros.clave);
     bandera=true;
     if(!validar(usuarioValue.length<1||usuarioValue.length>parametros.tamaño2,pagina,`El Usuario es obligatorio y ${parametros.cartelTamaño2}`)){bandera=false}
     if(!validar(!regClave.test(claveValue),pagina,`${parametros.cartelClave}`)){bandera=false};
     if(!validar(!profesionales.some(p=>p.idProfesional===idProfesional),pagina,'El Profesional no existe')){bandera=false}
     if(!validar(tipoAutorizasionValue!=1&&tipoAutorizasionValue!=2&&tipoAutorizasionValue!=3,pagina,'El Tipo de autorizacion no es valido')){bandera=false}
     
     if(bandera){
          login={
               idProfesional:idProfesional,
               usuario:usuarioValue,
               clave:claveValue,
               tipoAutorizacion:tipoAutorizasionValue
          }
        aux=await  fechProtegidoPost('/crearLogin',login);
        if(aux.success){
         limpiarCampos(limpiar);
         fOcultar();
        }
     }
     

}
async function crearProfesion(){
bandera=true;     
let p={nombreProfesion:inputNombreProfesion.value}  ;
if(!validar(p.nombreProfesion.length<1||p.nombreProfesion.length>parametros.tamaño1,pagina,`El Nombre de la Profesion es Obligatorio y no debe superar los ${parametros.tamaño1} caracteres`)){bandera=false}
if(bandera){
     fechPost('/crearProfesion',p)
}
}
slctModificarProfesional.addEventListener('change',async function() {
     limpiarCampos(limpiar);
     let selectedValue = this.value;
     switch(selectedValue) {
          case "crearLogin":
               mostrar(divCrearLogin);
               break; 
          }
          slctModificarProfesional.selectedIndex = 0;
      });   
