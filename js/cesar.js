const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//constantes de los elementos html a controlar
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');


function shiftMessage() {
    //convertir inputOriginal en array en mayusculas
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray);
}

function printChar(currentLetterIndex, wordArray) {
    // si el index actual es igual al largo del array se detiene la recursion 
    if(currentLetterIndex == wordArray.length){
        return;
    }

    //si no es la ultima letra obtenemos el primer caracter
    inputOriginal.value = inputOriginal.value.substring(1);

    //se crea un span para cada caracter a encriptar (uno a la vez) y asi poder mostrarlos
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    //luego de la animacion se imprime la letra 
    animatedChar(spanChar).then(
        
       function (){
           const charSinCodificar = wordArray[currentLetterIndex];

            //si el caracter se encuentra en el alfabeto se suma su posicion mas el rango utilizado para 
            //cifrar, por el modulo(%) del largo del alfabeto, esto se hace para los casos en donde el  
            //indice + el rango sobrepasa el largo del alfabeto, asi se vuelve al inicio y se utilizan 
            //las primeras letras del alfabeto para cifrar, por ejemplo si el input original es la letra 
            //X y el rango es 5 seria algo asi: X tiene el indice 25 (si se empieza desde 1) mas 5 del 
            //rango da 30, 30 modulo (%) alfabeto.lenght(27) da como resultado 3 por lo que X seria 
            //remplazada por la letra en la posicion 3 del array, es decir la letra C, de esta forma 
            //vemos como X fue reemplazada por la letra que estaba 5 posiciones mas adelante justo como 
            //indica el rango.
            if (alfabeto.includes(charSinCodificar)){
                spanChar.innerHTML = alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length]
            }else{
                spanChar.innerHTML = charSinCodificar;
            }

            printChar(currentLetterIndex + 1, wordArray);
       } 
    );

}

function animatedChar(spanChar) {
    let cambiosDeLetra = 0;
    //promise espera a que termine la animacion de letras en un intervalo de 50 milisegundos
    return new Promise(function(resolve){
        const intervalo = setInterval(function(){
            //modifica el contenido del span por una letra aleatoria 3 veces seguidas
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

function submit(e) {
    //evita el comportamiendo default de envio de formulario
    e.preventDefault();
    //reemplaza el codigo html que contiene elemento 'resultado' con un string
    resultado.innerHTML = '';
    shiftMessage();
}

cifrador.onsubmit = submit;
