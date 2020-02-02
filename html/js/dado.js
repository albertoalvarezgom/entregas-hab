"use strict";

function dice() {
  const diceNum = Math.ceil(Math.random() * 6);
  return diceNum;
}

let totalScore = 0;

for (let i = 1; totalScore < 50; i++) {
  const diceNum = dice();
  totalScore += diceNum;
  if (totalScore < 50) {
    console.log(
      `Tirada ${i}: ha salido un ${diceNum}. Tienes un total de ${totalScore} puntos.`
    );
  } else {
    console.log(
      `¡Enhorabuena, ha salido un ${diceNum}!¡Has ganado con un total de ${totalScore} puntos!`
    );
  }
}
