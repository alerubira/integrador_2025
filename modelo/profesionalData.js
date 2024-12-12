import { consulta1 } from "./conexxionBD";
let query;
class ProfesionalData {
    static async altaProfesional(prof) {//hacer las consultas y modificar los nombres
        const query = 'INSERT INTO `persona` (`dni_persona``nombre_persona`,`apellido_persona`,`activo_persona`) VALUES (?,?,?,?)';
        return await consulta1(query,per.dniPersona,per.nombrePersona,per.apellidoPersona, true);
    }

    static async consultaProfesional() {
        const query = '';//hacer selc con join
        return await consulta1(query);
    }

    static async modificarActivoProfesional(prof) {//terminado
        const query = 'UPDATE `profesional` SET `activo_profesional` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.activoProfesional, prof.idProfesional);
    }

    static async modificarProfesionProfesional(prof) {//terminado
        const query = 'UPDATE `profesional` SET `id_profesion` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.idProfesion, prof.idProfesional);
    }
    
}

export{ProfesionalData}