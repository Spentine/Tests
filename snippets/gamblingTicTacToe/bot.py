# Gambling Tic-Tac-Toe Classical AI NegMax Implementation
# Created by Spentine

from game import Gambling_TTT
from copy import deepcopy

# I am choosing not to use bitwise operations because this is Python

# generates all the possible moves from a game
# item 1.1.1: resultant board state
# item 1.1.2: probability of occurrence
# item 1.2.1: resultant board state
# item 1.2.2: probability of occurrence
# item 2: causative move

lookup_table = {}

def all_moves(game):
  # array for possible games
  moves = []
  
  # for each position
  for i in range(3):
    for j in range(3):
      # check value
      value = game.board[i][j]
      
      if value == -1: # if it's empty
        # game state for next player
        game_result = deepcopy(game)
        game_result.board[i][j] = game.turn
        game_result.players[game.turn] = min(game.players[game.turn] + 0.1, 1)
        game_result.switch_turn()
        
        moves.append(((
          (game_result, 1),
        ), (i, j)))
      elif value == 1 - game.turn: # if it's the opponent's tile
        steal_chance = game.players[game.turn]
        results = []
        
        # consider the steal if it's possible
        if steal_chance != 0:
          game_result = deepcopy(game)
          game_result.board[i][j] = game.turn
          game_result.players[game.turn] -= 0.1
          game_result.switch_turn()
          
          results.append((
            game_result, steal_chance, 
          ))
        
        # consider the failure if it's possible
        if steal_chance != 1:
          game_result = deepcopy(game)
          game_result.players[game.turn] = min(steal_chance + 0.1, 1)
          game_result.switch_turn()
          
          results.append((
            game_result, 1 - steal_chance
          ))
        
        # add to result after bringing in position
        results = (tuple(results), (i, j))
        moves.append(results)
  
  return moves

def recursion(game, depth):
  # check if already in lookup table
  game_hash = hash(game)
  if game_hash in lookup_table:
    lookup = lookup_table[game_hash]
    # if it's of sufficient depth
    if lookup[1] >= depth:
      return (None, lookup[0])
  
  # check for opponent win
  end = game.verify_end([1 - game.turn])
  # if the opponent won
  if end == 1 - game.turn:
    # 0% chance of winning, no move
    return (None, 0)
  
  if depth == 0:
    # 50% chance of winning (don't know), no move
    return (None, 0.5)
  
  # generate all possible moves
  moves = all_moves(game)
  
  # best position chance
  best_position = (None, 0)
  
  for move in moves:
    win_chance = 0
    resultant_states = move[0]
    position = move[1]
    
    # evaluate the win chance based off of the resulting positions
    for state in resultant_states:
      # the chance to win is the opposite of the opponent's chance to lose
      win_chance += (1 - recursion(state[0], depth-1)[1]) * state[1]
    
    # if it's better than what has been searched
    if (win_chance > best_position[1]):
      # if it's 100% win chance
      if (win_chance == 1):
        lookup_table[game_hash] = (1, depth)
        return (position, win_chance)
      
      # update best position
      best_position = (position, win_chance)
  
  lookup_table[game_hash] = (best_position[1], depth)
  return best_position

def choose_move(game, depth):
  global lookup_table
  lookup_table = {}
  return recursion(game, depth)