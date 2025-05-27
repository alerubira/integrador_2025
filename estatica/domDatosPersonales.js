let sectionModificarNombre=document.getElementById("sectionModificarNombre");
function modificarNombre(){
limpiarCampos(limpiar);
fOcultar();
mostrar(sectionModificarNombre);
}
let=inputNuevoNombrePersonaPerfil=document.getElementById("inputNuevoNombrePersonaPerfil");
let lblNombreYApellido=document.getElementById("lblNombreYApellido");
let pNombreActual=document.getElementById("pNombreActual");
async function modificarNombrePersonaPerfil(){
bandera=true;
let inputValue = inputNuevoNombrePersonaPerfil.value;
let regNombres=convertirExpresionRegular(parametros.nombres);
 if(!validar(!regNombres.test(inputValue),pagina,`en el Nombre ${parametros.cartelNombres}`)){bandera=false};    
if(bandera){
    persona={
        idPersona:perfil.idPersona,
        dniPersona:perfil.dniPersona,
        nombrePersona:inputValue,
        apellidoPersona:perfil.apellidoPersona,
        activoPersona:perfil.activoPersona
    }
    aux=await fechProtegidoPost('/modificarNombrePersona',persona);
          if(aux.success){
               lblNombreYApellido.textContent=`${inputValue}  ${perfil.apellidoPersona}`;
               pNombreActual.textContent=`Nombre Actual :${inputValue}`;
               perfil.nombrePersona=inputValue;
               pNombreActual.textContent=inputValue;
               limpiarCampos(limpiar);
               fOcultar();
          }
}
 
}
let sectionModificarApellido=document.getElementById("sectionModificarApellido");
function modificarApellido(){
limpiarCampos(limpiar);
fOcultar();

mostrar(sectionModificarApellido);
}
let pApellidoActual=document.getElementById("pApellidoActual");
let inputNuevoApellidoPersonaPerfil=document.getElementById("inputNuevoApellidoPersonaPerfil");
async function modificarApellidoPersonaPerfil(){
bandera=true;
let inputValue=inputNuevoApellidoPersonaPerfil.value;
let regNombres=convertirExpresionRegular(parametros.nombres);
if(!validar(!regNombres.test(inputValue),pagina,`en el Apellido ${parametros.cartelNombres}`)){bandera=false}
if(bandera){
    persona={
        idPersona:perfil.idPersona,
        dniPersona:perfil.dniPersona,
        nombrePersona:perfil.nombrePersona,
        apellidoPersona:inputValue,
        activoPersona:perfil.activoPersona
    }
    aux=await fechProtegidoPost('/modificarApellidoPersona',persona);
          if(aux.success){
               lblNombreYApellido.textContent=`${perfil.nombrePersona}  ${inputValue}`;
               pApellidoActual.textContent=`Apellido Actual :${inputValue}`;
               perfil.apellidoPersona=inputValue;
               limpiarCampos(limpiar);
               fOcultar();
          }
        }
    }
let sectionModificarEMail=document.getElementById("sectionModificarEMail");
function modificarEMail(){
    limpiarCampos(limpiar);
    fOcultar();
    mostrar(sectionModificarEMail);
}
let inputNuevoEMailPerfil=document.getElementById("inputNuevoEMailPerfil");
let pEMailActual=document.getElementById("pEMailActual");
async function modificarEMailPerfil(){
    bandera=true;
    let inputValue=inputNuevoEMailPerfil.value;
    let regEmail=convertirExpresionRegular(parametros.email);
    if(!validar(!regEmail.test(inputValue),pagina,`en el Email ${parametros.cartelEmail}`)){bandera=false}
    if(bandera){
        perf={
           idPerfil:perfil.idPerfil,
           idPersona:perfil.idPersona,
            dniPersona:perfil.dniPersona,
            nombrePersona:perfil.nombrePersona,
            apellidoPersona:perfil.apellidoPersona,
           eMailPerfil: inputValue,
        }
        aux=await fechProtegidoPost('/modificarEmailPerfil',perf);
        if(aux.success){
            perfil.emailPersona=inputValue;
            pEMailActual.textContent=`Email Actual :${inputValue}`;
            limpiarCampos(limpiar);
            fOcultar();
        }
    }
}
let sectionModificarIntereses=document.getElementById("sectionModificarIntereses");
function modificarIntereses(){
limpiarCampos(limpiar);
fOcultar();
mostrar(sectionModificarIntereses);
}
let inputNuevoInteresesPerfil=document.getElementById("inputNuevoInteresesPerfil");
let pInteresesActual=document.getElementById("pInteresesActual");
async function modificarInteresesPerfil(){
    bandera=true;
    let inputValue=inputNuevoInteresesPerfil.value;
    if(inputValue.length>parametros.tamaño4){
        alerta(pagina,`Los intereses no deben superar los ${parametros.tamaño4} caracteres`);
        bandera=false;
    }
    if(bandera){
        perf={
            idPerfil:perfil.idPerfil,
            idPersona:perfil.idPersona,
            dniPersona:perfil.dniPersona,
            nombrePersona:perfil.nombrePersona,
            apellidoPersona:perfil.apellidoPersona,
            eMailPerfil:perfil.eMail,
            interesesPerfil: inputValue,
        }
        aux=await fechProtegidoPost('/modificarInteresesPerfil',perf);
        if(aux.success){
            perfil.interesesPersona=inputValue;
            pInteresesActual.textContent=`Intereses Actual :${inputValue}`;
            limpiarCampos(limpiar);
            fOcultar();
        }
    }
}
let sectionModificarAntecedentes=document.getElementById("sectionModificarAntecedentes");
function modificarAntecedentes(){
limpiarCampos(limpiar);
fOcultar(); 
mostrar(sectionModificarAntecedentes);
}

let inputNuevoAntecedentesPerfil=document.getElementById("inputNuevoAntecedentesPerfil");
let pAntecedentesActual=document.getElementById("pAntecedentesActual");
async function modificarAntesedentesPerfil(){
    bandera=true;
    let inputValue=inputNuevoAntecedentesPerfil.value;
    if(inputValue.length>parametros.tamaño4){
        alerta(pagina,`Los antecedentes no deben superar los ${parametros.tamaño4} caracteres`);
        bandera=false;
    }
    if(bandera){
        perf={
            idPerfil:perfil.idPerfil,
            idPersona:perfil.idPersona,
            dniPersona:perfil.dniPersona,
            nombrePersona:perfil.nombrePersona,
            apellidoPersona:perfil.apellidoPersona,
            eMailPerfil:perfil.eMail,
            antecedentesPerfil: inputValue,
        }
        aux=await fechProtegidoPost('/modificarAntecedentesPerfil',perf);
        if(aux.success){
            pAntecedentesActual.textContent=`Antecedentes Actual :${inputValue}`;
            perfil.antecedentesPerfil=inputValue;
            limpiarCampos(limpiar);
            fOcultar();
        }
    }
}