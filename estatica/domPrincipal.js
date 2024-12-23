
 let formLogin=document.getElementById('formularioLogin');
let inputUsuario=document.getElementById('usuario');
let inputClave=document.getElementById('clave1');
let errLogin=document.getElementById('errLogin');
let instancia=document.getElementById('instancia');
let exito=document.getElementById('exito');
//let instanciaValue=instancia.textContent;
let formModificarLogin=document.getElementById('formularioModificarLogin');
let formRecuperarLogin=document.getElementById('formularioRecuperarLogin');
let inputUsuari2=document.getElementById('usuario2');
let inputClave2=document.getElementById('clave2');
let inpuClave3=document.getElementById('clave3');
let inputClave4=document.getElementById('clave4');
let inputUsuario5=document.getElementById('usuario5');
let inputPalabraClave=document.getElementById('palabraClave');
let inputClave6=document.getElementById('clave6');
let inputClave7=document.getElementById('clave7');
let inputPalabraClave2=document.getElementById('palabraClave2');
let inputPalabraClave3=document.getElementById('palabraClave3');
pagina="Principal";
//limpiarCampos(limpiar);
//console.log(instanciaValue);
/*if(exitoValue==='true'){
    cartelExito(pagina,'La modificacion de la clave fue realizada con exito')
}
 if(errLoginValue==='false'){
        alerta(pagina,'Algo esta mal con el login');
    }
 */
