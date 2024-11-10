from game import Gambling_TTT
from bot import choose_move

game = Gambling_TTT()
end = None

print(game)

while (end == None):
  if (game.turn == 1):
    row = int(input("   row >> "))
    column = int(input("column >> "))
  else:
    move = choose_move(game, 8)
    row = move[0][0]
    column = move[0][1]
    print(f"Bot Row: {row}")
    print(f"Bot Column: {column}")
    print(f"Win Chance: {move[1]}")
  
  game.play_turn(row, column)
  
  print(game)
  
  end = game.verify_end()

print(f"Player {end + 1} wins")