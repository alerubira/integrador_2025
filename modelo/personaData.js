import { consulta1 } from "./conexxionBD";
let query;
async function altaPersona(per){
    
    query= 'INSERT INTO `persona`( `dni_persona`, `nombre_persona`, `apellido_persona`,`activo_persona`) VALUES (?,?,?,?)';
   return await consulta1(query,per.dniPersona,per.nombrePersona,per.apellidoPersona,true);
}
export{altaPersona}