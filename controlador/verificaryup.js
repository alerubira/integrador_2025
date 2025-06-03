import * as yup from 'yup';  // Importa todas las exportaciones de yup
import { retornarErrorSinRes,transformarstrinAExpReg } from './funsionesControlador.js';
import { parametros } from '../parametros.js';

const claveReg=transformarstrinAExpReg(parametros.clave);
const loginY= yup.object().shape({
    usuario: yup.string()
        .max(parametros.tamaño2, `El Usuario ${parametros.cartelTamaño2}`)
        .required('El usuario es obligatorio'),
    clave: yup.string()
        .matches(claveReg, `${parametros.cartelClave}`)
        .required('La clave es obligatoria'),
    claveProvisoria: yup.string()
        .max(parametros.tamaño3, `La clave provisoria ${parametros.cartelTamaño3}`)
        .nullable(),
    });
const dniReg=transformarstrinAExpReg(parametros.dni);  
const nombresReg=transformarstrinAExpReg(parametros.nombres);  
const BasePersonaY= yup.object().shape({//dejar
    dniPersona: yup.string()
        .matches(dniReg, parametros.cartelDni)
        .required('El DNI es obligatorio'),
    nombrePersona: yup.string()
        .matches(nombresReg, `Para el Nombre ${parametros.cartelNombres}`)
        .max(parametros.tamaño1, `El nombre ${parametros.cartelTamaño1}`)
        .required('El nombre es obligatorio'),
    apellidoPersona: yup.string()
        .matches(nombresReg, `Para el apellido ${parametros.cartelNombres}`)
        .max(parametros.tamaño1, `El Apellido ${parametros.cartelTamaño1}`)
        .required('El apellido es obligatorio'),
        
        });
const PersonaY= BasePersonaY.shape({});//dejar        
const ProfesionalY= BasePersonaY.shape({//dejar
    eMail: yup.string()
        .email('El E-Mail es incorrecto')
        .required('El E-Mail es obligatorio'),
    }); 
 const perfilY=BasePersonaY.shape({//dejar
    eMailPerfil: yup.string()
        .email('El E-Mail es incorrecto')
        .required('El E-Mail es obligatorio'),
    interesesPerfil: yup.string()
        .max(parametros.tamaño4, `Los intereses ${parametros.cartelTamaño4}`)
        .nullable(),
    antecedentesPerfil: yup.string()
        .max(parametros.tamaño4, `Los antecedentes ${parametros.cartelTamaño4}`)
        .nullable(),
    imgPerfil: yup.string()
        .max(parametros.tamaño4, `La imagen ${parametros.cartelTamaño4}`)
        .nullable(),   
        //agregar el nombrePerfil,tamañ1 de parametros
    nombrePerfil: yup.string()
        .max(parametros.tamaño1, `El nombre del Perfil ${parametros.cartelTamaño1}`)
        .required('El nombre del Perfil es obligatorio'),    
 })          
 
 const profesionY=yup.object().shape({//dejar
    nombreProfesion:yup.string()
    .max(parametros.tamaño1,`El nombre de la Profesion debe tener como maximo ${parametros.tamaño1} caracteres`)
    .required('El nombre de la Profesion es obligatorio')
 })
 const albumPersonalY=yup.object().shape({//dejar
    tituloAlbumPersonal:yup.string()
        .max(parametros.tamaño1,`El nombre del Album debe tener como maximo ${parametros.tamaño1} caracteres`)
        .required('El nombre del Album es obligatorio'),
 });
 const imagenY=yup.object().shape({
    urlImagen:yup.string()
        .required('La Imagen debe contener una url'),
    tituloImagen:yup.string()
        .max(parametros.tamaño1,`El Titulo de la Imagen debe tener como maximo:${parametros.tamaño1} `)
        .nullable(),
    captionImagen:yup.string()
        .max(parametros.tamaño1,`El Titulo de la Imagen debe tener como maximo:${parametros.tamaño1} `)
        .nullable(),
    idVisibilidad:yup.string()
       .required('La imagen debe contener una visibilidad')    
 })
    
async function verificarYup(objeto,nombre){
    let aux;
        //console.log(objeto);
    try{

           
           switch (nombre) {
             case 'login':
               return await verificarY(objeto,loginY);
               break;
            
             
            case 'profesion':
                return await verificarY(objeto,profesionY);
             break;
             case 'persona':
                return await verificarY(objeto,PersonaY);
                break; 
            case 'profesional':
                return await verificarY(objeto,ProfesionalY);
                break;
            case 'perfil':
                return await verificarY(objeto,perfilY);
                break; 
            case'albumPersonal':
                return await verificarY(objeto,albumPersonalY);
                break; 
            case'imagen':
            return await verificarYup(objeto,imagenY)            
             default:
                return retornarErrorSinRes('Seleccion no valida en verificar para yup');
       }
       
    }catch(error){
        console.error(`Error en verificar yups:${error}`)
        return retornarErrorSinRes(`Erro en verificar para yup :${error}`)
    }
       
       }
  function verificarY(objeto,nombre){
    return nombre.validate(objeto)
    .then(validData => {
        
        return validData;
    })
    .catch(err => {
        console.error("Errores de validación en yup:", err.errors);
        return retornarErrorSinRes(`Error de validacion yup :${err.errors}`);
    });
  }     

 
export{verificarYup};