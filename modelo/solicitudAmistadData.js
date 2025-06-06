import{ consulta1 } from './conexxionBD.js';
let query;
class SolocitudAmistadData{
static async altaSolicitud(sol){
    query='INSERT INTO `solicitud_amistad` (`id_perfil_solicitante`,`id_perfi_solicitado`,`silicitud_aceptada`) VALUES (?,?,?)'
    return await consulta1(query,sol.idPerfilSolicitante ,sol.idPerfilSolicitado,false);
}
}
export{SolocitudAmistadData}