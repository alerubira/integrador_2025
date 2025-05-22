import { retornarError } from "./funsionesControlador.js";
let object;
let aux;
async function manejadorRutaPerfil(req,res,objeto){
try{
     switch(objeto){

        case 'registrarPerfil':
                object= req.body.perf;
                console.log(object);
                return res.status(200).json({message:'Perfil Registrado'});
     }




}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Ruta Perfil:${error}`)
}
}
export{manejadorRutaPerfil}