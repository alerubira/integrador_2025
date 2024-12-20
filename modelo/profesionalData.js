import { consulta1,existeBd,pool } from "./conexxionBD.js";
import { PersonaData } from "./personaData.js";
let query;
class ProfesionalData extends PersonaData {
    static async altaProfesional(prof) {//hacer las consultas y modificar los nombres
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            let p=await existeBd(prof.dniPersona,'persona','dni_persona');
            let id_persona;
            if(p){
                let resultado=await  this.buscarIdPorDni(prof.dniPersona,connection);
                if(!resultado.error){
                    id_persona=resultado[0].id_persona;
                }
            }else{
                let per={dniPersona:prof.dniPersona,nombrePersona:prof.nombrePersona,apellidoPersona:prof.apellidoPersona,activoPersona:true};
                const personaResult = await  this.altaPersona(per,connection)
                   
                id_persona = await personaResult.insertId;
                 
            }
            
            const [profecionalResult] = await connection.execute(
                'INSERT INTO `profesional`(`id_persona`, `id_profesion`, `activo_profesional`) VALUES (?,?,?)',
                [id_persona, prof.idProfesionProfesional, true]
            );
    
            const id_medico = profecionalResult.insertId;
            
           
            await connection.commit();
            return { success: true };
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error en la transacción:', error);
            throw new Error(`Error en la Transaccion:${error}`);
        } finally {
            if (connection) {
                connection.release(); // Devolvemos la conexión al pool
            }
        }
    }

    static async consultaProfesional() {
        const query = 'CALL obtenerProfesionales()';
        return await consulta1(query);
    }
    static async consultaProfesionalPorId(id){
        const query='CALL ObtenerProfesionalPorID(?)'; 
        return await consulta1(query, id);
    }
    static async modificarActivoProfesional(prof) {
        const query = 'UPDATE `profesional` SET `activo_profesional` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.activoProfesional, prof.idProfesional);
    }

    static async modificarProfesionProfesional(prof) {//terminado
        const query = 'UPDATE `profesional` SET `id_profesion` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.idProfesion, prof.idProfesional);
    }
    
}

export{ProfesionalData}