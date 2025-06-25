import { retornarError ,retornarExito,retornarError400} from "./funsionesControlador.js";
import {Perfil} from "../modelo/clasePerfil.js";
import {Tags} from "../modelo/claseTags.js"
import { verificarYup } from "../controlador/verificaryup.js";
import { parametros } from "../parametros.js";
import sharp from 'sharp';
import path from 'path';
import  fs from "fs";
import { existeBd } from "../modelo/conexxionBD.js";

/*let object;
let object2;
let aux;
let perfil;*/
/*async function manejadorRutaPerfil(req,res,objeto){
try{
     switch(objeto){

        case 'registrarPerfil':
                object= req.body.perf;
                object2= req.body.login;
                aux=await verificarYup(object,'perfil');
                 if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await verificarYup(object2,'login');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await Perfil.alta(object,object2);
                if(aux instanceof Error){return retornarError(res,`Error al crear el perfil:${aux}`)}
                return retornarExito(res,`El perfil fue creado con exito,ahora puede ingresar`);
        break;
     case 'paginaPersonal':    
             const datosEncoded = req.query.datos; 
            const datosDecoded = decodeURIComponent(datosEncoded);
             const toke = JSON.parse(datosDecoded);
                if(!toke){return retornarError(res,"Datos de acceso Invalido")}
            
                 if(toke.tipoAutorizacion!==5){return retornarError(res,"El Usuario no tiene el nivel de Autorizacion")}
                 if (toke.tipoAutorizacion === 5) {
                    let  encabezado = "Pagina Personal";
                    let p1=await Perfil.consultaPorId(toke.idSolicitante);
                   if(p1 instanceof Error){return retornarError(res,`Error al buscar el Perfil:${p}`)}
                   let p=p1[0];
                   if(p.activo_perfil!==1||p.activo_persona!==1){return retornarError(res,"El Perfil Esta dado de baja")}
                   perfil=new Perfil(p.id_perfil,p.id_persona,p.intereses_perfil,p.antecedentes_perfil,p.e_mail_perfil,p.img_perfil,p.activo_perfil,p.nombre_perfil,p.dni_persona,p.nombre_persona,p.apellido_persona,p.activo_persona);
                 if(perfil instanceof Error){return retornarError(res,`Error al crear el objeto perfil:${perfil}`)}
                 if(perfil.imgPerfil===null||perfil.imgPerfil===undefined||perfil.imgPerfil===""){
                     perfil.imgPerfil="imagenesPerfil/fotoPerfil.svg";
                 }
                   res.render('vistaPersonal',{encabezado,parametros,perfil});
                 }
                 break;
            case 'subirImagenPerfil':
                      let urlImagen = '/imagenesPerfil/' + req.file.filename;
                     aux= await Perfil.modificarImagenPorIdPerfil(req.body.idPerfil, urlImagen);
                      if(aux instanceof Error){return retornarError(res,`Error al modificar la imagen del perfil:${aux}`)}
                      if(aux===0){return retornarError(res,`No se encontro el perfil con id ${req.body.idPerfil}`)}
                      //return res.json({ success: true, url: urlImagen });
                      return retornarExito(res,`La imagen del perfil fue modificada con exito`, urlImagen);
              break;
            case 'modificarEMailPerfil':
                object= req.body;
                aux=await verificarYup(object,'perfil');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await Perfil.modificarEMailPorIdPerfil(object.idPerfil,object.eMailPerfil);
                if(aux instanceof Error){return retornarError(res,`Error al modificar el Email del perfil:${aux}`)}
                if(aux===0){return retornarError(res,`No se encontro el perfil con id ${object.idPerfil}`)}
                return retornarExito(res,`El Email del perfil fue modificado con exito`);     
            break;
            case 'modificarInteresesPerfil':
                object= req.body;
                aux=await verificarYup(object,'perfil');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await Perfil.modificarInteresesPorIdPerfil(object.idPerfil,object.interesesPerfil);
                if(aux instanceof Error){return retornarError(res,`Error al modificar los intereses del perfil:${aux}`)}
                if(aux===0){return retornarError(res,`No se encontro el perfil con id ${object.idPerfil}`)}
                return retornarExito(res,`Los intereses del perfil fueron modificados con exito`);
            break;
            case 'modificarAntecedentesPerfil':
                object= req.body;
                aux=await verificarYup(object,'perfil');
                if(aux instanceof Error){return retornarError(res,`Error al verificar yup:${aux}`)}
                aux=await Perfil.modificarAntecedentesPorIdPerfil(object.idPerfil,object.antecedentesPerfil);
                if(aux instanceof Error){return retornarError(res,`Error al modificar los antecedentes del perfil:${aux}`)}
                if(aux===0){return retornarError(res,`No se encontro el perfil con id ${object.idPerfil}`)}
                return retornarExito(res,`Los antecedentes del perfil fueron modificados con exito`);
            break;            
                default:
            return retornarError(res,`No se encontro el objeto ${objeto}`);        
     }




}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Ruta Perfil:${error}`)
}
}*/
// Registrar perfil
export async function registrarPerfil(req, res) {
    try {
        const object = req.body.perf;
        const object2 = req.body.login;
        let aux = await verificarYup(object, 'perfil');
        if (aux instanceof Error){
            console.log( `Error al verificar yup el perfil:${aux}`);
            return retornarError(res);
        } 
        aux = await verificarYup(object2, 'login');
        if (aux instanceof Error){
            console.log(`Error al verificar yup el login:${aux}`);
            return retornarError(res);
        } 
        aux = await Perfil.alta(object, object2);
        if (aux instanceof Error){
            console.log(`Error al crear el perfil:${aux}`);
            return retornarError(res);
        } 
        return retornarExito(res, `El perfil fue creado con exito, ahora puede ingresar`);
    } catch (error) {
        console.log( `Error en registrarPerfil: ${error}`);
        return retornarError(res);
    }
}

