import { Complex } from "./complexNumbers.js";
import { dft } from "./dft.js";

// fast fourier transform assuming power of 2 length
function fft(input) {
  // base case
  if (input.length === 1) return [Complex.clone(input[0])];
  
  // error case
  if (input.length === 0) {
    error();
  }
  
  const oddInputs = [];
  const evenInputs = [];
  for (let i=0; i<input.length; i+=2) {
    evenInputs.push(Complex.clone(input[i]));
    oddInputs.push(Complex.clone(input[i+1]));
  }
  
  // factor is e^(-2pi i k / N)
  const accel = Complex.r(1 / input.length);
  const factor = new Complex(1, 0);
  const oddValues = dft(oddInputs);
  const evenValues = dft(evenInputs);
  
  // the odd values are multiplied by accel^k
  // E_k + a^k O_k
  // E_k - a^k O_k
  
  for (let i=0; i<oddValues.length; i++) {
    oddValues[i].mul(factor);
    factor.mul(accel);
  }
  
  const output = [];
  const scale = Complex.scale(1 / input.length);
  
  // construct bottom half of output
  // E_k + f O_k
  for (let i=0; i<evenValues.length; i++) {
    output.push(Complex.add(evenValues[i], oddValues[i]).mul(scale));
  }
  
  // construct top half of output
  // E_k - f O_k
  for (let i=0; i<evenValues.length; i++) {
    output.push(Complex.sub(evenValues[i], oddValues[i]).mul(scale));
  }
  
  return output;
}

export { fft };