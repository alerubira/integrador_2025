//console.log('dom funsiones');
 let ocultar=document.getElementsByClassName('ocultar');
 let ocultar2=document.getElementsByClassName('ocultar2');
 let ocultar3=document.getElementsByClassName('ocultar3');
let limpiar=document.querySelectorAll('.limpiar');
let limpiarP=document.querySelectorAll('.limpiarP');
let limpiarPr=document.querySelectorAll('.limpiarPr');
let limpiarM=document.querySelectorAll('.limpiarM');
let divAlerta=document.getElementById('divAlerta');
let divExito=document.getElementById('divExito');
let pagina;
let bandera;

//let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
limpiarCampos(limpiar);
function eliminarObjetoPorId(arreglo, id, propiedad) {
   const indice = arreglo.findIndex(objeto => objeto[propiedad] === Number(id));
      // Si se encuentra el objeto, eliminarlo del arreglo
       if (indice !== -1) {
         arreglo.splice(indice, 1); 
         } else { 
          console.log(`Objeto con ID ${id} no encontrado.`); 
        } 
  }
  function cerrarSesion() {
    // Eliminar el token de autenticación del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/';
  
  
  }
 function fOcultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
 function fOcultar2(){
    for (let elemento of ocultar2) {
        elemento.style.display = 'none';
            }
 } 
 function fOcultar3(){
  for(let element of ocultar3){
    element.style.display='none';
  }
 }      
 function mostrar(elemento){
    fOcultar();
    elemento.style.display = 'block';
 }       
