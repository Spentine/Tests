import java.math.BigInteger;

public class bigint {
  public static void main(String[] args) {
    BigInteger n = new BigInteger("20");
    System.out.println("Factorial of " + n + " is " + fact(n));
  }
  
  public static BigInteger fact(BigInteger n) {
    if (n.equals(new BigInteger("0"))) return new BigInteger("1");
    return n.multiply(fact(n.subtract(new BigInteger("1"))));
  }
}
