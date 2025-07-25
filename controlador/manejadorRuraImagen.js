import { Perfil } from "../modelo/clasePerfil.js";
import { retornarError, retornarError400, retornarExito } from "./funsionesControlador.js";
import{parametros} from "../parametros.js";
import{Tags}from "../modelo/claseTags.js";
import { verificarYup } from "./verificaryup.js";
import { existeBd } from "../modelo/conexxionBD.js";
import { AlbumPersonal } from "../modelo/claseAlbumPersonal.js";
import { Imagen } from "../modelo/claseImagen.js";
import{Visibilidad}from"../modelo/claseVisibilidad.js";
import {Comentario}from"../modelo/claseComentario.js";
import{ComentarioContestado}from"../modelo/claseComentarioContestado.js"
import path from 'path';
import sharp from 'sharp';
let aux;
export async function subirImagen(req, res) {
    try {
        let cantidad=await AlbumPersonal.consultaCantidaImagenesPorId(req.body.idAlbumSeleccionado);
        if(cantidad instanceof Error){
            console.log(`Error al buscar la cantidad de imagenes en la carpeta ${cantidad}`)
            return retornarError(res)
        }
        if(cantidad[0].cantidad_imagenes>parametros.tamaño5){
            return retornarError400(res,`El Album esta completo ${parametros.cartelTamaño5}`)
        }
        
        aux=await existeBd(req.body.idAlbumSeleccionado,'album_personal','id_album_personal');
        if (aux instanceof Error) {
            console.log( `Error al verificar el album: ${aux}`)
            return retornarError(res);
        }
        if (!aux) {
            return retornarError400(res);
        }
        aux=await existeBd(req.body.idPerfil,'album_personal','id_perfil_personal');
        if (aux instanceof Error) {
            console.log( `Error al verificar el perfil: ${aux}`)
            return retornarError(res);
        }
        if (!aux) {
            return retornarError400(res);
        }
         const outputFilename = 'img-' + Date.now() + path.extname(req.file.originalname);
                const outputPath = path.join('estatica/imagenesAlbum', outputFilename);
        
                // Procesar el buffer recibido por Multer directamente con Sharp
                await sharp(req.file.buffer)
                    .resize(100, 100)
                    .jpeg({ quality: 70 })
                    .toFile(outputPath);
        
                // Guarda la URL de la imagen comprimida
                const urlImagen = '/imagenesAlbum/' + outputFilename;
        let imagen = {
            urlImagen: urlImagen,
            fechaCreacion: new Date(),
            tituloImagen: null,
            captionImagen: null,
            idVisivilidad: 4,
            activoImagen: false
        }
        aux=await Imagen.alta(imagen, req.body.idAlbumSeleccionado,cantidad[0].cantidad_imagenes);
        if(aux instanceof Error) {
            console.log(`Error al guardar la imagen: ${aux}`)
            return retornarError(res);
        }   
       
        return retornarExito(res, 'La imagen fue agragada con exito', urlImagen);
    } catch (error) {
        console.error("Error al subir la imagen", error);
        return retornarError(res);
    }
}
export async function buscarImagenesPorIdAlbumPersonal(req, res) {
    try {
        aux = await existeBd(req.body.idAlbum, 'album_personal', 'id_album_personal');
    if (aux instanceof Error) {
        console.log( `Error al verificar el album: ${aux}`)
        return retornarError(res);
    }
    if (!aux) {
        return retornarError400(res);
    }
    aux = await Imagen.buscarImagenesPorIdAlbumPersonal(req.body.idAlbum);
    if (aux instanceof Error) {
        console.log( `Error al buscar las imagenes: ${aux}`)
        return retornarError(res);
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
            idVisibilidad: imagen.id_visibilidad,
            tituloVisibilidad:imagen.titulo_visibilidad,
            activoImagen: imagen.activo_imagen
        };
    });
    return retornarExito(res, "Imagenes encontradas", aux);
        
    } catch (error) {
        console.log(`Error al buscar Imagen:${error}`)
        return retornarError(res)
    }
    
}
export async function modificarTituloImagenPorId(req,res){
    try {
        let img=req.body;
     aux=await existeBd(img.idImagen,'imagen','id_imagen');
     if(aux instanceof Error){
        console.log(`Error al buscar la Imagen:${aux}`)
        return retornarError(res)
     }
     if(!aux){
        return retornarError400(res)
     }
     aux =await verificarYup(img,'imagen');
     if(aux instanceof Error){
        console.log(`Error al verificar la tipologia de la Imagen:${aux}`)
        return retornarError(res)
     }
     aux= await Imagen.modificarTiTuloPorId(img);
     if(aux instanceof Error){
        console.log(`Error al modificar el titulo de la imagen:${aux}`)
        return retornarError(res)
     }
     return retornarExito(res,"El titulo en la image se modifico con exito");
    } catch (error) {
        console.log(`Error al modoificar el titulo de la imagen:${error}`)
        return retornarError(res)
    }
     

}
export async function modificarCaptionImagenPorId(req,res){
    try {
        let img=req.body;
     aux=await existeBd(img.idImagen,'imagen','id_imagen');
     if(aux instanceof Error){
        console.log(`Erroal buscar la Imagen:${aux}`)
        return retornarError(res)
     }
     if(!aux){
        return retornarError400(res)
     }
     aux =await verificarYup(img,'imagen');
     if(aux instanceof Error){
        console.log(`Error al verificar la tipologia de la Imagen:${aux}`)
        return retornarError(res)
     }
     aux= await Imagen.modificarCaptionPorId(img);
     if(aux instanceof Error){
        console.log(`Error al modificar el caption de la imagen:${aux}`)
        return retornarError(res)
     }
      return retornarExito(res,"El Caption se modofico con exito");
    } catch (error) {
       console.log(`Error al modificar el Caption:${error}`)
       return retornarError(res)
    }
    
}
export async function buscarVisibilidad(req,res){
    try {
         let idPerf=req.body;
       aux =await existeBd(idPerf.idPerfil,'perfil','id_perfil');
       if(aux instanceof Error){
        console.log(`Error al buscar visibilidades:${aux}`)
        return retornarError(res)
       }
       if(!aux){
        return retornarError400(res);
       }
       aux=await Visibilidad.consulta();
       if(aux instanceof Error){
        console.log(`Error al buscar visibilidad ${aux}`)
        return retornarError(res)
       }
       aux=aux.map(vi=>{
        return{
            idVisibilidad:vi.id_visibilidad,
            tituloVisibilidad:vi.titulo_visibilidad
        }
       });
       return retornarExito(res,"",aux)
    } catch (error) {
        console.log(`Error al buscar Visibilidad:${error}`)
        return retornarError(res)
    }
      

}
export async function modificarVisibilidadImagen(req,res){
    try {
        let img=req.body;
     aux =await existeBd(img.idImagen,'imagen','id_imagen');
       if(aux instanceof Error){
        console.log(`Error al buscar la Imagen:${aux}`)
        return retornarError(res)
       }
       if(!aux){
        return retornarError400(res);
       }
       aux=await existeBd(img.idVisibilidad,'visibilidad','id_visibilidad');
       if(aux instanceof Error){
        console.log(`Error al buscar la visivilidad ${aux}`)
        return retornarError(res)
       }
       if(!aux){
        return retornarError400(res)
       }
       aux=await Imagen.modificarVisibilidad(img);
       if(aux instanceof Error){
        console.log(`Error al modificar la visibilidad ${aux}`)
        return retornarError(res)
       }
       return retornarExito(res,'La visibilidad se modifico con exito')
    } catch (error) {
        console.log(`Error al modificar la visibilidad:${error}`)
        return retornarError(res)
    }
     
}
export async function modificarActiviImagen(req,res){
    try {
           let img=req.body;
        aux =await existeBd(img.idImagen,'imagen','id_imagen');
       if(aux instanceof Error){
        console.log(`Error al buscar la Imagen:${aux}`)
        return retornarError(res)
       }
       if(!aux){
        return retornarError400(res);
       }
      
       aux=await Imagen.modificarActivoImagen(img);
       if(aux instanceof Error){
        console.log(`Error al modificar el activo de la imagen ${aux}`)
        return retornarError(res)
       }
       return retornarExito(res,'El activo se modifico con exito')
    } catch (error) {
        console.log(`Error al activar la Imagen:${error}`)
        return retornarError(res)
    }
    
}
export async function buscarImagenesPublicas(req,res){
try {
    let aux;
    /*aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
    if(aux instanceof Error){
        return retornarError(res,`Error al verificar el perfil:${aux}`)
    }
    if(!aux){
        return retornarError(res,'El perfil no existe')
    }*/
    aux=await Imagen.buscarImagenesPublicas();
    if(aux instanceof Error){
        console.log(`error al buscar imagenes publicas:${error}`);
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
} catch (error) {
    console.log(`error al buscar imagenes publicas:${error}`);
    return retornarError(res)   
}
}
export async function buscarImagenesPublicasPublicas(req,res){
try {
    let aux;
    aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar el perfil:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Imagen.buscarImagenesPublicasPublicas();
    if(aux instanceof Error){
        console.log(`Error al buscar imagenes publicas:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
    
} catch (error) {
    console.log(`Error al buscar imagenes publicas , publicasPara usuarios:${error}`)
    return retornarError(res)
}
}
export async function traerImagenesParaSeguidores(req,res) {
    try {
    let aux;
    aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar el perfil:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Imagen.buscarImagenesPorSeguidor(req.body.idPerfil);
    if(aux instanceof Error){
        console.log(`Error al buscar imagenes publicas:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
    
} catch (error) {
    console.log(`Error al buscar imagenes para seguidores:${error}`)
    return retornarError(res)
}
}

export async function traerImagenesEtiqutadasPersonal(req,res){
       try {
    let aux;
    aux=await existeBd(req.body.idPerfil,'perfil','id_perfil');
    if(aux instanceof Error){
        console.log(`Error al verificar el perfil:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Imagen.buscarImagenesEtiquetadaPersonal(req.body.idPerfil);
    if(aux instanceof Error){
        console.log(`Error al buscar imagenes etiquetadas personal:${aux}`)
        return retornarError(res)
    }
    return retornarExito(res,'',aux)
    
} catch (error) {
    console.log(`Error al buscar imagenes etiquetada personal:${error}`)
    return retornarError(res)
}
}

export async function traerComentariosPorIdImagen(req,res){
try {
    let aux,idImg;
    idImg=req.body.idImagen;
    aux =await existeBd(idImg,'imagen','id_imagen')
    if(aux instanceof Error){
        console.log(`Error al buscar la Imagen que contiene los comentarios:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux=await Comentario.consultaPorIdImagen(idImg);
    if(aux instanceof Error){
        console.log(`Error al buscar los comentarios de la imagen:${aux}`)
        return retornarError(res)
    }
    
     return retornarExito(res,"",aux)
} catch (error) {
    console.log(`Error al traer comentarios por id imgen:${error}`);
    return retornarError(res)
}
}
export async function buscarContestadosPorComentario(req,res){
try {
    let aux,idC;
    idC=req.body.idC;
    aux=await existeBd(idC,'comentario','id_comentario');
    if(aux instanceof Error){
        console.log(`Error al buscar el comentario contestado:${aux}`)
        return retornarError(res)
    }
    if(!aux){
        return retornarError400(res)
    }
    aux = await ComentarioContestado.consultaPorIdComentario(idC);
    if(aux instanceof Error){
        console.log(`Error al buscar comentario contestado:${aux}`)
        return retornarError(res)
    }
    retornarExito(res,"",aux)
    
} catch (error) {
    console.log(`Error al buscar las contestaciones del comentario:${error}`);
    return retornarError(res)
}
}
export async function buscarImagenPorId(req,res){
    try {
        let aux;
        aux=await existeBd(req.body.idImagen,'imagen','id_imagen');
        if(aux instanceof Error){
            console.log(`Error al buscar la imagen por id:${aux}`);
            return retornarError(res)
        }
        if(!aux){
            return retornarError400(res)
        }
        aux=await Imagen.consultaPorId(req.body.idImagen);
        if(aux instanceof Error){
            console.log(`Error al buscar la imagen por id:${aux}`);
            return retornarError(res)
        }
        let img=aux.map(imagen => {
            return new Imagen(
                imagen.id_imagen,
                imagen.url_imagen,
                imagen.fecha_creacion_imagen,
                imagen.titulo_imagen,
                imagen.caption_imagen,
                imagen.id_visibilidad,
                imagen.titulo_visibilidad,
                imagen.activo_imagen
            );
        });
        return retornarExito(res,"",img[0])
    } catch (error) {
        console.log(`Error al buscar la imagen por id:${error}`);
        return retornarError(res)
        
    }
}
export default {
    subirImagen,
    buscarImagenesPorIdAlbumPersonal,
    modificarTituloImagenPorId,
    modificarCaptionImagenPorId,
    buscarVisibilidad,
    modificarVisibilidadImagen,
    modificarActiviImagen,
    buscarImagenesPublicas,
    buscarImagenesPublicasPublicas,
    traerImagenesParaSeguidores,
    traerImagenesEtiqutadasPersonal,
    traerComentariosPorIdImagen,
    buscarContestadosPorComentario,
    buscarImagenPorId


}