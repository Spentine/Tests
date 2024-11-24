import { Complex } from "./complexNumbers.js";

// X_k = sum from n=0 to N-1 of x_n e^(-2pi i nk/N)
function dft(input) {
  const output = [];
  const scale = Complex.scale(1 / input.length);
  
  // 0 < k <= N
  for (let k=0; k<input.length; k++) {
    // summation from n to N-1
    const sum = Complex.zero();
    for (let n=0; n<input.length; n++) {
      sum.add(Complex.mul(
        input[n],
        Complex.r(-n * k / input.length)
      ));
    }
    
    // i don't know why but my outputs are scaled
    // this works dont touch it
    sum.mul(scale);
    
    output.push(sum);
  }
  
  return output;
}

export { dft };