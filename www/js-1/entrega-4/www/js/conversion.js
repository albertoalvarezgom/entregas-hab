"use strict";

const rateUrl = "https://api.exchangerate-api.com/v4/latest/EUR";
const rateUrl2 = "https://api.exchangerate-api.com/v4/latest/USD";

const euros = 100;

console.log(`Importe inicial: ${euros}€`);

async function eurDolYen(euros) {
  const rate = await (await fetch(rateUrl)).json();
  const dollars = euros * rate.rates.USD;
  console.log(`El importe convertido a dólares: ${dollars.toFixed(2)}$`);
  const rate2 = await (await fetch(rateUrl2)).json();
  const yenes = dollars * rate2.rates.JPY;
  console.log(`Estos dólares convertidos a yenes: ¥${yenes.toFixed(2)}`);
}

eurDolYen(euros);
