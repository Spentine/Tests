// Spentine 20250526
// first java program

import java.util.Scanner;

public class TicTacToe {
  
  public static void main(String[] args) {
    System.out.println("=== Tic Tac Toe by Spentine ==="); // by yours truly
    
    TTT game = new TTT(); // create a new game instance
    Scanner scanner = new Scanner(System.in); // create a scanner for user input
    
    while (game.gameOver() == -1) { // while the game is still ongoing
      System.out.println("Current board:");
      
      // print the current board
      game.printBoard(true);
      
      // get input from the user
      System.out.println("Player " + (game.currentPlayer ? "1" : "2") + "'s turn. Enter row and column (1-3):");
      int row = scanner.nextInt() - 1;
      int col = scanner.nextInt() - 1;
      
      if (!game.playMove(row, col)) {
        System.out.println("Invalid move, try again.");
        continue; // skip to the next iteration
      }
      
      // switch players
      game.currentPlayer = !game.currentPlayer;
    }
    
    // game is over, print the final board
    System.out.println("Final board:");
    game.printBoard(false);
    
    int result = game.gameOver();
    
    if (result == 0) {
      System.out.println("The game is a draw!");
    } else {
      System.out.println("Player " + result + " wins!"); // 1 for player 1, 2 for player 2
    }
    
    scanner.close(); // close the scanner
  }
}

// the actual object
// so idk why java even requires me to make a class with the same name as the file
// but i want a class that is also called tic tac toe but cant have main
class TTT {
  public int[][] board;
  public boolean currentPlayer;
  
  private static final int[][] winningCombinations = {
    {0, 1, 2}, // rows
    {3, 4, 5},
    {6, 7, 8},
    {0, 3, 6}, // columns
    {1, 4, 7},
    {2, 5, 8},
    {0, 4, 8}, // diagonals
    {2, 4, 6}
  };
  
  private static int[] convertTo2D(int index) {
    return new int[] {index / 3, index % 3};
  }
  
  private int getCell(int row, int col) {
    return board[row][col];
  }
  
  public TTT() {
    board = new int[3][3];
    currentPlayer = true; // player 1 starts
  }
  
  /**
   * plays a move on the board
   * @param row the row to play in
   * @param col the column to play in
   * @return true if the move was successful, false if the move was invalid
   */
  public boolean playMove(int row, int col) {
    if (
         row < 0
      || row >= 3
      || col < 0
      || col >= 3
      || board[row][col] != 0
    ) {
      return false; // invalid move
    }
    
    board[row][col] = currentPlayer ? 1 : 2; // player 1 is 1, player 2 is 2
    
    return true;
  }
  
  /**
   * checks if the game is over
   * @return 1 if player 1 wins, 2 if player 2 wins, 0 if the game is a draw, -1 if the game is still ongoing
   */
  public int gameOver() {
    // check for a win
    for (int[] combination : winningCombinations) {
      int[] aPosition = convertTo2D(combination[0]);
      int[] bPosition = convertTo2D(combination[1]);
      int[] cPosition = convertTo2D(combination[2]);
      
      int aValue = getCell(aPosition[0], aPosition[1]);
      int bValue = getCell(bPosition[0], bPosition[1]);
      int cValue = getCell(cPosition[0], cPosition[1]);
      
      if (aValue != 0 && aValue == bValue && bValue == cValue) {
        return aValue; // return the winning player
      }
    }
    
    // check for a draw
    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 3; col++) {
        if (board[row][col] == 0) {
          return -1; // game is still ongoing
        }
      }
    }
    
    return 0; // game is a draw
  }
  
  private char getCellChar(int row, int col) {
    int cell = getCell(row, col);
    if (cell == 0) return ' ';
    return cell == 1 ? 'X' : 'O'; // player 1 is X, player 2 is O
  }
  
  public void printBoard(boolean showCurrentPlayer) {
    System.out.printf(
      "%s | %s | %s\n" +
      "--+---+--\n" +
      "%s | %s | %s\n" +
      "--+---+--\n" +
      "%s | %s | %s\n",
      getCellChar(0, 0), getCellChar(0, 1), getCellChar(0, 2),
      getCellChar(1, 0), getCellChar(1, 1), getCellChar(1, 2),
      getCellChar(2, 0), getCellChar(2, 1), getCellChar(2, 2)
    );
    if (showCurrentPlayer) {
      System.out.println("Current player: " + (currentPlayer ? "1 (X)" : "2 (O)"));
    }
  }
}