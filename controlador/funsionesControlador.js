function retornarError(res,mensaje){
    
    return res.status(500).send({
        success: false,
        message: mensaje,
    });
}
function retornarErrorSinRes(message) {
    //console.log(message);
    return new Error(message);
}
function retornarExito(res,mensaje,urlImgen){
    return res.status(200).send({
        success: true,
        message: mensaje,
        urlImagen: urlImgen
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




export{retornarError,retornarErrorSinRes,retornarExito,transformarstrinAExpReg,generarNumeroAleatorio}