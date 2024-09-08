#include <iostream>

void forwardDec(int a); // forward declaration

int countingNumbers(int n) {
  return (n * (n + 1)) / 2; // expressions
}

int main() {
  /*
   * variable declarations and shit
   * [[maybe_unused]] if the variable might not be used
   * but only use it if there is a reason u wont use it
   * otherwise it will tell u u aint using it
   */
  [[maybe_unused]] int a( 10 );
  [[maybe_unused]] double b { 8 };
  [[maybe_unused]] int c, d;
  
  std::cout << "a is equal to " << a << '\n'; // one char so use ' instead of "
  
  c = 5;
  d = 7;
  
  std::cout << "countingNumbers 5 and 7 are " << countingNumbers(5) << " and " << countingNumbers(7) << std::endl;
  
  forwardDec(3);
  
  return 0;
}

void forwardDec(int a) {
  std::cout << "this is a forward declaration" << std::endl << "oh yeah and also " << a << std::endl;
}