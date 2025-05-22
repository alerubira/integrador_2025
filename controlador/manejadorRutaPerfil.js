import { retornarError } from "./funsionesControlador.js";
import {Perfil} from "../modelos/perfil.js";
import { verificarYup } from "../modelo/yup.js";
let object;
let object2;
let aux;
async function manejadorRutaPerfil(req,res,objeto){
try{
     switch(objeto){

        case 'registrarPerfil':
                object= req.body.perf;
                object2= req.body.login;
                console.log(object);
                console.log(object2);
                aux=await verificarYup(object,'perfil');
                 if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await verificarYup(object2,'login');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                Perfil.alta(object,object2);
                return res.status(200).json({message:'Perfil Registrado'});
        default:
            return retornarError(res,`No se encontro el objeto ${objeto}`);        
     }




}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Ruta Perfil:${error}`)
}
}
export{manejadorRutaPerfil}