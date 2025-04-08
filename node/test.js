function fibonacci(x) {
  if (x === 0 || x === 1) {
    return 1;
  } else {
    return fibonacci(x - 1) + fibonacci(x - 2);
  }
}

// print fibonacci numbers from 1 to 8
for (var i = 1; i <= 8; i++) {
  console.log(fibonacci(i));
}