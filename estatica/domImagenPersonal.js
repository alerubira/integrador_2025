let divImagenesUsuarios=document.getElementById('divImagenesUsuarios');
async function traerImagenesPublcas(){
    let perf={
        idPerfil:perfil.idPerfil
    }
    aux=await fechProtegidoPost('/traerImagenesPublicas',perf)
    console.log(aux);
    console.log(aux.retorno)
}
traerImagenesPublcas();