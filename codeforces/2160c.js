const lines = [
  3,
  0b1100,
  0b110000,
  0b1101011
];

let currentLine = 0;
function readline() {
  return lines[currentLine++];
}

const print = console.log;

/*
1 - yes
11 - yes
101 - yes
111 - no
1001 - yes
1111 - yes
10001 - yes
11011 - yes
10101 - no
11111 - no

rule
- must be palindrome
- if odd:
  - middle value must be 0
  - if the ending bit is 0, remove it and check
*/

'use strict';

function c(n) {
  // remove 0s at the end
  while ((n & 1) === 0 && n !== 0) {
    n >>= 1;
  }
  
  // m = rev(n)
  // b = len(n)
  let b = 0;
  let a = n;
  let m = 0;
  while (a) {
    m = (m << 1) | (a & 1);
    a >>= 1;
    b++;
  }
  
  if ((b & 1) === 0) {
    // x ^ rev(n) symmetric
    return (n === m);
  } else {
    // x ^ rev(n) symmetric
    return (n === m && (n & (1 << (b >> 1))) === 0);
  }
}

const inputCount = Number(readline());
for (let i = 0; i < inputCount; i++) {
  const v = Number(readline());
  
  print(c(v) ? "yes" : "no");
}