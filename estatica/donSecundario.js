pagina="secundaria";
let aux;
let profesiones,profesionales;
let divCrearLogin=document.getElementById('divCrearLogin');

slctCrudProfesion.addEventListener('change',async function() {
    limpiarCampos(limpiar);
    fOcultar();
    fOcultar2();
    eliminarHijos(cuerpo);
    eliminarHijos(cuerpo2);
    eliminarHijos(cuerpoProfesion);
    eliminarHijos(cuerpoProfesion2);
    let selectedValue = this.value;
    fOcultar();
    switch(selectedValue) {
         case 'crearProfesion':
            
              limpiarCampos(limpiar);
              mostrar(divCrearProfesion);
              
              break;
         
         case 'buscarProfesiones':
             fOcultar();
             eliminarHijos(cuerpoProfesion);
             limpiarCampos(limpiar);
             mostrar(divMostrarProfesiones);
             profesiones=await buscarProfesiones();
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
               console.log(profesionales);
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
                   agregarTdCuerpo(p.eMail,tr);
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
    slctCrudProfesion.selectedIndex = 0;
});
async function buscarProfesiones(){
     aux=await fechGetProtegido('/buscarProfesiones');
    // profesiones=aux.data;
     if(!aux.error){
       console.log(aux.data);
     }
     return aux.data;
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


