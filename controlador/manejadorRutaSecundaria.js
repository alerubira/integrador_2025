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
let profesion;
let profesional;
let persona;
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
                   profesional=new Profesional(p.id_profesional,p.id_profesion,p.nombre_profesion,p.activo_profesional,p.id_persona,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona);
                
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
             profesion=new Profesion(object.idProfesion,object.nombreProfesion,object.activoProfesion);
            aux=await profesion.modificarActivo();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado de la Profesion:${aux}`)}   
            return retornarExito(res,"Estado de la Profesion modificado con exito");
            break;
        case 'modificarNombreProfesion':
            object=req.body;
            aux=await existeBd(object.idProfesion,'profesion','id_profesion');  
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la profesion :${aux}`)}
            if(!aux){return retornarError(res,'La Profesion no existe')}
            aux=await verificarYup(object,'profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeNombreBd(object.nombreProfesion,'profesion','nombre_profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si la Profesion existe :${aux}`)}
            if(aux){return retornarError(res,'El nombre de la Profesion ya existe en la base de datos')}
             profesion=new Profesion(object.idProfesion,object.nombreProfesion,object.activoProfesion);
            aux=await profesion.modificarNombre();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el nombre de la Profesion:${aux}`)}   
            return retornarExito(res,"Nombre de la Profesion modificado con exito");        
        case 'buscarProfesionales':
            aux=await Profesional.consulta();
            if(aux instanceof Error){return retornarError(res,`Error al buscar profesionales :${aux}`)}
            //
            let profesionales=[];
            for(let p of aux[0]){
                let pr=new Profesional(p.id_profesional,p.id_profesion,p.nombre_profesion,p.activo_profesional,p.id_persona,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona,p.e_mail);   
                profesionales.push(pr);
            }
            return res.send(profesionales);
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
            //crear en yup profesional con meil y datos adicionales(los que se pida en el integrador)
            aux=await Profesional.alta(object);
            if(aux instanceof Error){return retornarError(res,`Error al crear y guardar Profesional:${aux}`)}
            return retornarExito(res,"Profesional generado y guardado con exito");
            break; 
        case 'modificarEstadoPersona':
            object=req.body;
            aux=await existeBd(object.idPersona,'persona','id_persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la persona :${aux}`)}    
            if(!aux){return retornarError(res,'La Persona no existe')}
            aux=await verificarYup(object,'persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
             persona=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await persona.modificarActivoPer();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado de la Persona:${aux}`)}
            return retornarExito(res,"Estado de la Persona modificado con exito");
            break; 
        case 'modificarEstadoProfesional':
            object=req.body;
            aux=await existeBd(object.idProfesional,'profesional','id_profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite el Profesional :${aux}`)}    
            if(!aux){return retornarError(res,'El Profesional no existe')}
            aux=await verificarYup(object,'profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
             profesional=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await profesional.modificarActivoPro();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado del Profesional:${aux}`)}
            return retornarExito(res,"Estado del Profesional modificado con exito");
            break; 
        case 'modificarProfesionProfesional':
            object=req.body;
            aux=await existeBd(object.idProfesion,'profesion','id_profesion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la profesion :${aux}`)}    
            if(!aux){return retornarError(res,'La Profesion no existe')}
            aux=await verificarYup(object,'profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            
             profesional=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await profesional.modificarProfesion();
            if(aux instanceof Error){return retornarError(res,`Error al modificar la Profesion del Profesional:${aux}`)}
            return retornarExito(res,"Profesion del Profesional modificada con exito");
            break;
        case 'modificarEMailProfesional':
            object=req.body;
            aux=await verificarYup(object,'profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeBd(object.idProfesional,'profesional','id_profesional');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite el Profesional :${aux}`)}    
            if(!aux){return retornarError(res,'El Profesional no existe')}
             profesional=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona,object.eMail);
            aux=await profesional.modificarEMail();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el EMail del Profesional:${aux}`)}
            return retornarExito(res,"EMail del Profesional modificado con exito");
            break;
        case 'modificarNombrePersona':
            object=req.body;
            aux=await verificarYup(object,'persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeBd(object.idPersona,'persona','id_persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la persona :${aux}`)}    
            if(!aux){return retornarError(res,'La Persona no existe')}
             persona=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await persona.modificarNombre();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el nombre de la Persona:${aux}`)}
            return retornarExito(res,"Nombre de la Persona modificado con exito");
            break; 
        case 'modificarApellidoPersona':
            object=req.body;
            aux=await verificarYup(object,'persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeBd(object.idPersona,'persona','id_persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la persona :${aux}`)}    
            if(!aux){return retornarError(res,'La Persona no existe')}
             persona=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await persona.modificarApellido();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el apellido de la Persona:${aux}`)}
            return retornarExito(res,"Apellido de la Persona modificado con exito");
            break;
        case 'modificarDniPersona':
            object=req.body;
            aux=await verificarYup(object,'persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
            aux=await existeBd(object.idPersona,'persona','id_persona');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si exite la persona :${aux}`)}    
            if(!aux){return retornarError(res,'La Persona no existe')}
             persona=new Profesional(object.idProfesional,object.idProfesion,object.nombreProfesion,object.activoProfesional,object.idPersona,object.dniPersona,object.nombrePersona,object.apellidoPersona,object.activoPersona);
            aux=await persona.modificarDni();
            if(aux instanceof Error){return retornarError(res,`Error al modificar el dni de la Persona:${aux}`)}
            return retornarExito(res,"Dni de la Persona modificado con exito");
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