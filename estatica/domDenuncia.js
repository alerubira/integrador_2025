let divHacerDenuncia=document.getElementById('divHacerDenuncia');
let dlMotivosDenuncia=document.getElementById('dlMotivosDenuncia');
let motivosDenuncia;
async function denunciar(){
    mostrar(divHacerDenuncia)
    let id={
        idPerfil:perfil.idPerfil,
    }
  aux=await fechProtegidoPost('/traerMotivosDenuncia',id)
  if(aux.success){
    console.log(aux.retorno)
    llenarDl(dlMotivosDenuncia,aux.retorno,'nombreMotivoDenuncia','nombreMotivoDenuncia')
    motivosDenuncia=aux.retorno;
  }
}
let inputDenuncia=document.getElementById('inputDenuncia');
async function enviarDenuncia(){
    let bandera=true;
    let value=inputDenuncia.value;
    console.log(value);
    let motivoDenuncia=motivosDenuncia.find(motivo => motivo.nombreMotivoDenuncia === value);
    if(!validar(!motivoDenuncia,pagina,"el motivo de la denuncia  no existe")){
        bandera=false;
    }
    console.log(imgSeleccionada)
    if(bandera){
           let denuncia={
        idMotivoDenuncia:motivoDenuncia.idMotivoDenuncia,
        idImagenDenunciada:imagenSeleccionada.id_imagen,
        idPerfilDenunciante:perfil.idPerfil,
        idPerfilDenunciado:imagenSeleccionada.id_perfil,
    }
    console.log(denuncia);
    }
    

   
}