import { consulta1,existeBd,pool } from "./conexxionBD.js";
import { PersonaData } from "./personaData.js";
import{LoginUsuario} from "./claseLoginUsuario.js";
let query;
class PerfilData extends PersonaData {
    static async altaPerfil(perf) {//hacer las consultas y modificar los nombres
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            let p=await existeBd(perf.dniPersona,'persona','dni_persona');
            let id_persona;
            if(p){
                let resultado=await  this.buscarIdPorDni(prof.dniPersona,connection);
                if(!resultado.error){
                    id_persona=resultado[0].id_persona;
                }
            }else{
                let per={dniPersona:perf.dniPersona,nombrePersona:perf.nombrePersona,apellidoPersona:perf.apellidoPersona,activoPersona:true};
                const personaResult = await  this.altaPersona(per,connection)
                   
                id_persona = await personaResult.insertId;
                 
            }
            
            const [perfilResult] = await connection.execute(
                'INSERT INTO `perfil`(`id_persona`, `intereses`, `antecedentes`,`activo_perfil`,`e_mail_perfil`) VALUES (?,?,?,?,?)',
                [id_persona, perf.intereses,perf.antecedentes, true,perf.eMailPerfil]
            );
    
            const id_perfil = perfilResult.insertId;
            
           //hacer el alta del login con el id_perfil
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
//revisar para abajo
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
    static async modificarEMailProfesional(prof) {
        const query = 'UPDATE `profesional` SET `e_mail` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.eMail, prof.idProfesional);
    }
    
}

export{PerfilData}