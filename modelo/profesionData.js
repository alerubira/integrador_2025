import { consulta1 } from "./conexxionBD.js";

class ProfesionData {
    static async altaProfesion(pro) {
        const query = 'INSERT INTO `profesion` (`nombre_profesion`, `activo_profesion`) VALUES (?, ?)';
        return await consulta1(query, [pro.nombreProfesion, true]);
    }

    static async consultaProfesion() {
        const query = 'SELECT * FROM `profesion` WHERE 1';
        return await consulta1(query);
    }

    static async modificarActivoProfesion(pro) {
        const query = 'UPDATE `profesion` SET `activo_profesion` = ? WHERE `id_profesion` = ?';
        return await consulta1(query, [pro.activoProfesion, pro.idProfesion]);
    }

    static async modificarNombreProfesion(pro) {
        const query = 'UPDATE `profesion` SET `nombre_profesion` = ? WHERE `id_profesion` = ?';
        return await consulta1(query, [pro.nombreProfesion, pro.idProfesion]);
    }
}

export { ProfesionData };
