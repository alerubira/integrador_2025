const parametros={
    tamaño1:28,
    cartelTamaño1:"no debe superar los 28 caracteres",
    nombres:"^[a-zA-Z\\s]+$",//se agrega una barra invertida par ña transformacion con la funsion en el cliente
    cartelNombres:"solo se permiten letras",
    clave:"^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$",
    cartelClave:"La clave debe contener 6 caracteres,como minimo una letra mayuscula,dos letras consecutivas y tres numeros",
    dni:"^\\d{7,8}$",//se agregauna barra invertida para la transformacion con la funsion en el cliente
    cartelDni:"El dni debe contener 7 u 8 numeros unicamente",
    tamaño2:6,
    cartelTamaño2:"no debe superar los 6 caracteres"

}
/*/^[a-zA-Z\s]+$/ expresion regular:a-zA-Z: Permite letras minúsculas y mayúsculas.
\s: Permite espacios en blanco.
+: Indica que se permite uno o más caracteres que coincidan con lo anterior.
^ y $: Aseguran que toda la cadena cumpla con el patrón (no solo una parte de ella).*/
/*/^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$/
^: Indica el inicio de la cadena.
$: Indica el final de la cadena.
Esto asegura que la expresión regular evalúe toda la cadena, no solo una parte.
2. (?=.*[A-Z]):
Es un lookahead positivo, que verifica si en algún lugar de la cadena hay al menos una letra mayúscula ([A-Z]).
No consume caracteres, solo valida que la condición esté presente.
3. (?=.*[a-zA-Z]{2}):
Otro lookahead positivo, que verifica si hay al menos 2 letras consecutivas (pueden ser mayúsculas o minúsculas) en la cadena.
Esto no requiere que las letras estén al principio o al final; solo verifica su existencia.
4. (?=.*\d{3}):
Un lookahead positivo que verifica si hay al menos 3 dígitos consecutivos (\d representa un número del 0 al 9) en algún lugar de la cadena.
5. .*:
Esto significa "cualquier cantidad de caracteres (incluyendo ninguno) después de haber pasado las verificaciones anteriores".
Permite que la cadena tenga cualquier contenido adicional después de cumplir con los requisitos de los lookaheads.
*/

export {parametros}