import { retornarError ,retornarExito,retornarError400} from "./funsionesControlador.js";
import {Perfil} from "../modelo/clasePerfil.js";
import{MotivoDenuncia} from "../modelo/claseMotivoDenuncia.js";
import path from 'path';
import { existeBd } from "../modelo/conexxionBD.js";
export async function traerMotivosDenuncia(req,res){
    try {
        let aux;
        aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
        if(aux instanceof  Error){
            console.log(`Error al traer loa motivos de denuncia: ${aux.message}`);
            return retornarError(res)
        }
        if(!aux){
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
export default{
    traerMotivosDenuncia
}