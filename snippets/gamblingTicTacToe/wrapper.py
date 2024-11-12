# Created by Spentine to hook the bots together

from game import Gambling_TTT
from lockebBot import Bot
from Module4 import top, mid, low
from copy import deepcopy

bot_board = [top, mid, low]
assignment_map = {-1: " ", 0: "X", 1: "O"}
row_map = {"top": 0, "mid": 1, "low": 2}

def find_difference(a, b):
  for x in range(3):
    for y in range(3):
      if (a[x][y] != b[x][y]):
        return (x, y)
  print(a, b)
  return None

def force_first(game):
  for x in range(3):
    for y in range(3):
      tile = game.board[x][y]
      chance = game.players[1]
      if tile == -1:
        return (x, y)
      elif tile == 0 and chance != 0:
        return (x, y)
  return None

class Lockeb_Bot_Wrapper:
  def __init__(self):
    # initialize bot
    self.bot = Bot(20, 100)
  
  def set_state(self, game):
    # set board state
    for x in range(3):
      for y in range(3):
        bot_board[x][y] = assignment_map[game.board[x][y]]
    
    # set chance
    self.bot.chance = game.players[1] * 100
  
  def choose_move(self, game):
    self.set_state(game)
    
    board_copy = deepcopy(bot_board)
    
    self.bot.last_decision = None
    self.bot.BotMove()
    
    if self.bot.last_decision == None: # did not steal
      # print("placing tile")
      # find the difference between the boards
      difference = find_difference(bot_board, board_copy)
      
      if difference == None: # bot did not move
        print("LOCKEB_BOT DID NOT DECIDE, FORCING FIRST")
        forced = force_first(game)
        return (forced, None)
      else: # bot chose a move
        return (difference, None)
    else: # tried to steal
      # print("tried to steal")
      decision = self.bot.last_decision
      return ((row_map[decision[0]], decision[1]), None) # return position