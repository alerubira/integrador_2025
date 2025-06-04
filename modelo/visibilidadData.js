import { consulta1 } from "./conexxionBD.js";
let query;
class VisibilidadData{
    static async consulta(){
       query='SELECT * FROM `visibilidad`';
       return await consulta1(query);
    }

}
export{VisibilidadData}