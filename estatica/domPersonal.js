pagina=`Pagina Personal de: ${perfil.nombrePersona} ${perfil.apellidoPersona}`;
let sectionPerfil=document.getElementById("sectionPerfil");
let sectionModificar=document.getElementById("sectionModificar");
function verPerfil(){
mostrar(sectionPerfil);
}
function modificarPerfil(){
mostrar(sectionModificar);
}
function buscarPersonas(){
    
}

document.getElementById('imagen').addEventListener('change', function(){
    document.getElementById('nombreArchivo').textContent = this.files[0]?.name || 'No se ha seleccionado archivo';
});

let selectModificar=document.getElementById("selectModificar");
let sectionModificarImagenPerfil=document.getElementById("sectionModificarImagenPerfil");
selectModificar.addEventListener('change',async function(){
    let selectedValue = this.value;
    switch(selectedValue) {
        case "1":
            modificarNombre();
            break;
        case "2":
            modificarApellido();
            break; 
        case "3":
            modificarEMail();
            ;
            break; 
        case "4":
            mostrar(sectionModificarImagenPerfil);
            break;  
        case "5":
            modificarIntereses();
            break;
        case "6":
            modificarAntecedentes();
            break;          
        default:
            console.log('Selección no válida');
            alerta(pagina,('Seleccion no valida'));         
    }
    selectModificar.selectedIndex = 0;
});
async function redirigirCarpetas(){
    fechProtegidoPost("/accederCarpetas",perfil)
}
