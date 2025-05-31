import { Perfil } from "../modelo/clasePerfil.js";
import { retornarError, retornarExito } from "./funsionesControlador.js";
import{parametros} from "../parametros.js";
import{Tags}from "../modelo/claseTags.js";
import { verificarYup } from "./verificaryup.js";
import { existeBd } from "../modelo/conexxionBD.js";
import { AlbumPersonal } from "../modelo/claseAlbumPersonal.js";
import { Imagen } from "../modelo/claseImagen.js";
let aux;
export async function subirImagen(req, res) {
    try {
        const urlImagen = '/imagenesAlbum/' + req.file.filename;
        aux=await existeBd('album_personal','id_album_personal', req.body.idAlbumSeleccionado);
        if (aux instanceof Error) {
            return retornarError(res, `Error al verificar el album: ${aux}`);
        }
        if (!aux) {
            return retornarError(res, "El album no existe");
        }
        aux=await existeBd('album_personal','id_perfil_personal', req.body.idPerfil);
        if (aux instanceof Error) {
            return retornarError(res, `Error al verificar el perfil: ${aux}`);
        }
        if (!aux) {
            return retornarError(res, "El perfil no existe");
        }
        //hacer metodos clase entidad y data con transaccion y cargar la imagen en la carpeta
       // const aux = await Perfil.modificarImagenPorIdPerfil(req.body.idPerfil, urlImagen);
       // if (aux instanceof Error) return retornarError(res, `Error al modificar la imagen del perfil:${aux}`);
        //if (aux === 0) return retornarError(res, `No se encontro el perfil con id ${req.body.idPerfilSeleccionado}`);
        return retornarExito(res, `La imagen del perfil fue modificada con exito`, urlImagen);
    } catch (error) {
        console.error("Error al subir la imagen", error);
        return retornarError(res, `Error al subir la imagen: ${error}`);
    }
}
export default {
    subirImagen
}