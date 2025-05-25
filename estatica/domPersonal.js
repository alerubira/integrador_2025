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
            verPerfil();
            break;
        case "2":
            modificarPerfil();
            break; 
        case "3":
            ;
            break; 
        case "4":
            mostrar(sectionModificarImagenPerfil);
            break;    
        default:
            console.log('Selección no válida');
            alerta(pagina,('Seleccion no valida'));         
    }
    selectModificar.selectedIndex = 0;
});