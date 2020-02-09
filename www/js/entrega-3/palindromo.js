"use strict";

let sentenceToCheck = "Esto no es un palíndromo";

function prepareToCompare() {
  let sentenceArray = sentenceToCheck
    .toLowerCase()
    .replace(/ /g, "")
    .split("");

  return sentenceArray;
}

function isPalindrome() {
  let array1String = prepareToCompare(sentenceToCheck)
    .toString()
    .replace(/,/g, "");

  let array2String = prepareToCompare(sentenceToCheck)
    .reverse()
    .toString()
    .replace(/,/g, "");

  if (array1String === array2String) {
    console.log(`"${sentenceToCheck}" es un palíndromo.`);
  } else {
    console.log(`"${sentenceToCheck}" NO es un palíndromo.`);
  }
}

isPalindrome(sentenceToCheck);
