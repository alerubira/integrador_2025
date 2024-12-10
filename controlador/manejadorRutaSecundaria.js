import { Profesion } from "../modelo/claseProfesion.js";
import { retornarError } from "./funsionesControlador.js";
async function manejadorSecundaria(req,res,accion){
let aux;
let object;
let encabezado;
try{
    switch (accion) {
        case 'ingresar':
            encabezado='pagina secundaria';
            res.render('vistasecundaria',{encabezado});
            break;
        case 'buscarProfesiones':
            aux=await Profesion.consulta();
            if(aux instanceof Error){return retornarError(res,`Error al buscar profesiones :${aux}`)}
            let prs=[];
            for(let p of aux){
                let pr=new Profesion(p.id_profesion,p.nombre_profesion,p.activo_profesion);
                prs.push(pr);
            }
            return res.send(prs);
            break;    
        default:
            let m=`Seleccion ${accion} dentro del manejador secundaria Invalida `  ;
            console.error(m);
            return retornarError(res,m);  
    }        

}catch(error){
    let m=`Error dentro del manejador de rutas de Secundaria :${error}`;
    console.error(m);
    return retornarError(res,m);
}

}
export{manejadorSecundaria};