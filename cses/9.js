const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

/*
  ex. 2^0b101010101
  = 2^0b1 (2)
  * 2^0b100 (8)
*/

function calc(n) {
  /*
    compute 2^n % m
    rewrite n = 0b....
    computing 2^2^a is easy
  */
  
  n = BigInt(n);
  
  // handle 2^2^0 case
  const m = 1000000007n; // modulo base
  let r = 1n + (n & 1n); // ret
  
  let v = 2n; // 2^2^i
  for (let i=2n; i<1000000n; i<<=1n) {
    v = (v * v) % m;
    if (n & i)
      r = (r * v) % m; 
  }
  
  return Number(r);
}

rl.on('line', function (n) {
  let r = calc(n);
  console.log(r);
  rl.close();
});