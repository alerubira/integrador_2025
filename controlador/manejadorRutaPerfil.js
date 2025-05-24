import { retornarError ,retornarExito} from "./funsionesControlador.js";
import {Perfil} from "../modelo/clasePerfil.js";
import { verificarYup } from "../controlador/verificaryup.js";
import { parametros } from "../parametros.js";
let object;
let object2;
let aux;
let perfil;
async function manejadorRutaPerfil(req,res,objeto){
try{
     switch(objeto){

        case 'registrarPerfil':
                object= req.body.perf;
                object2= req.body.login;
                aux=await verificarYup(object,'perfil');
                 if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await verificarYup(object2,'login');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await Perfil.alta(object,object2);
                if(aux instanceof Error){return retornarError(res,`Error al crear el perfil:${aux}`)}
                return retornarExito(res,`El perfil fue creado con exito,ahora puede ingresar`);
        case 'paginaPersonal':    
             const datosEncoded = req.query.datos; 
            const datosDecoded = decodeURIComponent(datosEncoded);
             const toke = JSON.parse(datosDecoded);
                if(!toke){return retornarError(res,"Datos de acceso Invalido")}
            
                 if(toke.tipoAutorizacion!==5){return retornarError(res,"El Usuario no tiene el nivel de Autorizacion")}
                 if (toke.tipoAutorizacion === 5) {
                    let  encabezado = "Pagina Personal";
                    let p1=await Perfil.consultaPorId(toke.idSolicitante);
                   if(p1 instanceof Error){return retornarError(res,`Error al buscar el Perfil:${p}`)}
                   let p=p1[0];
                   console.log(p);
                   if(p.activo_perfil!==1||p.activo_persona!==1){return retornarError(res,"El Perfil Esta dado de baja")}
                   perfil=new Perfil(p.id_perfil,p.id_persona,p.intereses_perfil.p.antecedentes_perfil,p.e_mail_perfil,p.img_perfil,p.activo_perfil,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona);
                
                   res.render('vistaPersonal',{encabezado,parametros,perfil});
                 }
            default:
            return retornarError(res,`No se encontro el objeto ${objeto}`);        
     }




}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Ruta Perfil:${error}`)
}
}
export{manejadorRutaPerfil}