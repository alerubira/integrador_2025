pagina="secundaria";
let aux;
let profesiones;
let slctCrudProfecion=document.getElementById('slctCrudProfesion');
let divCrearProfesion=document.getElementById('divCrearProfesion');
let divCrearProfesional=document.getElementById('divCrearProfesional');
let divCrearLogin=document.getElementById('divCrearLogin');
let dtlProfesion=document.getElementById('dtlProfesionProfesional');
let inputNombreProfesion=document.getElementById('inputNombreProfesion');
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
             aux=await fechGetProtegido('/buscarProfesiones');
             profesiones=aux.data;
             if(!aux.error){
               console.log(aux.data);
             }
             
            /* eliminarHijos(cuerpo);
             medicamentos=await traerMedicamentos();
             if(medicamentos){
               mostrar(divBuscarMedicamentos);
               for(let m of medicamentos){
                   let tr=document.createElement('tr');
                   cuerpo.appendChild(tr);
                   agregarTdCuerpo(m.id_n_g_p,tr);
                   agregarTdCuerpo(m.id_nombre_generico,tr);
                   agregarTdCuerpo(m.nombre_generico,tr);
                   if(m.estado_nombre_generico===1){
                        agregarTdCuerpo('Activo',tr);
                   }else{
                        agregarTdCuerpo('Inactivo',tr);
                   }
                   agregarTdCuerpo(m.id_familia,tr);
                   agregarTdCuerpo(m.nombre_familia,tr);
                   agregarTdCuerpo(m.id_categoria,tr);
                   agregarTdCuerpo(m.nombre_categoria,tr);
                   agregarTdCuerpo(m.id_forma,tr);
                   agregarTdCuerpo(m.nombre_forma,tr);
                   agregarTdCuerpo(m.id_presentacion,tr);
                   agregarTdCuerpo(m.nombre_presentacion,tr);
                   if(m.activo_n_g_p===1){
                        agregarTdCuerpo('Activo',tr);
                   }else{
                        agregarTdCuerpo('Inactivo',tr);
                   }
                   let btn=document.createElement('button');
                             btn.textContent = 'Seleccionar';
                             btn.className = 'boton';
                             btn.addEventListener('click', seleccionarMedicamento);
                            let td=document.createElement('td');
                            td.appendChild(btn);
                            tr.appendChild(td); 
                             }
                        } */
                             
                 
               break;
         
          case "crearProfesional":
               divCrearProfesional.style.display='block';
               aux=await fechGetProtegido('/buscarProfesiones');
               profesiones=aux.data;
               llenarDl(dtlProfesion,profesiones,'nombreProfesion','idProfesion');
               
               break;
          case "crearLogin":
               divCrearLogin.style.display='block';
               break;     
              
         default:
              console.log('Selección no válida');
              alerta(pagina,('Seleccion no valida'));
    }
    slctCrudProfecion.selectedIndex = 0;
});
let inputDniPersona=document.getElementById('dniPersona');
let inputNombrePersona=document.getElementById('nombrePersona');
let inputApellidoPersona=document.getElementById('apellidoPersona');
let profesionProfesional=document.getElementById('profesionProfesional');
async function crearProfesional(){
console.log(inputDniPersona.value);
let regDni =convertirExpresionRegular(parametros.dni);
let regNombres=convertirExpresionRegular(parametros.nombres);
console.log(regNombres);
bandera=true;
bandera=validar(!regDni.test(inputDniPersona.value),pagina,`${parametros.cartelDni}`);
bandera=validar(!regNombres.test(inputNombrePersona.value),pagina,`en el Nombre ${parametros.cartelNombres}`)
console.log(inputNombrePersona.value);
//validar tamaño y apellido completo
console.log(bandera);
}
async function crearLogin(){
     
}
async function crearProfesion(){
bandera=true;     
let p={nombreProfesion:inputNombreProfesion.value}  ;
if(!validar(p.nombreProfesion.length<1||p.nombreProfesion.length>parametros.tamaño1,pagina,`El Nombre de la Profesion es Obligatorio y no debe superar los ${parametros.tamaño1} caracteres`)){bandera=false}
if(bandera){
     fechPost('/crearProfesion',p)
}
}
