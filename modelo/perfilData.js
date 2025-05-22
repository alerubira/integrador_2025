import { consulta1,existeBd,pool } from "./conexxionBD.js";
import { PersonaData } from "./personaData.js";
import {Login} from "./loginData.js";
let query;
class PerfilData extends PersonaData {
    static async altaPerfil(perf,login) {//hacer las consultas y modificar los nombres
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
                 'INSERT INTO `login`(`id_profesional_perfil`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia_login`,`activo_login`) VALUES (?,?,?,?,?,?)',
                [id_persona, null,nill, true,perf.eMailPerfil]
            );
    
            const id_profesional_perfil = perfilResult.insertId;
            let log=new Login(id_profesional_perfil,login.usuario,login.clave,5,0,false,null);
           //hacer el alta del login con el id_perfil
           const [loginResult] = await connection.execute(
               Login.alta(log),
            );
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