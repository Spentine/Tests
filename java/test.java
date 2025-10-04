public class test {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
  
  // make function to computer 1 + 2 + 3 + ... + n
  public static int sumOfNumbers(int n) {
    if (n < 1) return 0;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
}