'use strict';

function dice() {
  const diceNum = Math.ceil(Math.random() * 6);
  return diceNum;
}

let totalScore = 0;

for (let i = 1; totalScore <= 50; i++) {
  const diceNum = dice();
  totalScore += diceNum;
  console.log(`Tirada ${i}: ha salido un ${diceNum}. Tienes un total de ${totalScore} puntos.`);
}