/*function mostrar(){
    limpiarCampos(limpiar);
    fOcultar();
    formModificarLogin.style.display = 'block';

}
function mostrar1(){
    limpiarCampos(limpiar);
fOcultar();    
formRecuperarLogin.style.display='block';
}*/
formRecuperarLogin.addEventListener('submit',async function(event){
  event.preventDefault();
let usuario5Value=inputUsuario5.value;
let palabraClaveValue=inputPalabraClave.value;
let clave6Value=inputClave6.value;
let clave7Value=inputClave7.value;
let a=validar(usuario5Value.length<1||usuario5Value.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
let b=validar(palabraClaveValue.length<1||palabraClaveValue.length>35,pagina,'La palabra clave es obligatorio y no debe superar los 35 caracteres',event);
let c=validar(clave6Value.length<1||!cla.test(clave6Value),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
let d=validar(clave7Value.length<1||!cla.test(clave7Value),pagina,'La nueva clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
let e=validar(clave6Value!==clave7Value,pagina,'La confirmacion de la clave no es igual a la clave nueva',event);
if(a&&b&&c&&d&&e){
  const response = await fetch('/recuperarLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({usuario5: usuario5Value,clave6: clave6Value,clave7:clave7Value,palabraClave:palabraClaveValue })
    });
  
    const data = await response.json();
  
    if (response.ok) {
               cartelExito(pagina,"El Login fue modificado con exito");  
               limpiarCampos(limpiar);
               fOcultar(); 
                  
    } else {
      console.error('Error al modificarlogin:', data.message);
      alerta(pagina,`Error al modificar el Login:${data.message}`);
    }
}
});
let regClave =convertirExpresionRegular(parametros.clave);
formLogin.addEventListener('submit',async function(event) {
    event.preventDefault();
    bandera=true;
    let claveValue=inputClave.value ;
    let usuarioValue=inputUsuario.value ;//cuando ande bie modificar mensajes para que no sean muy informativos
    if(!validar(usuarioValue.length<1||usuarioValue.length>parametros.tamaño2,pagina,`El usuario es obligatorio y ${parametros.cartelTamño2}`,event))bandera=false;
    if(!validar(!regClave.test(claveValue),pagina,`${parametros.cartelClave}`,event)){bandera=false};

    if(bandera){
      let login={
        usuario:usuarioValue,
        clave:claveValue
      }
        const response = await fetch('/verificarLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          });
         const data = await response.json();
        if (response.ok) {
                        if (data.codigoPersonalizado === 801) {
                          limpiarCampos(limpiar);
                          alerta(pagina,'Para continuar,debe modificar su clave');
                          mostrar(formModificarLogin);
                          
                        }else{
                        // Almacenar el token en localStorage
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('tipoAutorizacion', data.tipoAutorizacion);
                        localStorage.setItem('idSolicitante',data.idSolicitante);
                            // Redirigir o realizar acciones basadas en el tipo de autorización
                            if (data.tipoAutorizacion === 3) {
                                  let token = data.token;
                               // window.location.href = `/acceso?token=${token}`;
                               let toke={};
                              toke.tipoAutorizacion=data.tipoAutorizacion;
                              toke.idSolicitante=data.idSolicitante;
                              
                              let tokeJ=JSON.stringify(toke);
                              let cadena=encodeURIComponent(tokeJ);
                            
                                 window.location.href = `/acceso?datos=${cadena}`;
                                }
                            if(data.tipoAutorizacion===2){
                              let token=data.token;
                              let toke={};
                              toke.tipoAutorizacion=data.tipoAutorizacion;
                              toke.idSolicitante=data.idSolicitante;
                              let tokeJ=JSON.stringify(toke);
                              let cadena=encodeURIComponent(tokeJ);
                             // window.location.href = `/prescripcion?datos=${cadena}`;
                              window.location.href = `/secundaria?datos=${cadena}`;
                            }    
                              }    
          } else {
            console.error('Error en el login:', data.message);
            alerta(pagina,`Error al verificar el Login:${data.message}`);
          }
    }
  
});
//hacer funsion para mostrar formulario modificar login
// Función para cargar el contenido de la página de acceso
/*function cargarContenidoAcceso() {
  const token = localStorage.getItem('token');
  fetch('/acceso', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    }
  })
  /*.then(html => {
    //document.body.innerHTML = html;
    document.documentElement.innerHTML = html;
    const script1 = document.createElement('script');
            script1.src = 'domAcceso1.js';
            script1.textContent = script1.textContent;
            document.head.appendChild(script1);
  })*/
  /*.catch(error => {
    console.error('Error al acceder al endpoint protegido:', error);
  });
}*/

// Llama a la función para acceder al endpoint protegido si estamos en la página de acceso
/*if (window.location.pathname === '/acceso') {
  cargarContenidoAcceso();
}*/
/*function accederEndpointProtegido(token) {
    fetch('/acceso', {
      method: 'GET',
      headers: {
        'Authorization': token 
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Datos del endpoint protegido:', data);
    })
    .catch(error => {
      console.error('Error al acceder al endpoint protegido:', error);
    });
  }*/
 /* function accederEndpointProtegido() {
    //window.location.href = '/acceso';
    // Ir a la página anterior en el historial del navegador
    //history.back();
    const token = localStorage.getItem('token');
    fetch('/acceso', {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(response.ok);
         // Si la respuesta es correcta, redirigir a la página de acceso con el token
         window.location.href = `/acceso?token=${token}`;
        // Redirigir el navegador a la página de acceso
      // window.location.href = '/acceso';
      // Ir a la página siguiente en el historial del navegador (si hay una)
      // Agregar una nueva entrada al historial sin recargar la página
           // history.pushState({key: 'valor1'}, 'acceso', '/acceso');
      //history.forward();

       // Espera 5 segundos (5000 milisegundos) y luego redirige a '/acceso'
         /* setTimeout(function() {
            window.location.href = '/acceso';
          }, 5000);*/

    /*  } else {
        return response.json().then(data => {
          console.error('Error al acceder al endpoint protegido :', data);
        });
      }
    })
    .catch(error => {
      console.error('Error al acceder al endpoint protegido:', error);
    });
  }*/
 /* if (window.location.pathname === '/acceso') {
    accederEndpointProtegido();
  }*/
formModificarLogin.addEventListener('submit',async function(event){
  event.preventDefault();//reacomodar
let usuario2Value=inputUsuari2.value;
let clave2Value=inputClave2.value;
let clave3Value=inpuClave3.value;
let clave4Value=inputClave4.value;
if(!validar(usuario2Value.length<1||usuario2Value.length>parametros.tamaño2,pagina,`El usuario es obligatorio y ${parametros.cartelTamño2}`,event))bandera=false;
if(!validar(!regClave.test(clave2Value),pagina,`${parametros.cartelClave}`,event)){bandera=false};
if(!validar(!regClave.test(clave3Value),pagina,`${parametros.cartelClave}`,event)){bandera=false};
if(!validar(clave3Value!==clave4Value,pagina,'La confirmacion de la clave no es igual a la clave nueva',event)){bandera=false};

if(bandera){
  const response = await fetch('/modificarLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({usuario: usuario2Value,clave: clave2Value,claveN:clave3Value,claveN2:clave4Value })
    });
  
    const data = await response.json();
  
    if (response.ok) {
               cartelExito(pagina,"El Login fue modificado con exito");  
               limpiarCampos(limpiar);
               fOcultar(); 
                  
    } else {
      console.error('Error al modificarlogin:', data.message);
      alerta(pagina,`Error al modificar el Login:${data.message}`);
    }
}
});

function mostrarPassword() {
  let inputPasswords = document.getElementsByClassName('inputPassword');
  for (let inputPassword of inputPasswords) {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
    } else {
      inputPassword.type = 'password';
    }
  }
}
limpiarCampos(limpiar);
setTimeout(() => limpiarCampos(limpiar), 1000);