function limpiarCampos(list){
   
    for (let li of list){
        li.textContent="";
        li.value=null;
    }
}
function eliminarHijos(div) {
    
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function ocultarElemento(elemento){
  elemento.style.display="none"
}
function ocultarOcultar(ele1,ele2,ele3){
  ele1.style.display="none"
  ele2.style.display="none"
  ele3.style.display="block"
}
function ocultarDosElementos(el1,el2){
if(el1.style.dispaly==="none"){
  el1.style.display="block";
  al2.style.display="none";
}else{
  el2.style.display="block";
  el1.style.display="none";
}
}
function alerta(pagina,mensage){
    // Limpiar cualquier contenido anterior antes de añadir nuevos elementos
    divAlerta.innerHTML = '';
    p1=document.createElement('p');
    p1.textContent=`ALERTA La pagina ${pagina} dice :`;
    divAlerta.appendChild(p1);
    p=document.createElement('p');
    p.textContent=`${mensage}`;
    divAlerta.appendChild(p);
    // Ejecutar la función eliminarHijos después de 6 segundos (6000 milisegundos)
    setTimeout(() => eliminarHijos(divAlerta), 6000);
}
function cartelExito(pagina,mensage){
    // Limpiar cualquier contenido anterior antes de añadir nuevos elementos
    divExito.innerHTML = '';
    p1=document.createElement('p');
    p1.textContent=`Exito La pagina ${pagina} dice :`;
    divExito.appendChild(p1);
    p=document.createElement('p');
    p.textContent=`${mensage}`;
    divExito.appendChild(p);
    // Ejecutar la función eliminarHijos después de 5 segundos (5000 milisegundos)
    setTimeout(() => eliminarHijos(divExito), 6000);
}
function validar(codicion,pagina,mensage,event){
    if (codicion) {
         alerta(pagina,mensage);
         if(event){
          event.preventDefault(); // Previene el envío del formulario
         }
        
         return false;
        }else{
            return true;
        }}
function llenarDl(dl,array,atributoTexto,atributoValue){
      eliminarHijos(dl);
    for(let e of array){
        let op2=document.createElement('option');
        op2.textContent=e[atributoTexto];
        op2.value=e[atributoValue];
        dl.appendChild(op2);
   }
} 
function convertirExpresionRegular(string) {
  return new RegExp(string); // Crea la expresión regular directamente.
}
     
 async function fechPost( endpoint,input) {
            try {
                const token = localStorage.getItem('token');
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        

                    },
                    
                        body:JSON.stringify( input)
                    
                    
                });
        
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del fetch: ${response.status} ${response.statusText}`);
                }
        
                const text = await response.text();
                //console.log('Raw response text:', text);
        
                if (!text) {
                    throw new Error('La respuesta del servidor está vacía');
                }
        
                let data;
                try {
                    data = JSON.parse(text);
                } catch (jsonError) {
                    throw new Error(`Error parseando JSON: ${jsonError.message}`);
                }
        
               // console.log('Success cliente:', data); // Maneja la respuesta del servidor aquí
                return data;
            } catch (error) {
                console.error('Error en fech:', error.message); // Maneja los errores aquí
                throw error; // Re-lanzar el error para que pueda ser capturado en el bloque catch
            }
        }  
// Función para verificar si la palabra está en el arreglo de objetos
function contienePalabra(array,propiedad,palabra) {
   // console.log(array);
    //console.log(propiedad);
    //console.log(palabra);
    return array.some(objeto => objeto[propiedad] === palabra);
  }
 
limpiarCampos(limpiar);
function volver(){
    history.back();
}
function agregarTdCuerpo(elemento,cuerpo){
    let td=document.createElement('td');
    td.textContent=elemento;
    cuerpo.appendChild(td);
}
async function fechProtegidoPost(endpoin,objeto){
    const token = localStorage.getItem('token');
    
    try {
     
      const response = await fetch(endpoin, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Este encabezado es necesario para enviar JSON
        },
        body:JSON.stringify(objeto)
        
      });
     
      if (response.ok) {
        const responseBody = await response.json();
       // console.log(responseBody);
        if(responseBody===false){return responseBody}
        if(responseBody===true){return responseBody}
       if(responseBody.message) {cartelExito(pagina,`La tarea fue realizada con exito: ${responseBody.message}`);}
       // console.log(responseBody);
        
       return responseBody;
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        alerta(pagina,`Hubo un inconveniente al realizar la tarea: ${errorData.message}`);
        return succes=false;
      }
    } catch (error) {
     alerta(pagina,`Error al acceder al servidor: ${error.message}`);
      console.error('Error al acceder al endpoint protegido:', error.message);
      return succes=false;
    }
     }

async function fechGetProtegido(ruta) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(ruta, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const responseBody = await response.json();
        return { data: responseBody, error: null };
      } else {
        let error = await response.json();
        console.log(error);
        alerta(pagina,`Error en la respuesta de la consulta: ${error.message}`);
        return { data: null, error: new Error(error.message) };
      }
    } catch (error) {
      console.error('Error al acceder al endpoint protegido:', error);
      alerta(pagina,`Error al acceder al servidor: ${error.message}`);
      return { data: null, error: error };
    }
  }
 let botonMenu=document.getElementById('botonMenu');
 let divLateral=document.getElementById('divLateral');
 function mostrarMenu(){
    if(divLateral.style.display=='none'){
        divLateral.style.display='block';
    }else{
        divLateral.style.display='none';
    }
 } 
 function mostrarPassword(idImg,idInput){ 
  let imgPassword = document.getElementById(idImg);
  let inputPassword = document.getElementById(idInput);
   if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      imgPassword.src = './Iconos/ojo-cerrado.svg';
    } else {
      inputPassword.type = 'password';
      imgPassword.src = './Iconos/ojo.svg';  
    }
} 
  function ingresarRutaPrincipal() {
    window.location.href = '/principal';
}
function ingresarRegistro(){
    window.location.href = '/registro';
}
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
async function traerComentarios(idImagen){
  eliminarHijos(divComentariosImagen);
  
  
  aux= await fechProtegidoPost('/traerComentariosPorIdImagen',idImagen)
  
  if(aux.success){
    let comentarios=aux.retorno;
        if(comentarios.length<1){
          let h6=document.createElement('h6');
          h6.textContent="Esta imagen no contiene comentarios";
          divComentariosImagen.appendChild(h6)
        }else{
               for(let com of comentarios){
                  let idP={
                      id:com.id_perfil_comentador
                      }
                   let perf=await fechProtegidoPost('/buscarPerfilPorid',idP);
                    if (perf.success){
                                  let perfi=perf.retorno[0];
                                  
                                  let imgP=document.createElement('img');
                                  imgP.className="imgPerfil";
                                  if(!perfi.img_perfil){
                                         imgP.src="/imagenesPerfil/fotoPerfil.svg"
                                  }else{
                                         imgP.src=perfi.img_perfil;
                                  }
                                  let h66=document.createElement('h6');
                                  h66.appendChild(imgP);
                                  h66.append(`${perfi.nombre_persona} ${perfi.apellido_persona}Comento:${com.texto_comentario}`);
                                  divComentariosImagen.appendChild(h66);
                                  
                                  let idC={
                                    idC:com.id_comentario
                                  }
                                  
                                  let cC=await fechProtegidoPost('/buscarContestadosPorComentario',idC);
                                  if(cC.success){
                                    
                                    if(cC.retorno.length>0){
                                      for(let cc of cC.retorno){
                                           let h6C=document.createElement('h6');
                                           h6C.className="h6cc";
                                           h6C.textContent=`Respuesta:${cc.texto_comentario_contestado}`
                                           divComentariosImagen.appendChild(h6C);
                                      }
                                      

                                  }
                                  }
        }
  }
  
        }}}
let divCorroborar=document.getElementById('divCorroborar');        
function llenarDivCorroborar(objetoBajar){
  eliminarHijos(divCorroborar);
  return new Promise((resolve) => {
      let titulo=document.createElement('h5');
      titulo.textContent=`Esta seguro que desea dar de baja:${objetoBajar}`
      divCorroborar.appendChild(titulo);
      let btnSi=document.createElement('button');
      btnSi.textContent="si";
      btnSi.className='boton';
      btnSi.addEventListener('click',function(){
            eliminarHijos(divCorroborar);
            resolve(true);
          });
      let btnNo=document.createElement('button');
      btnNo.textContent="no"; 
      btnNo.className='boton';
      btnNo.addEventListener('click',function(){
            eliminarHijos(divCorroborar);
            resolve(false) ;
          })
      divCorroborar.appendChild(btnSi);
      divCorroborar.appendChild(btnNo);
      })
}
//export{Focultar};

