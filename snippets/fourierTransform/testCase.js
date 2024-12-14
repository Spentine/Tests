import { Complex } from "./complexNumbers.js";

function makeArray(len) {
  const arr = [];
  
  for (;len;len--) {
    arr.push(new Complex(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ));
  }
  
  return arr;
}

export { makeArray };