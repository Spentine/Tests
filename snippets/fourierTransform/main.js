// Spentine 20241123

// This program was created solely for the sake of learning.
// There are definitely faster, more efficient, and versatile programs.

import { Complex } from "./complexNumbers.js";
import { dft } from "./dft.js";
import { ivt } from "./ivt.js";
// idk why it's not working
// import { fft } from "./fft.js";


const x = [
  Complex.zero(),
  Complex.zero(),
  Complex.zero(),
  new Complex(1.5, -3),
  Complex.zero(),
  Complex.zero(),
  new Complex(1, 2),
  Complex.zero(),
];

/*
const x = [
  new Complex(1, 2),
  new Complex(3, 4),
];
*/

console.log(x);

const i = ivt(x);
console.log(i);

console.log(dft(i));
// console.log(fft(i));