// Página personal
export async function paginaPersonal(req, res) {
    try {
        const datosEncoded = req.query.datos;
        const datosDecoded = decodeURIComponent(datosEncoded);
        const toke = JSON.parse(datosDecoded);
        if (!toke){
            console.log(`Error en token:${toke}`);
             return retornarError400(res);
        }
        if (toke.tipoAutorizacion !== 5){
             return retornarError400(res);
        } 
        let encabezado = "Pagina Personal";
        let p1 = await Perfil.consultaPorId(toke.idSolicitante);
        if (p1 instanceof Error){
            console.log( `Error al buscar el Perfil:${p1}`);
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
            console.log( `Error al crear el objeto perfil:${perfil}`);
            return retornarError(res);
        } 
        if (!perfil.imgPerfil){
             perfil.imgPerfil = "imagenesPerfil/fotoPerfil.svg";
        } 
        let tags = await Tags.consulta();
        if (tags instanceof Error){
            console.log( `Error al consultar los Tags: ${tags}`);
            return retornarError(res);
        } 
        return res.render('vistaPersonal', { encabezado, parametros, perfil ,tags});
    } catch (error) {
        console.log( `Error en paginaPersonal: ${error}`);
        return retornarError(res);
    }
}

// Subir imagen de perfil
/*export async function subirImagenPerfil(req, res) {
    try {
        // Ruta original (temporal) y destino comprimido
        const inputPath = req.file.path;
        const outputFilename = 'perfil-' + Date.now() + path.extname(req.file.originalname);
        const outputPath = path.join('estatica/imagenesPerfil', outputFilename);

        // Procesar la imagen con sharp (redimensionar y comprimir)
        await sharp(inputPath)
            .resize(100, 100) // Ajusta el tamaño si lo deseas
            .jpeg({ quality: 70 }) // Ajusta la calidad si lo deseas
            .toFile(outputPath);
        // Elimina la imagen original subida por Multer (temporal)
        
        fs.unlink(inputPath, (err) => {
    if (err) {
        console.warn('No se pudo borrar el archivo temporal:', err.message);
    }
      });
       
            
        // Guarda la URL de la imagen comprimida
        const urlImagen = '/imagenesPerfil/' + outputFilename;
        const aux = await Perfil.modificarImagenPorIdPerfil(req.body.idPerfil, urlImagen);
        if (aux instanceof Error) return retornarError(res, `Error al modificar la imagen del perfil:${aux}`);
        if (aux === 0) return retornarError(res, `No se encontro el perfil con id ${req.body.idPerfil}`);
        return retornarExito(res, `La imagen del perfil fue modificada con exito`, urlImagen);
    } catch (error) {
        console.error("Error en subirImagenPerfil", error);
        return retornarError(res, `Error en subirImagenPerfil: ${error}`);
    }
    
}*/
export async function subirImagenPerfil(req, res) {
    try {
        const outputFilename = 'perfil-' + Date.now() + path.extname(req.file.originalname);
        const outputPath = path.join('estatica/imagenesPerfil', outputFilename);

        // Procesar el buffer recibido por Multer directamente con Sharp
        await sharp(req.file.buffer)
            .resize(100, 100)
            .jpeg({ quality: 70 })
            .toFile(outputPath);

        // Guarda la URL de la imagen comprimida
        const urlImagen = '/imagenesPerfil/' + outputFilename;
        const aux = await Perfil.modificarImagenPorIdPerfil(req.body.idPerfil, urlImagen);
        if (aux instanceof Error){
            console.log(`Error al modificar la imagen del perfil:${aux}`);
             return retornarError(res);
        } 
        if (aux === 0){
             return retornarError400(res);
        }
        return retornarExito(res,'La imagen del perfil fue modificada con exito', urlImagen);
    } catch (error) {
        console.log(`Error en subirImagenPerfil: ${error}`);
        return retornarError(res);
    }
    
}
// Modificar email del perfil
export async function modificarEMailPerfil(req, res) {
    try {
        const object = req.body;
        let aux = await verificarYup(object, 'perfil');
        if (aux instanceof Error){
            console.log( `Error al verificar yup:${aux}`);
            return retornarError(res);
        } 
        aux = await Perfil.modificarEMailPorIdPerfil(object.idPerfil, object.eMailPerfil);
        if (aux instanceof Error){
            console.log(`Error al modificar el Email del perfil:${aux}`);
            return retornarError(res);
        } 
        if (aux === 0){
             return retornarError400(res);
        }
        return retornarExito(res, `El Email del perfil fue modificado con exito`);
    } catch (error) {
        console.log( `Error en modificarEMailPerfil: ${error}`);
        return retornarError(res);
    }
}
// Modificar intereses del perfil
export async function modificarInteresesPerfil(req, res) {
    try {
        const object = req.body;
        let aux = await verificarYup(object, 'perfil');
        if (aux instanceof Error){
            console.log( `Error al verificar yup:${aux}`);
            return retornarError(res);
        } 
        aux = await Perfil.modificarInteresesPorIdPerfil(object.idPerfil, object.interesesPerfil);
        if (aux instanceof Error){
            console.log(`Error al modificar los intereses del perfil:${aux}`);
            return retornarError(res);
        } 
        if (aux === 0){
            return retornarError(res);
        } 
        return retornarExito(res, `Los intereses del perfil fueron modificados con exito`);
    } catch (error) {
        console.log( `Error en modificarInteresesPerfil: ${error}`);
        return retornarError(res);
    }
}
// Modificar antecedentes del perfil
export async function modificarAntecedentesPerfil(req, res) {
    try {
        const object = req.body;
        let aux = await verificarYup(object, 'perfil');
        if (aux instanceof Error){
            console.log( `Error al verificar yup el perfil:${aux}`);
            return retornarError(res);
        } 
        aux = await Perfil.modificarAntecedentesPorIdPerfil(object.idPerfil, object.antecedentesPerfil);
        if (aux instanceof Error){
            console.log( `Error al modificar los antecedentes del perfil:${aux}`);
            return retornarError(res);
        } 
        if (aux === 0){
            return retornarError400(res);
        } 
        return retornarExito(res, `Los antecedentes del perfil fueron modificados con exito`);
    } catch (error) {
        console.log( `Error en modificarAntecedentesPerfil: ${error}`);
        return retornarError(res);
    }
}
export async function buscarPerfilPorApellido(req,res){
    try {
                let aux;
           /* aux=await existeBd(req.body.idPerfil,'perfil','id_perfil')
            if(aux instanceof Error){
                return retornarError(res`Error al buscar el perfil ${aux}`)
            }
            if(!aux){
                return retornarError(res,'El Perfil no existe')
            }*/
            aux=await Perfil.buscarPerfilPorApellido(req.body.frac)
            if(aux instanceof Error){
                console.log(`Error al buscar el perfil por el apellido:${aux}`)
                return retornarError(res)
            }
      retornarExito(res,"",aux)
    } catch (error) {
        console.log(`Error al buscar perfil por apellido:${error}`);
        return retornarError(res)
    }
    
}
export async function buscarPerfilSeguidoresPorApellido(req,res){
     try {
                let aux;
            aux=await existeBd(req.body.idPerfil,'perfil','id_perfil')
            if(aux instanceof Error){
                console.log(`Error al buscar el perfil ${aux}`)
                return retornarError(res)
            }
            if(!aux){
                return retornarError400(res)
            }
            aux=await Perfil.buscarPerfilSeguidoresPorApellido(req.body.frac,req.body.idPerfil)
            if(aux instanceof Error){
                console.log(`Error al buscar el perfil por el apellido:${aux}`)
                return retornarError(res)
            }
      retornarExito(res,"",aux)
    } catch (error) {
        console.log(`Error al buscar perfil por apellido${error}`);
        return retornarError(res)
    }
    
}
export async function buscarPerfilPorid(req,res){
try {
    let aux;
    aux =await existeBd(req.body.id,'perfil','id_perfil')
     if(aux instanceof Error){
        console.log(`Error al buscar el perfil ${aux}`)
        return retornarError(res)
      }
      if(!aux){
        return retornarError400(res)
      }
    aux=await Perfil.consultaPorId(req.body.id);
     if(aux instanceof Error){
        console.log( `Error al buscar el perfil por el id:${aux}`)
        return retornarError(res)
      }
      let prf=aux.map(p => new Perfil(
        p.id_perfil, p.id_persona, p.intereses_perfil, p.antecedentes_perfil,
        p.e_mail_perfil, p.img_perfil, p.activo_perfil, p.nombre_perfil,
        p.dni_persona, p.nombre_persona, p.apellido_persona, p.activo_persona
    ));
      retornarExito(res,"",prf[0])


} catch (error) {
    console.log(`Error al buscar Perfil:${error}`)
    return retornarError(res)
}
}
export async function modificarActivoPerfil(req,res){
try {
    let aux;
    aux=await existeBd(req.body.idPerfil,'perfil','id_perfil')
    if(aux instanceof Error){
        console.log(`Error al buscar el perfil ${aux}`)
        return retornarError(res)
      }
      if(!aux){
        return retornarError400(res)
      }
      
      aux=await Perfil.modificarActivoPerfil(req.body);
      if(aux instanceof Error){
        console.log(`Error al modificar el activo del perfil:${aux}`);
        return retornarError(res);      
      }
      retornarExito(res,`El activo del perfil fue modificado con exito`,aux);
} catch (error) {
    console.log(`Error al modificar el activo del perfil:${error}`);
    return retornarError(res);
    
}
}
export default{
    registrarPerfil,
    paginaPersonal,
    subirImagenPerfil,
    modificarEMailPerfil,
    modificarInteresesPerfil,
    modificarAntecedentesPerfil,
    buscarPerfilPorApellido,
    buscarPerfilSeguidoresPorApellido,
    buscarPerfilPorid,
    modificarActivoPerfil
}

//export{manejadorRutaPerfil}