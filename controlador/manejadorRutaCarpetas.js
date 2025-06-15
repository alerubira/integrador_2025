import { Perfil } from "../modelo/clasePerfil.js";
import { retornarError, retornarExito } from "./funsionesControlador.js";
import{parametros} from "../parametros.js";
import{Tags}from "../modelo/claseTags.js";
import { verificarYup } from "./verificaryup.js";
import { existeBd } from "../modelo/conexxionBD.js";
import { AlbumPersonal } from "../modelo/claseAlbumPersonal.js";
import{AlbumImagen}from"../modelo/claseAlbumImagen.js";

let aux;
export async function accederAlbumes(req, res) {
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
export async function crearAlbum(req, res) {
    try {
       let album=req.body;
       console.log(album);
    aux=await verificarYup(album,'albumPersonal');
        aux=await existeBd(album.idTags,'tags','id_tags');  
            if(aux instanceof Error){return retornarError(res,`Error al verificar si el tags :${aux}`)}
            if(!aux){return retornarError(res,'El tags no existe')}
        aux=await existeBd(album.idPerfilPersonal,'perfil','id_perfil');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si el perfil :${aux}`)}   
            if(!aux){return retornarError(res,'El perfil no existe')}
        aux=await AlbumPersonal.alta(album);
        if (aux instanceof Error) {
            return retornarError(res, `Error al crear el album: ${aux}`);   
        }       
            return retornarExito(res, "Album Creado Exitosamente");       
    } catch (error) {
        console.error("Error al crear el album", error);
        return retornarError(res, `Error al crear el album: ${error}`);
    }
}
export async function buscarAlbumesPersonalesPorId(req, res) {
    try {
        const { idPerfilPersonal } = req.body;
        aux=await existeBd('id_perfil','perfil',idPerfilPersonal);
        if (aux instanceof Error) return retornarError(res, `Error al verificar el perfil: ${aux}`);
        aux=await AlbumPersonal.consultaPorIdPerfilPersonal(idPerfilPersonal);
        if (aux instanceof Error) return retornarError(res, `Error al buscar el album personal: ${aux}`);
        if (!aux) return retornarExito(res, "No se encontraron albumes personales para el perfil especificado");

        //recorrer el arreglo y hacer los ojetos
        let albumes = aux[0].map(alb => new AlbumPersonal(
            alb.id_album_personal, alb.titulo_album_personal, alb.cantidad_imagenes,
            alb.id_perfil_personal, alb.id_tags, alb.activo_album_personal,alb.nombre_tags
        ));
         aux= await Tags.consulta();
        if (aux instanceof Error) return retornarError(res, `Error al consultar los Tags: ${aux}`);
        let tags = aux.map(tag => new Tags(
            tag.id_tags, tag.nombre_tags,
        ));

        if (albumes.length === 0) {
            return retornarExito(res, "No se encontraron albumes personales para el perfil especificado");
        }
        //retornar los albumes y tags
       return res.json({success:true, albumes:albumes,tags:tags});
        
    } catch (error) {
        console.error("Error al buscar los albumes personales", error);
        return retornarError(res, `Error al buscar los albumes personales: ${error}`);
    }
}
export async function modificarTituloAlbum(req, res) {
    try {
        const album=req.body;
        aux=await existeBd(album.idAlbumPersonal,'album_personal','id_album_personal');
        if (aux instanceof Error) return retornarError(res, `Error al verificar el album: ${aux}`);
        if (!aux) return retornarError(res, "El album no existe");
        aux= await verificarYup(album,'albumPersonal');
        aux=await AlbumPersonal.modificarTitulo(album);
        if (aux instanceof Error) return retornarError(res, `Error al modificar el título del album: ${aux}`);
//hacer metodo clase y data
        return retornarExito(res, "Título del album modificado exitosamente");
    } catch (error) {
        console.error("Error al modificar el título del album", error);
        return retornarError(res, `Error al modificar el título del album: ${error}`);
    }
}
export async function modificarTagsAlbum(req, res) {
    try {
        const album=req.body;
        aux=await existeBd(album.idAlbumPersonal,'album_personal','id_album_personal');
        if (aux instanceof Error) return retornarError(res, `Error al verificar el album: ${aux}`);
        if (!aux) return retornarError(res, "El album no existe");
        aux= await verificarYup(album,'albumPersonal');
        aux=await existeBd(album.idTags,'tags','id_tags');
        if (aux instanceof Error) return retornarError(res, `Error al verificar el tags: ${aux}`);
        if (!aux) return retornarError(res, "El tags no existe");
        aux=await AlbumPersonal.modificarTags(album);
        if (aux instanceof Error) return retornarError(res, `Error al modificar los tags del album: ${aux}`);
        //hacer metodo clase y data
        return retornarExito(res, "Tags del album modificados exitosamente");
    } catch (error) {
        console.error("Error al modificar los tags del album", error);
        return retornarError(res, `Error al modificar los tags del album: ${error}`);
    }
}
export async function modificarActivoAlbumPersonal(req, res) {
    try {
        const album = req.body;
        aux = await existeBd(album.idAlbumPersonal, 'album_personal', 'id_album_personal');
        if (aux instanceof Error) return retornarError(res, `Error al verificar el album: ${aux}`);
        if (!aux) return retornarError(res, "El album no existe");
        aux = await verificarYup(album, 'albumPersonal');
        if (aux instanceof Error) return retornarError(res, `Error al verificar el album: ${aux}`);
        aux = await AlbumPersonal.modificarActivoAlbumPersonal(album);
        if (aux instanceof Error) return retornarError(res, `Error al modificar el estado del album: ${aux}`);
        //hacer metodo clase y data
        return retornarExito(res, "Estado del album modificado exitosamente");
    } catch (error) {
        console.error("Error al modificar el estado del album", error);
        return retornarError(res, `Error al modificar el estado del album: ${error}`);
    }
}
export async function agregarImgAlbumSeguidor(req,res){
try {
    let aux,imgComp
    imgComp=req.body;
    aux=await existeBd(imgComp.idPerfilSeguido,'perfil','id_perfil')
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar el perfil seguido:${aux}`)
    }
    if(!aux){
        return retornarError(res,'el perfil seguido no existe')
    }
    aux=await existeBd(imgComp.idPerfilSeguidor,'perfil','id_perfil')
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar el perfil seguidor:${aux}`)
    }
    if(!aux){
        return retornarError(res,'el perfil seguidor no existe')
    }
    aux=await existeBd(imgComp.IdImgSeleccionada,'imagen','id_imagen')
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar la imagen seleccionada:${aux}`)
    }
    if(!aux){
        return retornarError(res,'la imagen seleccionada no existe')
    }
    aux=await existeBd(imgComp.idAlbumSegidor,'album_seguidor','id_album_seguidor')
    if(aux instanceof Error){
        return retornarError(res,`Error al buscar el album seguidor:${aux}`)
    }
    if(!aux){
        return retornarError(res,'el album seguidor no existe')
    }
    aux=await AlbumImagen.alta(imgComp);
    if(aux instanceof Error){
        return retornarError(res,`Error al insertar la imagen compartida`)
    }
    return retornarExito(res,"La imagen se compartio con exito")

    
} catch (error) {
    console.log(`error al agregar la imagen a album seguidor:${error}`)
    return retornarError(res,`error al agregar la imagen a album seguidor:${error}`)
}
}
export default {
    accederAlbumes,
    crearAlbum,
    buscarAlbumesPersonalesPorId,
    modificarTituloAlbum,
    modificarTagsAlbum,
    modificarActivoAlbumPersonal,
    agregarImgAlbumSeguidor
};
