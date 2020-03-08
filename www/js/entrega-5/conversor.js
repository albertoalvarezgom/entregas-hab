"use strict";

const url = "https://api.exchangerate-api.com/v5/latest";
const url2 = "https://api.exchangerate-api.com/v4/latest";

//// Con getCoins almacenamos todos las divisas en la constante rates

async function getCoins(url) {
  const rate = await (await fetch(url)).json();
  const rates = Object.keys(rate.rates);
  return rates;
}

//// Con getRates almacenamos todos los valores en la constante rates

async function getRates(url) {
  const rate = await (await fetch(url)).json();
  const rates = Object.values(rate.rates);
  return rates;
}

//// Con getFull almacenamos divisas y correspondencia

async function getFull(url) {
  const rate = await (await fetch(url)).json();
  const rates = rate.rates;
  return rates;
}

//// Coin coinSelector incluimos como opciones de selección todos los
//// tipos de cambio obtenidos con getCoins

const selector1 = document.querySelector("#coinselector1");
const selector2 = document.querySelector("#coinselector2");

async function coinSelector() {
  const coins = await getCoins(url);

  for (const coin of coins) {
    const option = document.createElement("option");
    selector1.appendChild(option);
    option.value = coin;
    option.textContent = coin;
  }

  for (const coin of coins) {
    const option = document.createElement("option");
    selector2.appendChild(option);
    option.value = coin;
    option.textContent = coin;
  }
}

coinSelector();

//// Con la función conversion haremos la operación

async function conversion() {
  // const button = document.querySelector("#convert");
  const form = document.querySelector("#form");
  const result = document.querySelector("#result");

  //// Al hacer click en convertir...
  form.addEventListener("submit", async event => {
    event.preventDefault();

    //// ammount.value captura el valor introducido en el input

    const ammount = document.querySelector("#ammount");
    //// coin1 y coin2 almacenan las opciones de divisa seleccionadas
    const coin1 = coinselector1.selectedOptions[0].value;
    const coin2 = coinselector2.selectedOptions[0].value;

    //// Utilizamos coin1 para hacer la petición a la API
    const petition = `${url2}/${coin1}`;

    //// fullObject contiene todos los tipos de cambio asociados a coin1
    const fullObject = await getFull(petition);

    const solution = ammount.value * fullObject[coin2];

    //// El contenido del mensaje de conversión será result.innerHTML
    result.innerHTML = solution.toFixed(2);
  });
}

conversion();
