"use strict";

let sentence = "Hoy es un día estupendo y fantástico";

let separator = " ";

function splitSentence(sentence, separator) {
  let arraySentence = sentence.split(separator);
  return arraySentence;
}

let sentenceArray = splitSentence(sentence, separator);

//Solución 1 - .reduce

let longestWord = sentenceArray.reduce((a, b) => (a.length > b.length ? a : b));

console.log(longestWord);

//Solución 2 - for & if

function searchWords(array) {
  let longestWord = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > longestWord.length) {
      longestWord = array[i];
    }
  }
  return longestWord;
}

console.log(searchWords(sentenceArray));
