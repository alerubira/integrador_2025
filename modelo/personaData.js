import { consulta1,consulta2 } from "./conexxionBD.js";
let query;
class PersonaData {
    static async altaPersona(per,connection) {
         query = 'INSERT INTO `persona` (`dni_persona`,`nombre_persona`,`apellido_persona`,`activo_persona`) VALUES (?,?,?,?)';
        return await consulta2(query,connection,per.dniPersona,per.nombrePersona,per.apellidoPersona, true);
    }

    static async consultaPersona() {
         query = 'SELECT * FROM `persona` WHERE 1';
        return await consulta1(query);
    }

    static async modificarActivoPersona(per) {
         query = 'UPDATE `persona` SET `activo_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, pro.activoPersona, pro.idPersona);
    }

    static async modificarNombrePersona(per) {
         query = 'UPDATE `persona` SET `nombre_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.nombrePersona, per.idPersona);
    }
    static async modificarApellidoPersona(per) {
         query = 'UPDATE `persona` SET `apellido_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.apellidoPersona, per.idPersona);
    }
   static async modificarDniPersona(per) {
         query = 'UPDATE `persona` SET `dni_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.dniPersona, per.idPersona);
    }
    static async buscarIdPorDni(dni,connection){
        query='SELECT id_persona FROM `persona` WHERE dni_persona=?';
        return await consulta2(query,connection,dni);
    }

}

export{PersonaData}