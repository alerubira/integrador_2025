pagina="secundaria";
let aux;
let slctCrudProfecion=document.getElementById('slctCrudProfesion');
slctCrudProfecion.addEventListener('change',async function() {
    limpiarCampos(limpiar);
    fOcultar2();
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
              llenarDl(dlPresentacion,presentaciones.data,'nombre_presentacion');
             
              
              mostrar(divCMedicamento);*/
              cartelExito(pagina,'crear profesion');
              break;
         
         case 'buscarProfesiones':
             fOcultar();
             aux=await fechGetProtegido('/buscarProfesiones');
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
         

              
         default:
              console.log('Selección no válida');
              alerta(pagina,('Seleccion no valida'));
    }
    slctCrudProfecion.selectedIndex = 0;
});
