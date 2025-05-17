import { genSalt, hash as _hash} from 'bcrypt';
// Función para hashear una contraseña
async function crearHash(hashear) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await genSalt(saltRounds);
    const hash = await _hash(hashear, salt);
    return hash;
}

export { crearHash };