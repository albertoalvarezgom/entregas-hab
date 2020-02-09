"use strict";

/* Haz que la función BinaryConverter(str) devuelva la forma decimal del valor binario.
Por ejemplo: si se pasa 101 el programa debe retornar un 5, si se pasa 1000 debe 
retornar un 8, etc.Si no sabes como convertir un número binario a decimal puedes 
echar un ojo a este vídeo: https://www.youtube.com/watch?v=bBMhiSy1Grc */

let binary = 101101;

//Solución 1 - parseInt

let decimal = parseInt(binary, 2);

console.log(`El valor decimal de ${binary} es ${decimal}`);

//Solución 2 - potencias de 2

function convertBinary(binary) {
  let numberArray = binary
    .toString()
    .split("")
    .reverse();

  for (let i = 0; i <= numberArray.length; i++) {
    let decimal = 2 ** i * i;
  }
  console.log(`El valor decimal de ${binary} es ${decimal}`);
}

convertBinary(binary);
