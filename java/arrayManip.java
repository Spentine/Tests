/*
 * Spentine 20250528
 * Array Manipulation Practice
 */

public class arrayManip {
  public static void main(String[] args) {
    int[][] value = new int[][]{
      {1, 2, 3, 4},
      {5, 6, 7, 8},
      {9, 10,11,12},
      {13,14,15,16}
    };
    
    value = matrixRotate(value);
    
    System.out.println(matrixToString(value));
  }
  
  static String matrixToString(int[][] matrix) {
    int maxLength = 1;
    final int length = matrix.length;
    final int width = matrix[0].length;
    
    // copy each element to a new matrix
    String[][] stringMatrix = new String[length][width];
    int[][] lengthMatrix = new int[length][width];
    
    for (int i=0; i<length; i++) {
      for (int j=0; j<width; j++) {
        // get values
        final String stringValue = String.valueOf(matrix[i][j]);
        final int lengthValue = stringValue.length();
        
        // set array values
        stringMatrix[i][j] = stringValue;
        lengthMatrix[i][j] = lengthValue;
        
        // update maxLength
        if (lengthValue > maxLength) {
          maxLength = lengthValue;
        }
      }
    }
    
    StringBuilder build = new StringBuilder();
    final int paddingLength = maxLength + 1;
    
    for (int i=0; i<length; i++) {
      for (int j=0; j<width; j++) {
        final String stringValue = stringMatrix[i][j];
        build.append(stringValue);
        
        // padding
        if (j < width-1) { // do not pad for the last value
          final int spaces = paddingLength - lengthMatrix[i][j];
          for (int k=0; k<spaces; k++) {
            build.append(" ");
          }
        }
      }
      
      if (i < length-1) { // do not \n for last line
        build.append("\n");
      }
    }
    
    return build.toString();
  }
  
  static int[][] matrixTranspose(int[][] matrix) {
    final int length = matrix.length;
    final int width = matrix[0].length;
    
    int[][] transposedMatrix = new int[width][length];
    
    for (int i=0; i<length; i++) {
      for (int j=0; j<width; j++) {
        transposedMatrix[j][i] = matrix[i][j];
      }
    }
    
    return transposedMatrix;
  }
  
  static int[][] matrixReverseRows(int[][] matrix) {
    final int length = matrix.length;
    final int width = matrix[0].length;
    
    int[][] reversedMatrix = new int[length][width];
    
    for (int i=0; i<length; i++) {
      for (int j=0; j<width; j++) {
        reversedMatrix[i][width - j - 1] = matrix[i][j];
      }
    }
    
    return reversedMatrix;
  }
  
  static int[][] matrixRotate(int[][] matrix) {
    // they both are not in place so it's not efficient on memory
    final int[][] transposedMatrix = matrixTranspose(matrix);
    final int[][] rotatedMatrix = matrixReverseRows(transposedMatrix);
    
    return rotatedMatrix;
  }
}