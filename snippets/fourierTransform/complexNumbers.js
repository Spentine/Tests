// Spentine's Complex Number Implementation
// Only made for DFT and FFT

class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
  
  // (a + bi) + (c + di)
  // = (a + b) + i(b + d)
  static add(x, y) {
    return new Complex(
      x.re + y.re, 
      x.im + y.im
    );
  }
  
  add(x) {
    this.re += x.re;
    this.im += x.im;
    return this;
  }
  
  static sub(x, y) {
    return new Complex(
      x.re - y.re,
      x.im - y.im
    );
  }

  // (a + bi) * (c + di)
  // = (ac - bd) + i(ad + bc)
  static mul(x, y) {
    return new Complex(
      x.re * y.re - x.im * y.im,
      x.re * y.im + x.im * y.re
    );
  }
  
  mul(x) {
    const r = this.re * x.re - this.im * x.im;
    this.im = this.re * x.im + this.im * x.re;
    this.re = r;
    return this;
  }

  // e^(-2ipit)
  // = cos 2pit - i sin 2pit
  static r(t) {
    return new Complex(
      Math.cos(2 * Math.PI * t),
      - Math.sin(2 * Math.PI * t)
    );
  }
  
  static zero() {
    return new Complex(0, 0);
  }
  
  static scale(x) {
    return new Complex(x, 0);
  }
  
  static clone(x) {
    return new Complex(
      x.re,
      x.im
    );
  }
}

export { Complex };