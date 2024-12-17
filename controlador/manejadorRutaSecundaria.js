import { Profesion } from "../modelo/claseProfesion.js";
import { Profesional } from "../modelo/claseProfesional.js";
import { retornarError, retornarExito } from "./funsionesControlador.js";
import { parametros } from "../parametros.js";
import { verificarYup } from "./verificaryup.js";
import { existeBd, existeNombreBd } from "../modelo/conexxionBD.js";
async function manejadorSecundaria(req,res,accion){
let aux;
let object;
let encabezado;
try{
    switch (accion) {
        case 'ingresar':
            encabezado='pagina secundaria';
            res.render('vistasecundaria',{encabezado,parametros});
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
        case 'buscarProfesionales':
            aux=await Profesional.consulta();
            if(aux instanceof Error){return retornarError(res,`Error al buscar profesionales :${aux}`)}
            console.log(aux[0]);
            //hacer arreglo de objetos profesional
           /* let prof=[];
            for(let p of aux){
                let pr=new Profesion(p.id_profesion,p.nombre_profesion,p.activo_profesion);
                prs.push(pr);
            }*/
            return res.send(aux[0]);
            break;    
        case 'crearProfesion':
            object=req.body;
            aux= verificarYup(object,'profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeNombreBd(object.nombreProfesion,'profesion','nombre_profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si la Profesion existe :${aux}`)}
            if(aux){return retornarError(res,'El nombre de la Profesion ya existe en la base de datos')}
            aux=await Profesion.alta(object);
            console.log(aux);
            return res.send(aux);
            break;  
        case 'crearProfesional':
            object=req.body;
            aux=await existeBd(object.idProfesionProfesional,'profesion','id_profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la profesion :${aux}`)}
            if(!aux){return retornarError(res,'La Profesion en el Profesional no existe')}
            aux=await verificarYup(object,'persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await Profesional.alta(object);
            if(aux instanceof Error){return retornarError(res,`Error al crear y guardar Profesional:${aux}`)}
            return retornarExito(res,"Profesional generado y guardado con exito");
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