"use strict";

const rateUrl = "https://api.exchangerate-api.com/v4/latest/EUR";

const euros = 100;

console.log(`Importe inicial: ${euros}€`);

async function eurDolYen(euros) {
  const rate = await (await fetch(rateUrl)).json();
  const dollars = euros * rate.rates.USD;
  console.log(`El importe convertido a dólares: ${dollars.toFixed(2)}$`);
  const yenes = dollars * rate.rates.JPY;
  console.log(`Estos dólares convertidos a yenes: ¥${yenes.toFixed(2)}`);
}

eurDolYen(euros);
