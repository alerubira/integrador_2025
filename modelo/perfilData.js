import { consulta1,existeBd,pool } from "./conexxionBD.js";
import { PersonaData } from "./personaData.js";
import {Login} from "./claseLogin.js";
let query;
class PerfilData extends PersonaData {
    static async altaPerfil(perf,login) {
       
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
            let p=await existeBd(perf.dniPersona,'persona','dni_persona');
            let id_persona;
            if(p){
                let resultado=await  this.buscarIdPorDni(perf.dniPersona,connection);
                if(!resultado.error){
                    id_persona=resultado[0].id_persona;
                }
            }else{
                let per={dniPersona:perf.dniPersona,nombrePersona:perf.nombrePersona,apellidoPersona:perf.apellidoPersona,activoPersona:true};
                const personaResult = await  this.altaPersona(per,connection)
                   
                id_persona = await personaResult.insertId;
                 
            }
            
            const [perfilResult] = await connection.execute(
                 'INSERT INTO `perfil`(`id_persona`, `intereses_perfil`, `antecedentes_perfil`, `activo_perfil`, `e_mail_perfil`,`img_perfil`,`nombre_perfil`) VALUES (?,?,?,?,?,?,?)',
                [id_persona, null,null, false,perf.eMailPerfil,null,perf.nombrePerfil]
            );
    
            const id_perfil = perfilResult.insertId;
           // let log=new Login(0,null,id_perfil,login.usuario,login.clave,5,1,false,null);
            
           //hacer el alta del login con el id_perfil
             // Hashea la clave antes de guardar
           const claveHasheada = await Login.crearHash(login.clave);
           console.log({
  id_profesional: null,
  id_perfil,
  usuario: login.usuario,
  clave: claveHasheada,
  tipo_autorizacion: 5,
  instancia_login: 1,
  activo_login: true,
  clave_login_provisoria: null
});
           const [loginResult] = await connection.execute(
                    'INSERT INTO `login`(`id_profesional`,`id_perfil`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia_login`, `activo_login`, `clave_login_provisoria`) VALUES (?,?,?,?,?,?,?,?)',
                    [
                        null, // id_profesional
                        id_perfil,
                        login.usuario,
                        claveHasheada,
                        5,
                        1,
                        true,
                        null // clave_login_provisoria
                    ]
                    );
            
            await connection.commit();
            return { success: true };
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error en la transacción:', error);
            if(error.code === 'ER_DUP_ENTRY'){
                throw new Error ('error:El usuario ya existe');
            }
            throw new Error(`Error en la Transaccion:${error}`);
        } finally {
            if (connection) {
                connection.release(); // Devolvemos la conexión al pool
            }
        }
    }
    static async buscarPerfilPorApellido(frac){
        query='CALL buscar_perfil_por_apellido(?);'
      // query=' SELECT perfil.id_perfil, perfil.nombre_perfil,perfil.img_perfil,perfil.intereses_perfil,perfil.antecedentes_perfil,persona.nombre_persona,persona.apellido_persona FROM perfil JOIN persona ON persona.id_persona = perfil.id_persona WHERE persona.apellido_persona LIKE ?;'
        return await consulta1(query,frac)
    }
    static async buscarPerfilSegidoresrPorApellido(frac,idPerf){
        query='CALL buscar_perfiles_seguidores_por_apellido(?,?)'
        return await consulta1(query,frac,idPerf)
    }
     static async consultaPerfilPorId(id){
        const query='SELECT * FROM perfil JOIN persona ON perfil.id_persona=persona.id_persona WHERE id_perfil=?;'; 
        return await consulta1(query, id);
    }

   
    static async modificarActivoPerfil(perf) {
        const query = 'UPDATE `perfil` SET `activo_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query, perf.activoPerfil, perf.idPerfil);
    }
    static async modificarActivoPorId(id) {
        const query = 'UPDATE `perfil` SET `activo_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query,true, id);
    }
    static async modificarImagenPorIdPerfil(id,img) {
        const query = 'UPDATE `perfil` SET `img_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query, img, id);
    }
    static async modificarEMailPorIdPerfil(id,email) {
        const query = 'UPDATE `perfil` SET `e_mail_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query, email, id);
    }
    static async modificarInteresesPorIdPerfil(id,intereses) {
        const query = 'UPDATE `perfil` SET `intereses_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query, intereses, id);
    }
    static async modificarAntecedentesPorIdPerfil(id,antecedentes) {
        const query = 'UPDATE `perfil` SET `antecedentes_perfil` = ? WHERE `id_perfil` = ?';
        return await consulta1(query, antecedentes, id);
    }

   /* static async modificarProfesionProfesional(prof) {//terminado
        const query = 'UPDATE `profesional` SET `id_profesion` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.idProfesion, prof.idProfesional);
    }
    static async modificarEMailProfesional(prof) {
        const query = 'UPDATE `profesional` SET `e_mail` = ? WHERE `id_profesional` = ?';
        return await consulta1(query, prof.eMail, prof.idProfesional);
    }*/
    
}

export{PerfilData}