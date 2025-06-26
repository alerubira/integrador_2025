import{consulta1}from './conexxionBD.js';
let query;
class DenunciaData{
static async alta(denuncia){
    query='INSERT INTO `denuncia`( `id_motivo_denuncia`, `id_imagen_denunciada`, `id_perfil_denunciante`, `id_perfil_denunciado`, `activo_denuncia`, `fecha_denuncia`) VALUES (?,?,?,?,?,NOW())'
    return await consulta1(query,denuncia.idMotivoDenuncia,denuncia.idImagenDenunciada,denuncia.idPerfilDenunciante,denuncia.idPerfilDenunciado,1,)
}
static async consulta(){
    query='SELECT * FROM `denuncia` WHERE 1  ORDER BY fecha_denuncia DESC;';
    return await consulta1(query);
}
static async modificarActivo(denuncia){
    query='UPDATE `denuncia` SET `activo_denuncia`=? WHERE id_denuncia=?';
    return await consulta1(query,denuncia.activoDenuncia,denuncia.idDenuncia);
}

}
export{DenunciaData}