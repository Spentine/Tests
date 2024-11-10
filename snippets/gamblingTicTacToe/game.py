# Gambling Tic-Tac-Toe
# Created by Spentine
# Idea stolen

import random

# for printing to console
board_format_string = '''
{board[0][0]} | {board[0][1]} | {board[0][2]}
  |   |
--+---+--
  |   |  
{board[1][0]} | {board[1][1]} | {board[1][2]}
  |   |
--+---+--
  |   |  
{board[2][0]} | {board[2][1]} | {board[2][2]}
Player 1 Probability: {probability[0]}
Player 2 Probability: {probability[1]}
'''

# replacement when printing
replacement = {-1: " ", 0: "X", 1: "O"}

# convert board to stringified version with replacement map
conversion = lambda board: [
  [replacement[y] for y in x] for x in board
]

# all possible win positions
win_positions = [
  [(0, 0), (1, 0), (2, 0)],
  [(0, 1), (1, 1), (2, 1)],
  [(0, 2), (1, 2), (2, 2)],
  [(0, 0), (0, 1), (0, 2)],
  [(1, 0), (1, 1), (1, 2)],
  [(2, 0), (2, 1), (2, 2)],
  [(0, 0), (1, 1), (2, 2)],
  [(0, 2), (1, 1), (2, 0)],
]

class Gambling_TTT:
  def __init__(self):
    # create board
    self.board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
    
    # create probabilities
    # 0 = 0%, 1 = 100%
    self.players = [1, 1]
    
    # set turn
    self.turn = 0 # 0 or 1
  
  def switch_turn(self):
    # 0 -> 1, 1 -> 0
    self.turn = 1 - self.turn
  
  # self.board[row][column] will be the target
  def play_turn(self, row, column):
    if self.board[row][column] == -1:
      # board position vacant
      
      # set the tile to the current player
      self.board[row][column] = self.turn
      
      # increase probability with clamp
      self.players[self.turn] = min(self.players[self.turn] + 0.1, 1)
      
      self.switch_turn()
      
      # success
      return True
    else:
      # board position occupied
      
      # if board position occupied by self
      if self.board[row][column] == self.turn:
        # failure
        return False
      
      # whether the opponent's tile will be stolen
      steal = random.uniform(0, 1) < self.players[self.turn]
      
      if steal:
        # set the tile to the current player
        self.board[row][column] = self.turn
        
        # decrease probability
        self.players[self.turn] = self.players[self.turn] - 0.1
        
      else:
        # increase probability
        self.players[self.turn] = min(self.players[self.turn] + 0.1, 1)
      
      self.switch_turn()
      
      # success
      return True
  
  def verify_end(self, check=[0, 1]):
    # for each player
    for player in check:
      # for each win position
      for win_position in win_positions:
        # current win state
        win = True
        for position in win_position:
          # if it's not the player
          if (not self.board[position[0]][position[1]] == player):
            win = False
            break
        
        # if the player won
        if win:
          return player
    
    return None
  
  def __str__(self):
    # format board with values
    formatted_board = conversion(self.board)
    
    # format string with board
    return board_format_string.format(board=formatted_board, probability=self.players)
  
  def __hash__(self):
    # simply appends everything together
    return hash(str(self.board) + str(self.players) + str(self.turn))