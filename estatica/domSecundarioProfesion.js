let slctCrudProfesion=document.getElementById('slctCrudProfesion');
let divCrearProfesion=document.getElementById('divCrearProfesion');
let divMostrarProfesiones=document.getElementById('divMostrarProfesiones');
let dtlProfesion=document.getElementById('dtlProfesionProfesional');
let inputNombreProfesion=document.getElementById('inputNombreProfesion');
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
                    fOcultar();
                    modificarEstadoProfesion();
                    break; 
                       
              default:
               console.log('Selección no válida');
               alerta(pagina,('Seleccion no valida'));         
          }
            slctModificarProfesion.selectedIndex = 0;
          }); 
async function modificarNombreProfesion(){
            bandera=true;
           
            let nombreProfesion=document.getElementById('inputNuevoNombreProfesion');
            if(!validar(nombreProfesion.value.length<1||nombreProfesion.value.length>parametros.tamaño1,pagina,`El Nombre de la Profesion es Obligatorio y no debe superar los ${parametros.tamaño1} caracteres`)){bandera=false}
            if(!validar(!profesiones.some(p=>p.idProfesion===profesion.idProfesion),pagina,'La Profesion no existe')){bandera=false}
            if(bandera){
                 let p={idProfesion:profesion.idProfesion,nombreProfesion:nombreProfesion.value,activoProfesion:profesion.activoProfesion};
                 aux=await fechProtegidoPost('/modificarNombreProfesion',p);
                 if(aux!=undefined){
                 if(aux.success){
                      eliminarHijos(cuerpoProfesion2);
                      limpiarCampos(limpiar);
                      fOcultar();
                      fOcultar2();
                 }
               }
            }
           
       }
async function crearProfesion(){
        bandera=true;     
        let p={nombreProfesion:inputNombreProfesion.value}  ;
        if(!validar(p.nombreProfesion.length<1||p.nombreProfesion.length>parametros.tamaño1,pagina,`El Nombre de la Profesion es Obligatorio y no debe superar los ${parametros.tamaño1} caracteres`)){bandera=false}
        if(bandera){
          aux=await fechProtegidoPost('/crearProfesion',p);
          if(aux!=undefined){
               if(aux.success){
                    limpiarCampos(limpiar);
                    fOcultar();
               }
          }
        }
        }
async function modificarEstadoProfesion(){
        bandera=true;
        let p={idProfesion:profesion.idProfesion,nombreProfesion:profesion.nombreProfesion,activoProfesion:profesion.activoProfesion};
        if(!validar(!profesiones.some(p=>p.idProfesion===profesion.idProfesion),pagina,'La Profesion no existe')){bandera=false}
        if(bandera){
             aux=await fechProtegidoPost('/modificarEstadoProfesion',p);
             if(aux!=undefined){
             if(aux.success){
                  eliminarHijos(cuerpoProfesion2);
                  limpiarCampos(limpiar);
                  fOcultar();
                  fOcultar2();
             }
           }
        }
       }        
