"use strict";

let frase = "Hoy es un día estupendo y fantástico";

let espacio = " ";

function dividirFrase(frase, separador) {
  let arrayFrase = frase.split(separador);
  return arrayFrase;
}

let fraseArray = dividirFrase(frase, espacio);

//Solución 1 - .reduce

let palabraMayor = fraseArray.reduce(
  (a, b) => (a.length > b.length ? a : b),
  ""
);

console.log(palabraMayor);

//Solución 2 - for & if

function recorrerPalabras(array) {
  let palabraMasLarga = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > palabraMasLarga.length) {
      palabraMasLarga = array[i];
    }
  }
  return palabraMasLarga;
}

console.log(recorrerPalabras(fraseArray));
