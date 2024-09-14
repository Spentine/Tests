import { charMap } from "./map.js";

function convert(text) {
  for (let i=0; i<charMap.length; i++) {
    text = text.replaceAll(charMap[i][0], charMap[i][1]);
  }
  return text;
}

function main() {
  const inputElement = document.getElementById("inputElement");
  const outputElement = document.getElementById("outputElement");
  
  inputElement.addEventListener("input", () => {
    outputElement.innerHTML = convert(inputElement.value);
  });
}

document.addEventListener("DOMContentLoaded", main);