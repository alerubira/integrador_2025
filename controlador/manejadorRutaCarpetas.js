import { Perfil } from "../modelo/clasePerfil.js";
import { retornarError,retornarError400, retornarExito } from "./funsionesControlador.js";
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
        if (p1 instanceof Error){
            console.log( `Error al buscar el Perfil:${p1}`)
               return retornarError(res);
        } 
        let p = p1[0];
        if (p.activo_perfil !== 1 || p.activo_persona !== 1){
            return retornarError400(res);
        } 
        let perfil = new Perfil(
            p.id_perfil, p.id_persona, p.intereses_perfil, p.antecedentes_perfil,
            p.e_mail_perfil, p.img_perfil, p.activo_perfil, p.nombre_perfil,
            p.dni_persona, p.nombre_persona, p.apellido_persona, p.activo_persona
        );
        if (perfil instanceof Error){
            console.log( `Error al crear el objeto perfil:${perfil}`)
             return retornarError(res);
        }
        if (!perfil.imgPerfil) perfil.imgPerfil = "imagenesPerfil/fotoPerfil.svg";
        let tags = await Tags.consulta();
        if (tags instanceof Error){
            console.log(`Error al consultar los Tags: ${tags}`)
            return retornarError(res);
        } 

        return res.render('vistaCarpetas', { encabezado, parametros, perfil ,tags});
       
    } catch (error) {
        console.error( `Error al acceder a Carpetas: ${error}`);
        return retornarError(res);
    }
}
export async function crearAlbum(req, res) {
    try {
       let album=req.body;
       console.log(album);
    aux=await verificarYup(album,'albumPersonal');
        aux=await existeBd(album.idTags,'tags','id_tags');  
            if(aux instanceof Error){
                console.log(`Error al verificar si el tags :${aux}`)
                return retornarError(res)
            }
            if(!aux){
                return retornarError400(res)
            }
        aux=await existeBd(album.idPerfilPersonal,'perfil','id_perfil');
            if(aux instanceof Error){
                console.log(`Error al verificar si el perfil :${aux}`)
                return retornarError(res)
            }   
            if(!aux){
                return retornarError400(res)
            }
        aux=await AlbumPersonal.alta(album);
        if (aux instanceof Error) {
            console.log( `Error al crear el album: ${aux}`)
            return retornarError(res);   
        }       
            return retornarExito(res, "Album Creado Exitosamente");       
    } catch (error) {
        console.log(`Error al crear el album: ${error}`);
        return retornarError(res);
    }
}
export async function buscarAlbumesPersonalesPorId(req, res) {
    try {
        const { idPerfilPersonal } = req.body;
        aux=await existeBd('id_perfil','perfil',idPerfilPersonal);
        if (aux instanceof Error){
            console.log( `Error al verificar el perfil: ${aux}`)
            return retornarError(res);
        } 
        aux=await AlbumPersonal.consultaPorIdPerfilPersonal(idPerfilPersonal);
        if (aux instanceof Error){
            console.log(`Error al buscar el album personal: ${aux}`)
            return retornarError(res);
        } 
        if (!aux) {
            return retornarError400(res)
        } 

        //recorrer el arreglo y hacer los ojetos
        let albumes = aux[0].map(alb => new AlbumPersonal(
            alb.id_album_personal, alb.titulo_album_personal, alb.cantidad_imagenes,
            alb.id_perfil_personal, alb.id_tags, alb.activo_album_personal,alb.nombre_tags
        ));
         aux= await Tags.consulta();
        if (aux instanceof Error){
            console.log( `Error al consultar los Tags: ${aux}`)
             return retornarError(res);
        }
        let tags = aux.map(tag => new Tags(
            tag.id_tags, tag.nombre_tags,
        ));

        if (albumes.length === 0) {
            return retornarExito(res, "No se encontraron albumes personales para el perfil especificado");
        }
        //retornar los albumes y tags
       return res.json({success:true, albumes:albumes,tags:tags});
        
    } catch (error) {
        console.log( `Error al buscar los albumes personales: ${error}`);
        return retornarError(res);
    }
}
export async function modificarTituloAlbum(req, res) {
    try {
        const album=req.body;
        aux=await existeBd(album.idAlbumPersonal,'album_personal','id_album_personal');
        if (aux instanceof Error){
            console.log( `Error al verificar el album: ${aux}`);
            return retornarError(res);    
        } 
        if (!aux){
             return retornarError400(res);
        } 
        aux= await verificarYup(album,'albumPersonal');
        if(aux instanceof Error){
            console.log(`Error al vrificr la tipologia del album:${aux}`);
            return retornarError(res);
        }
        aux=await AlbumPersonal.modificarTitulo(album);
        if (aux instanceof Error){
            console.log(`Error al modificar el título del album: ${aux}`);
            return retornarError(res);
        } 
        return retornarExito(res, "Título del album modificado exitosamente");
    } catch (error) {
        console.log( `Error al modificar el título del album: ${error}`);
        return retornarError(res);
    }
}
export async function modificarTagsAlbum(req, res) {
    try {
        const album=req.body;
        aux=await existeBd(album.idAlbumPersonal,'album_personal','id_album_personal');
        if (aux instanceof Error){
            console.log( `Error al verificar el album: ${aux}`);
            return retornarError(res);
        } 
        if (!aux) {
           return retornarError400(res);
        } 
        aux= await verificarYup(album,'albumPersonal');
        if(aux instanceof Error){
            console.log(`Error al verificar la tipologia del album:${aux}`);
            return retornarError(res);
        }
        aux=await existeBd(album.idTags,'tags','id_tags');
        if (aux instanceof Error){
            console.log(`Error al verificar el tags: ${aux}`);
            return retornarError(res);
        } 
        if (!aux) {
            return retornarError400(res)
        } 
        aux=await AlbumPersonal.modificarTags(album);
        if (aux instanceof Error){
            console.log(`Error al modificar los tags del album: ${aux}`);
            return retornarError(res);
        } 
        
        return retornarExito(res, "Tags del album modificados exitosamente");
    } catch (error) {
        console.log( `Error al modificar los tags del album: ${error}`);
        return retornarError(res);
    }
}
export async function modificarActivoAlbumPersonal(req, res) {
    try {
        const album = req.body;
        aux = await existeBd(album.idAlbumPersonal, 'album_personal', 'id_album_personal');
        if (aux instanceof Error){
            console.log( `Error al verificar el album: ${aux}`);
            return retornarError(res);
        } 
        if (!aux){
              return retornarError400(res);
        } 
        aux = await verificarYup(album, 'albumPersonal');
        if (aux instanceof Error){
            console.log( `Error al verificar el album: ${aux}`);
             return retornarError(res);
        }
        aux = await AlbumPersonal.modificarActivoAlbumPersonal(album);
        if (aux instanceof Error){
            console.log(`Error al modificar el estado del album: ${aux}`);
             return retornarError(res);
        } 
        return retornarExito(res, "Estado del album modificado exitosamente");
    } catch (error) {
        console.log( `Error al modificar el estado del album: ${error}`);
        return retornarError(res);
    }
}
export async function agregarImgAlbumSeguidor(req,res){
try {
    let aux,imgComp
    imgComp=req.body;
    aux=await existeBd(imgComp.idPerfilSeguido,'perfil','id_perfil')
    if(aux instanceof Error){
        console.log(`Error al buscar el perfil seguido:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await existeBd(imgComp.idPerfilSeguidor,'perfil','id_perfil')
    if(aux instanceof Error){
        console.log(`Error al buscar el perfil seguidor:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await existeBd(imgComp.IdImgSeleccionada,'imagen','id_imagen')
    if(aux instanceof Error){
        console.log(`Error al buscar la imagen seleccionada:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await existeBd(imgComp.idAlbumSegidor,'album_seguidor','id_album_seguidor')
    if(aux instanceof Error){
        console.log(`Error al buscar el album seguidor:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await AlbumImagen.buscarPorIds(imgComp.idAlbumSegidor,imgComp.IdImgSeleccionada);
    if(aux instanceof Error){
        console.log(`Error al buscar Album seguidor por ids:${aux}`);
        return retornarError(res);
    }
    if(aux.length>0){
        return retornarError400(res,'Esta imagen ya fue compartida con el mismo Perfil Seguidor')
    }
    aux=await AlbumImagen.alta(imgComp);
    if(aux instanceof Error){
        console.log(`Error al insertar la imagen compartida:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,"La imagen se compartio con exito")

    
} catch (error) {
    console.log(`error al agregar la imagen a album seguidor:${error}`)
    return retornarError(res)
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
