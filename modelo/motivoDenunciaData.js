import{consulta1}from './conexxionBD.js';
let query;
class MotivoDenuniaData{
     static async consulta(){
        query='SELECT * FROM `motivo_denuncia` WHERE 1';
        return await consulta1(query);
     }
}
export {MotivoDenuniaData}