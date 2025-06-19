function retornarError(res,mensaje){
    
    return res.status(500).send({
        success: false,
        message:`Error interno del servidor:${mensaje}`,
    });
}
function retornarError400(res,mensaje){
    return res.status(400).send({
        success:false,
        message:`Solicitud no encontrada:${mensaje}`
    })
}
function retornarErrorSinRes(message) {
    //console.log(message);
    return new Error(message);
}
function retornarExito(res,mensaje,retorno){
    return res.status(200).send({
        success: true,
        message: mensaje,
        retorno:retorno
    });
}
function transformarstrinAExpReg(string) {
    // Escapar las barras invertidas dobles (\\) y convertir a un literal
    const expreg = string.replace(/\\\\/g, '\\');
    return new RegExp(expreg);
}
function generarNumeroAleatorio() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}




export{ retornarError400,retornarError,retornarErrorSinRes,retornarExito,transformarstrinAExpReg,generarNumeroAleatorio}