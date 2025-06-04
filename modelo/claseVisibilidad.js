import{VisibilidadData}from './visibilidadData.js' 
class Visibilidad{
    constructor(idVisibilidad,tituloVisibilidad){
    this.idVisibilidad=idVisibilidad;
    this.tituloVisibilidad=tituloVisibilidad;
    }
    static async consulta(visibilidad){
     return await VisibilidadData.consulta();
    }
}
export{Visibilidad}