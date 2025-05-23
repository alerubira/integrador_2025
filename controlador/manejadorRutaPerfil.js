import { retornarError ,retornarExito} from "./funsionesControlador.js";
import {Perfil} from "../modelo/clasePerfil.js";
import { verificarYup } from "../controlador/verificaryup.js";
let object;
let object2;
let aux;
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
        default:
            return retornarError(res,`No se encontro el objeto ${objeto}`);        
     }




}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Ruta Perfil:${error}`)
}
}
export{manejadorRutaPerfil}