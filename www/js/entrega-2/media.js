'use strict';

// Calcula la media de puntos en los últimos tres partidos de estos tres equipos
// y muestra por consola el que tenga una media más alta:

const equipoMaria = [62, 34, 55];
const equipoPaula = [35, 60, 59];
const equipoRebeca = [40, 39, 63];

function mediaMaria() {
  const equipoMaria = [62, 34, 55];
  const sumaMaria = equipoMaria[0] + equipoMaria[1] + equipoMaria[2];
  const media = sumaMaria / equipoMaria.length;
  return media;
}
console.log('La media del equipo de María es de ' + mediaMaria());

function mediaPaula() {
  const equipoPaula = [35, 60, 59];
  const sumaPaula = equipoPaula[0] + equipoPaula[1] + equipoPaula[2];
  const media = sumaPaula / equipoPaula.length;
  return media;
}
console.log('La media del equipo de Paula es de ' + mediaPaula());

function mediaRebeca() {
  const equipoRebeca = [40, 39, 63];
  const sumaRebeca = equipoRebeca[0] + equipoRebeca[1] + equipoRebeca[2];
  const media = sumaRebeca / equipoRebeca.length;
  return media;
}
console.log('La media del equipo de Rebeca es de ' + mediaRebeca());

if (mediaRebeca() > mediaPaula() && mediaRebeca() > mediaMaria()) {
  console.log('El equipo con la media más alta es el de Rebeca.');
} else if (mediaPaula() > mediaMaria() && mediaPaula() > mediaRebeca()) {
  console.log('El equipo con la media más alta es el de Paula.');
} else {
  console.log('El equipo con la media más alta es el de María.');
}
