let dniPersona=document.getElementById("dniPersona");
let nombrePersona=document.getElementById("nombrePersona");
let apellidoPersona=document.getElementById("apellidoPersona");
let eMail=document.getElementById("eMail");
let usuario=document.getElementById("usuario");
let clave=document.getElementById("clave");
let claveR=document.getElementById("claveR");
pagina="Registro";

async function crearPerfil() {//crearPerfil
    let regDni =convertirExpresionRegular(parametros.dni);
     let regNombres=convertirExpresionRegular(parametros.nombres);
     let regEMail=convertirExpresionRegular(parametros.eMail);
    let regClave =convertirExpresionRegular(parametros.clave);
    let dniValue =parseInt(dniPersona.value) ;
    let nombreValue = nombrePersona.value;
    let apellidoValue = apellidoPersona.value;
    let eMailValue = eMail.value;
    let usuarioValue = usuario.value;
    let claveValue = clave.value;
    let claveRValue = claveR.value;
    let bandera =true;
     if(!validar(!regDni.test(dniValue),pagina,`${parametros.cartelDni}`)){bandera=false};
     if(!validar(!regNombres.test(nombreValue),pagina,`en el Nombre ${parametros.cartelNombres}`)){bandera=false};
     if(!validar(nombreValue.length<1||nombreValue.length>parametros.tamaño1,pagina,`El Nombre es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
     if(!validar(!regNombres.test(apellidoValue),pagina,`en el Apellido ${parametros.cartelNombres}`)){bandera=false};
     if(!validar(apellidoValue.length<1||apellidoValue.length>parametros.tamaño1,pagina,`El Apellido es obligatorio y ${parametros.cartelTamaño1}`)){bandera=false}
     if(!validar(!regEMail.test(eMailValue)||eMailValue.length<1,pagina,`${parametros.cartelEMail}`)){bandera=false}
     if(!validar(usuarioValue.length<1||usuarioValue.length>parametros.tamaño2,pagina,` ${parametros.cartelLoginMal}`,event))bandera=false;
    if(!validar(!regClave.test(claveValue),pagina,`${parametros.cartelLoginMal}`)){bandera=false};
    if(!validar(!regClave.test(claveRValue),pagina,`La Clave Nueva ${parametros.cartelClave}`)){bandera=false};
    if(!validar(claveValue!==claveRValue,pagina,'La confirmacion de la clave no es igual a la clave nueva')){bandera=false};
   if(bandera){
    let perf={
        dniPerson:dniValue,
        nombrePersona:nombreValue,
        apellidoPersona:apellidoValue,
        eMailPersona:eMailValue,
        usuario:usuarioValue,
        clave:claveValue
    }
        const response = await fetch('/registrarPerfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                perf:perf
            })
        
            });
        
            const data = await response.json();
        
            if (response.ok) {
                    cartelExito(pagina,"El perfil fue creado con exito,ahora puede ingresar");  
                    limpiarCampos(limpiar);
                    fOcultar(); 
                        
            } else {
            console.error('Error al crear el Perfil:', data.message);
            alerta(pagina,`Error al crear el Perfil:${data.message}`);
            }
}
}
