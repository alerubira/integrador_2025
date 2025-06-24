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
    llenarDl(dlMotivosDenuncia,aux.retorno,'nombreMotivoDenuncia','nombreMotivoDenuncia')
    motivosDenuncia=aux.retorno;
  }
}
let inputDenuncia=document.getElementById('inputDenuncia');
async function enviarDenuncia(){
    let bandera=true;
    let value=inputDenuncia.value;
    let motivoDenuncia=motivosDenuncia.find(motivo => motivo.nombreMotivoDenuncia === value);
    if(!validar(!motivoDenuncia,pagina,"el motivo de la denuncia  no existe")){
        bandera=false;
    }
    if(!validar(!imgSeleccionada,pagina,"no hay imagen seleccionada para denunciar")){
        bandera=false;
    }
    if(bandera){
           let denuncia={
        idMotivoDenuncia:motivoDenuncia.idMotivoDenuncia,
        idImagenDenunciada:imgSeleccionada.id_imagen,
        idPerfilDenunciante:perfil.idPerfil,
        idPerfilDenunciado:imgSeleccionada.id_perfil,
           }
          aux=await fechProtegidoPost('/enviarDenuncia',denuncia);
          if(aux.success){      
           
           inputDenuncia.value="";
           fOcultar();
          }
    }
    

   
}