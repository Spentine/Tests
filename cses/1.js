const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (n) {
  sim = String(n);
  n = BigInt(n);
  while (n !== 1n) {
    if (n % 2n === 0n) {
      n /= 2n;
    } else {
      n = 3n * n + 1n;
    }
    sim += " " + String(n);
  }
  console.log(sim);
  rl.close();
});