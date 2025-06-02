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
        let cantidad=await AlbumPersonal.consultaCantidaImagenesPorId(req.body.idAlbumSeleccionado);
        if(cantidad instanceof Error){
            return retornarError(res,`Error al buscar la cantidad de imagenes en la carpeta ${cantidad}`)
        }
        if(cantidad>parametros.tamaño5){
            return retornarError(res,`El Album esta completo ${parametros.cartelTamaño5}`)
        }
        const urlImagen = '/imagenesAlbum/' + req.file.filename;
        aux=await existeBd(req.body.idAlbumSeleccionado,'album_personal','id_album_personal');
        if (aux instanceof Error) {
            return retornarError(res, `Error al verificar el album: ${aux}`);
        }
        if (!aux) {
            return retornarError(res, "El album no existe");
        }
        aux=await existeBd(req.body.idPerfil,'album_personal','id_perfil_personal');
        if (aux instanceof Error) {
            return retornarError(res, `Error al verificar el perfil: ${aux}`);
        }
        if (!aux) {
            return retornarError(res, "El perfil no existe");
        }
        let imagen = {
            urlImagen: urlImagen,
            fechaCreacion: new Date(),
            tituloImagen: null,
            captionImagen: null,
            idVisivilidad: 4,
            activoImagen: false
        }
        aux=await Imagen.alta(imagen, req.body.idAlbumSeleccionado,cantidad);
        if(aux instanceof Error) {
            return retornarError(res, `Error al guardar la imagen: ${aux}`);
        }   
       
        return retornarExito(res, `La imagen del perfil fue modificada con exito`, urlImagen);
    } catch (error) {
        console.error("Error al subir la imagen", error);
        return retornarError(res, `Error al subir la imagen: ${error}`);
    }
}
export async function buscarImagenesPorIdAlbumPersonal(req, res) {
    aux = await existeBd(req.body.idAlbum, 'album_personal', 'id_album_personal');
    if (aux instanceof Error) {
        return retornarError(res, `Error al verificar el album: ${aux}`);
    }
    if (!aux) {
        return retornarError(res, "El album no existe");
    }
    aux = await Imagen.buscarImagenesPorIdAlbumPersonal(req.body.idAlbum);
    if (aux instanceof Error) {
        return retornarError(res, `Error al buscar las imagenes: ${aux}`);
    }
    if (aux.length === 0) {
        return retornarExito(res, "No se encontraron imagenes para el album seleccionado", []);
    }
    //hacer un arreglo de objetos imagen con las propiedades que se necesitan
    aux = aux.map(imagen => {
        return {
            idImagen: imagen.id_imagen,
            urlImagen: imagen.url_imagen,
            fechaCreacion: imagen.fecha_creacion_imagen,
            tituloImagen: imagen.titulo_imagen,
            captionImagen: imagen.caption_imagen,
            idVisivilidad: imagen.id_visibilidad,
            activoImagen: imagen.activo_imagen
        };
    });
    return retornarExito(res, "Imagenes encontradas", aux);
}
export default {
    subirImagen,
    buscarImagenesPorIdAlbumPersonal
}