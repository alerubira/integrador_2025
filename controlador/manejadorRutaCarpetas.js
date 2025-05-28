import { Perfil } from "../modelo/clasePerfil.js";
import { retornarError, retornarExito } from "./funsionesControlador.js";
import{parametros} from "../parametros.js";
import{Tags}from "../modelo/claseTags.js";
export async function accederCarpetas(req, res) {
    try {
        const datosEncoded = req.query.datos;
        const datosDecoded = decodeURIComponent(datosEncoded);
        const toke = JSON.parse(datosDecoded);
        if (!toke) return retornarError(res, "Datos de acceso Invalido");
        if (toke.tipoAutorizacion !== 5) return retornarError(res, "El Usuario no tiene el nivel de Autorizacion");
        let encabezado = "Albumes";
        let p1 = await Perfil.consultaPorId(toke.idSolicitante);
        if (p1 instanceof Error) return retornarError(res, `Error al buscar el Perfil:${p1}`);
        let p = p1[0];
        if (p.activo_perfil !== 1 || p.activo_persona !== 1) return retornarError(res, "El Perfil Esta dado de baja");
        let perfil = new Perfil(
            p.id_perfil, p.id_persona, p.intereses_perfil, p.antecedentes_perfil,
            p.e_mail_perfil, p.img_perfil, p.activo_perfil, p.nombre_perfil,
            p.dni_persona, p.nombre_persona, p.apellido_persona, p.activo_persona
        );
        if (perfil instanceof Error) return retornarError(res, `Error al crear el objeto perfil:${perfil}`);
        if (!perfil.imgPerfil) perfil.imgPerfil = "imagenesPerfil/fotoPerfil.svg";
        let tags = await Tags.consulta();
        if (tags instanceof Error) return retornarError(res, `Error al consultar los Tags: ${tags}`);

        return res.render('vistaCarpetas', { encabezado, parametros, perfil ,tags});
       
    } catch (error) {
        console.error("Error al acceder a Carpetas", error);
        return retornarError(res, `Error al acceder a Carpetas: ${error}`);
    }
}
export async function crearCarpeta(req, res) {
    try {
       let album=req.body;
       console.log(album);
       return retornarExito(res, "Album Creado Exitosamente");       
    } catch (error) {
        console.error("Error al crear el album", error);
        return retornarError(res, `Error al crear el album: ${error}`);
    }
}
export default {
    accederCarpetas,
    crearCarpeta
};
