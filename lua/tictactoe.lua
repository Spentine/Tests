--[[

Spentine
Creation Date: 20250615
Tic Tac Toe

]]--

local board = {
  {0, 0, 0},
  {0, 0, 0},
  {0, 0, 0}
}

local turn = 1

Symbols = {
  [0] = " ",
  [1] = "X",
  [2] = "O"
}

local function boardString()
  local formatted = string.format("%s | %s | %s\n--+---+--\n%s | %s | %s\n--+---+--\n%s | %s | %s",
    Symbols[board[1][1]], Symbols[board[1][2]], Symbols[board[1][3]],
    Symbols[board[2][1]], Symbols[board[2][2]], Symbols[board[2][3]],
    Symbols[board[3][1]], Symbols[board[3][2]], Symbols[board[3][3]]
  )
  return formatted
end

WinStates = {
  {{1, 1}, {1, 2}, {1, 3}},
  {{2, 1}, {2, 2}, {2, 3}},
  {{3, 1}, {3, 2}, {3, 3}},
  {{1, 1}, {2, 1}, {3, 1}},
  {{1, 2}, {2, 2}, {3, 2}},
  {{1, 3}, {2, 3}, {3, 3}},
  {{1, 1}, {2, 2}, {3, 3}},
  {{3, 1}, {2, 2}, {1, 3}}
}

local function checkWin()
  -- loop through players
  for player = 1, 2 do
    -- loop through every win
    for i = 1, #WinStates do
      local win = WinStates[i]
      local won = true
      -- loop through every item
      for j = 1, #win do
        local pos = win[j]
        local boardValue = board[pos[1]][pos[2]]
        -- check board value
        if (boardValue ~= player) then
          won = false
          break
        end
      end
      if (won) then
        return player -- player wins
      end
    end
  end
  -- check whether there are empty spaces
  for i = 1, 3 do
    for j = 1, 3 do
      if (board[i][j] == 0) then
        return -1 -- ongoing
      end
    end
  end
  return 0 -- draw
end

local winState = -1
while (winState == -1) do
  print(boardString())
  print(string.format("Player %i's turn.", turn))
  local valid = false
  local r, c
  while (not valid) do
    io.write("Row Index: ")
    r = io.read("*n")
    io.write("Column Index: ")
    c = io.read("*n")
    -- within bounds
    if ((not (r < 1 or r > 3)) and (not (c < 1 or c > 3))) then
      -- untaken
      if (board[r][c] == 0) then
        valid = true
      end
    end
  end
  board[r][c] = turn
  turn = 3 - turn
  winState = checkWin()
end

print(boardString())
if (winState == 0) then
  print("Draw!")
elseif (winState == 1) then
  print("Player 1 Wins!")
elseif (winState == 2) then
  print ("Player 2 Wins!")
end