import { retornarErrorSinRes } from './funsionesControlador.js';
import nodemailer from 'nodemailer';


// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otros servicios como 'hotmail', 'yahoo', etc.
    auth: {
        user: 'arubira60@gmail.com', // Reemplaza con tu correo electrónico
        pass: 'v b m v p f m g s f f i i y w y' // Reemplaza con tu contraseña
    }
});

// Función para enviar correo electrónico
function enviarCorreo(destinatario, asunto, mensaje) {
    const mailOptions = {
        from:  '"Login Pagina de ArtesanosPuntoCom" <arubira60@gmail.com>', // Reemplaza con tu nombre y correo electrónico
        to: destinatario,
        subject: asunto,
        text: mensaje
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error al enviar correo:', error);
                reject(`Error al enviar el correo: ${error}`);
            } else {
                console.log('Correo enviado:', info.response);
                resolve(info.response);
            }
        });
    });
}

export {enviarCorreo} ;