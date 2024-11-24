import { Complex } from "./complexNumbers.js";

// inverse fourier transform
function ivt(input) {
  const output = [];
  
  for (let i=0; i<input.length; i++) {
    const sum = Complex.zero();
    for (let j=0; j<input.length; j++) {
      sum.add(Complex.mul(
        input[j], 
        Complex.r(i * j / input.length)
      ));
    }
    output.push(sum);
  }
  
  return output;
}

export { ivt };