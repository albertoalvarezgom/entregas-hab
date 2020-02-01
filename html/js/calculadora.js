"use strict";

//Ejercicio Calculadora usando if...else

let operadorUno = 2;
let operadorDos = 4;
let operacion = "suma";

if (operacion === "suma") {
  console.log(operadorUno + operadorDos);
} else if (operacion === "resta") {
  console.log(operadorUno - operadorDos);
} else if (operacion === "multiplicacion") {
  console.log(operadorUno * operadorDos);
} else if (operacion === "division") {
  console.log(operadorUno / operadorDos);
} else if (operacion === "potencia") {
  console.log(Math.pow(operadorUno, operadorDos));
} else {
  console.log("La operación seleccionada no está disponible");
}

//Ejercicio Calculadora usando switch

let operatorOne = 2;
let operatorTwo = 3;
let operation = "divide";

switch (operation) {
  case "add":
    console.log(operatorOne + operatorTwo);
    break;
  case "subs":
    console.log(operatorOne - operatorTwo);
    break;
  case "multiply":
    console.log(operatorOne * operatorTwo);
    break;
  case "divide":
    console.log(operatorOne / operatorTwo);
    break;
  case "potency":
    console.log(Math.pow(operatorOne, operatorTwo));
    break;
  default:
    console.log("La operación seleccionada no está disponible");
}
