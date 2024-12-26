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
function retornarExito(res,mensaje){
    return res.status(200).send({
        success: true,
        message: mensaje,
    });
}
function transformarstrinAExpReg(string) {
    // Escapar las barras invertidas dobles (\\) y convertir a un literal
    const expreg = string.replace(/\\\\/g, '\\');
    return new RegExp(expreg);
}



export{retornarError,retornarErrorSinRes,retornarExito,transformarstrinAExpReg}