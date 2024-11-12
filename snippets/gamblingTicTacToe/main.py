from game import Gambling_TTT
from bot import choose_move
from wrapper import Lockeb_Bot_Wrapper
import json

def simulate_game(turn=False, printing=False, end_print = True):
  game = Gambling_TTT()
  if turn:
    game.switch_turn()
  lockeb_bot = Lockeb_Bot_Wrapper()
  end = None
  
  game_data = {"moves": [], "turn": game.turn, "winner": None}

  if printing:
    print(game)

  while (end == None):
    # if (game.turn == 0):
    #   row = int(input("   row >> "))
    #   column = int(input("column >> "))
    # else:
    #   move = choose_move(game, 8)
    #   row = move[0][0]
    #   column = move[0][1]
    #   print(f"Bot Row: {row}")
    #   print(f"Bot Column: {column}")
    #   print(f"Win Chance: {move[1]}")
    
    if (game.turn == 0):
      move = choose_move(game, 3)
    else:
      move = lockeb_bot.choose_move(game)
      
    row = move[0][0]
    column = move[0][1]
    
    if printing:
      print(f"Bot Row: {row}")
      print(f"Bot Column: {column}")
      print(f"Win Chance: {move[1]}")
    
    move_result = game.play_turn(row, column)
    
    game_data["moves"].append([
      row, column, move_result["type"]
    ])
    
    if printing:
      print(game)
    
    end = game.verify_end()
  
  game_data["winner"] = end
  
  if end_print:
    print(f"Player {end + 1} wins")
  
  return game_data

def collect_data():
  results = open("results.txt", "w")
  for i in range(1000000):
    print(f"Game #{i + 1}")
    game_data = simulate_game(True, True, True)
    results.write(json.dumps(game_data) + "\n")

def evaluate_start(depth):
  game = Gambling_TTT()
  game.players = [0.2, 0.4]
  
  print(f"Search Depth: {depth}")
  
  move = choose_move(game, depth)
  print(f"Bot Row: {move[0][0]}")
  print(f"Bot Column: {move[0][1]}")
  print(f"Win Chance: {move[1]}")

evaluate_start(24)
# collect_data()
# evaluate_start(3)