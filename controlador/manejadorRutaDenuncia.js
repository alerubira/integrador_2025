import { retornarError ,retornarExito,retornarError400} from "./funsionesControlador.js";
import {Perfil} from "../modelo/clasePerfil.js";
import{MotivoDenuncia} from "../modelo/claseMotivoDenuncia.js";
import{Denuncia}from "../modelo/claseDenuncia.js";
import path from 'path';
import { existeBd } from "../modelo/conexxionBD.js";
export async function traerMotivosDenuncia(req,res){
    try {
        let aux;
        if(req.body.idPerfil){
            aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
        if(aux instanceof  Error){
            console.log(`Error al traer loa motivos de denuncia: ${aux.message}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res);
        }
        }else if(req.body.idProfesional){
                aux=await existeBd(req.body.idProfesional,'profesional','id_profesional');
        if(aux instanceof  Error){
            console.log(`Error al traer loa motivos de denuncia: ${aux.message}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res);
        }
        }else{
            return retornarError400(res);
        }
       
        aux=await MotivoDenuncia.consulta();
        if(aux instanceof Error){
            console.log(`Error al traer loa motivos de denuncia: ${aux.message}`);
            return retornarError(res)
        }
         let motivos = aux.map(motivo => new MotivoDenuncia(
                    motivo.id_motivo_denuncia, motivo.nombre_motivo_denuncia,
                ));
          
        retornarExito(res,"",motivos)
        
    } catch (error) {
        console.log(`Error al traer loa motivos de denuncia:${error}`)
        return retornarError(res)
    }
}
export async function enviarDenuncia(req,res){
try {
    let aux;
    aux=await existeBd(req.body.idPerfilDenunciante,'perfil','id_perfil');
    if(aux instanceof  Error){
        console.log(`Error verificar si existe el perfil: ${aux.message}`);
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res);
    }
    aux=await existeBd(req.body.idPerfilDenunciado,'perfil','id_perfil');
    if(aux instanceof  Error){
        console.log(`Error verificar si existe el perfil: ${aux.message}`);
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res);
    }
    aux=await existeBd(req.body.idImagenDenunciada,'imagen','id_imagen');
    if(aux instanceof  Error){  
        console.log(`Error verificar si existe la imagen: ${aux.message}`);
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res);
    }
    aux=await existeBd(req.body.idMotivoDenuncia,'motivo_denuncia','id_motivo_denuncia');
    if(aux instanceof  Error){
        console.log(`Error verificar si existe el motivo de denuncia: ${aux.message}`);
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res);
    }
    aux= await Denuncia.alta(req.body);
    if(aux instanceof Error){
        console.log(`Error al generar la denuncia: ${aux.message}`);
        return retornarError(res);
    }
    return retornarExito(res,"Denuncia generada correctamente",aux);
    
} catch (error) {
    console.log(`Erro al generar la denuncia:${error}`)
    return retornarError(res);
} 
}
export async function buscarDenuncias(req,res){
    try {
        let aux;
        aux=await existeBd(req.body.idProfesional,'profesional','id_profesional');
        if(aux instanceof  Error){
            console.log(`Error al buscar denuncias: ${aux.message}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res);
        }
        aux=await Denuncia.consulta();
        if(aux instanceof Error){
            console.log(`Error al buscar denuncias: ${aux.message}`);
            return retornarError(res)
        }
        let denuncias = aux.map(denuncia => new Denuncia(
                    denuncia.id_denuncia, denuncia.id_motivo_denuncia,
                    denuncia.id_imagen_denunciada,
                     denuncia.id_perfil_denunciante,
                    denuncia.id_perfil_denunciado, 
                    denuncia.activo_denuncia,
                    denuncia.fecha_denuncia
                ));
        
        retornarExito(res,"",denuncias);
        
    } catch (error) {
        console.log(`Error al buscar denuncias:${error}`);
        return retornarError(res);
    }
}
export async function modificarActivoDenuncia(req,res){
    try {
        let aux;
        aux=await existeBd(req.body.idDenuncia,'denuncia','id_denuncia');
        if(aux instanceof  Error){
            console.log(`Error verificar si existe la denuncia: ${aux.message}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res);
        }
        aux=await Denuncia.modificarActivo(req.body);
        if(aux instanceof Error){
            console.log(`Error al modificar el estado de la denuncia: ${aux.message}`);
            return retornarError(res);
        }
        retornarExito(res,"Estado de la denuncia modificado correctamente",aux);
    } catch (error) {
        console.log(`Error al modificar el estado de la denuncia:${error}`);
        return retornarError(res);
    }
}
export default{
    traerMotivosDenuncia,
    enviarDenuncia,
    buscarDenuncias,
    modificarActivoDenuncia
}
