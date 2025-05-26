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

function modificarEmail(){
}
function modificarIntereses(){

}
function modificarAntecedentes(){

}