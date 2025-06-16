let perfilesBuscados;
let mensageNoEncontrado1=document.getElementById('mensageNoEncontrado1')
 document.getElementById('inputBuscarSeguidoers').addEventListener('keyup',async function(){
    if(this.value.length>2){
     let frac=this.value.toLowerCase();
     mensageNoEncontrado1.style.display = 'none';
     let a={
        idPerfil:perfil.idPerfil,
        frac:frac
     }
     aux =await fechProtegidoPost('/buscarPerfilSeguidoresPorApellido',a);
      perfilesBuscados=aux.retorno[0];
      console.log(perfilesBuscados)
     if(aux.success){
       if(perfilesBuscados.length<1){
        mensageNoEncontrado1.style.display="block";
       }else{mensageNoEncontrado1.style.display="none"
            llenarTablaPerfiles(perfilesBuscados); 
       }
    }
          
    }
    
     
filtro="";//controlar que no se quede seleccionado
 });
 let cuerpo1=document.getElementById('cuerpo1');
 async function llenarTablaPerfiles(perfiles){
     eliminarHijos(cuerpo1);
     for(let perf of perfiles){
          let tr=document.createElement('tr');
          cuerpo1.appendChild(tr);
          agregarTdCuerpo(perf.id_perfil,tr);
          agregarTdCuerpo(perf.nombre_perfil,tr);
          agregarTdCuerpo(perf.nombre_persona,tr);
          agregarTdCuerpo(perf.apellido_persona,tr)
          let imgPerf=document.createElement('img');
          imgPerf.className="imgPerfil2";
          if(!imgPerf){
              imgPerf.src="/imagenesPerfil/fotoPerfil.svg"
          }else{ imgPerf.src=perf.img_perfil;}
         
          let td0=document.createElement('td');
          td0.appendChild(imgPerf)
          tr.appendChild(td0);
          let btn=document.createElement('button');
          btn.textContent='Compartir';
          btn.className = 'boton';
          btn.addEventListener('click', seleccionarPerfilParaCompartir);
          let td=document.createElement('td');
          td.appendChild(btn);
          tr.appendChild(td);
     }

 }
 async function seleccionarPerfilParaCompartir(){
    let idPerfilSeleccionado = parseInt(this.parentNode.parentNode.firstChild.textContent);
    
   let perfilSeleccionado=perfilesBuscados.find(perf=>perf.id_perfil===idPerfilSeleccionado);
    eliminarHijos(cuerpo1);
        fOcultar();
        let imgComp={
          idAlbumSegidor:perfilSeleccionado.id_album_seguidor,
          idPerfilSeguido:perfil.idPerfil,
          idPerfilSeguidor:perfilSeleccionado.id_perfil,
          IdImgSeleccionada:imagenSeleccionada.idImagen
        }
        console.log(imgComp)
        aux=await fechProtegidoPost('/agregarImgAlbumSeguidor',imgComp)
        if(aux.success){
          limpiarCampos(limpiar);
        }
        //divContenedorPerfil.style.display="none";
        
    /*imgPerfilSeleccionado.src=perfilSeleccionado.img_perfil;
    pPerfilSeleccionado.textContent=`Nombre:${perfilSeleccionado.nombre_persona}//Apellido:${perfilSeleccionado.apellido_persona}//Nombre del Perfil:${perfilSeleccionado.nombre_perfil}`;
    let int;
    if(perfilSeleccionado.intereses_perfil===null){
        int="No Contiene";
    }else{int=perfilSeleccionado.intereses_perfil}
    let ant;
    if(perfilSeleccionado.antecedentes_perfil===null){
         ant="No contiene";
    }else{ant=perfilSeleccionado.antecedentes_perfil}
    PerfilSeleccionad1.textContent=`Intereses:${int}//Antecedentes:${ant}`
    mostrar(divPerfilSeleccionado); 
    divContenedorPerfil.style.display="block"; */   
}