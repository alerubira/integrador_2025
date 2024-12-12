import { consulta1 } from "./conexxionBD";
let query;
class PersonaData {
    static async altaPersona(per) {
        const query = 'INSERT INTO `persona` (`dni_persona``nombre_persona`,`apellido_persona`,`activo_persona`) VALUES (?,?,?,?)';
        return await consulta1(query,per.dniPersona,per.nombrePersona,per.apellidoPersona, true);
    }

    static async consultaPersona() {
        const query = 'SELECT * FROM `persona` WHERE 1';
        return await consulta1(query);
    }

    async modificarActivoPersona(per) {
        const query = 'UPDATE `persona` SET `activo_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, pro.activoPersona, pro.idPersona);
    }

    async modificarNombrePersona(per) {
        const query = 'UPDATE `persona` SET `nombre_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.nombrePersona, per.idPersona);
    }
    async modificarApellidoPersona(per) {
        const query = 'UPDATE `persona` SET `apellido_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.apellidoPersona, per.idPersona);
    }
    async modificarDniPersona(per) {
        const query = 'UPDATE `persona` SET `dni_persona` = ? WHERE `id_persona` = ?';
        return await consulta1(query, per.dniPersona, per.idPersona);
    }

}

export{PersonaData}