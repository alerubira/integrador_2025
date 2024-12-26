import { Profesion } from "../modelo/claseProfesion.js";
import { Profesional } from "../modelo/claseProfesional.js";
import { retornarError, retornarExito } from "./funsionesControlador.js";
import { parametros } from "../parametros.js";
import { verificarYup } from "./verificaryup.js";
import { existeBd, existeNombreBd } from "../modelo/conexxionBD.js";
import { Login } from "../modelo/claseLogin.js";
async function manejadorSecundaria(req,res,accion){
let aux;
let object;
let encabezado;
try{
    switch (accion) {
        case 'ingresar':
            const datosEncoded = req.query.datos; 
            const datosDecoded = decodeURIComponent(datosEncoded);
             const toke = JSON.parse(datosDecoded);
    
            if(!toke){return retornarError(res,"Datos de acceso Invalido")}
            
                 if(toke.tipoAutorizacion!==2){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
                 if (toke.tipoAutorizacion === 2) {
                    let  encabezado = "Pagina Secundaria";
                    let p1=await Profesional.consultaPorId(toke.idSolicitante);
                   if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
                   let p=p1[0][0]
                   if(p.activo_profesional!==1||p.activo_persona!==1){return retornarError(res,"El Profecional Esta dado de baja")}
                  let profesional=new Profesional(p.id_profesional,p.id_profesion,p.nombre_profesion,p.activo_profesional,p.id_persona,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona);
                
            res.render('vistasecundaria',{encabezado,parametros,profesional});
                 }
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
        case 'modificarEstadoProfesion':
            object=req.body;
            aux=await existeBd(object.idProfesion,'profesion','id_profesion');  
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la profesion :${aux}`)}
            if(!aux){return retornarError(res,'La Profesion no existe')}
            let profesion=new Profesion(object.idProfesion,object.nombreProfesion,object.activoProfesion);
            aux=await profesion.modificarActivo();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado de la Profesion:${aux}`)}   
            return retornarExito(res,"Estado de la Profesion modificado con exito");
            break;    
        case 'buscarProfesionales':
            aux=await Profesional.consulta();
            if(aux instanceof Error){return retornarError(res,`Error al buscar profesionales :${aux}`)}
            //
            let prof=[];
            for(let p of aux[0]){
                let pr=new Profesional(p.id_profesional,p.id_profesion,p.nombre_profesion,p.activo_profesional,p.id_persona,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona);
                prof.push(pr);
            }
            return res.send(prof);
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