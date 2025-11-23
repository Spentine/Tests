const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

/*
  brute force conditions
  - if there is a grid square with only one empty square u must go there
  - if it is only possible to move towards completely opposite directions it failed
  - must only reach the end if it's the last move
  
  grid storage (bigint)
    # # # # # # # # #
    # 0 1 2 3 4 5 6 #
    # 7 8 9 a b c d #
    # e f g h i j k #
    # l m n o p q r #
    # s t u v w x y #
    # z A B C D E F #
      G H I J K L M #
    # # # # # # # # #
  0b###########MLKJIHG0#FEDCBAz##yxwvuts##rqponml##kjihgfe##dcba987##6543210##########
  
  directional storage
    0bUDLR
*/

function printBoard(board) {
  let out = "";
  let cur = 1n<<10n;
  for (let i=1; i<8; i++) {
    for (let j=0; j<7; j++) {
      out += (board & cur) ? "# " : ". ";
      cur <<= 1n;
    }
    cur <<= 2n;
    out += "\n";
  }
  console.log(out);
}

let desc;
const ending = 1n<<64n;

/**
 * @param board {number} the board position
 * @param number {number} the position of the head
 * @param index {number} the index of the valid directions
 * 
 * @returns {number} the total number of paths
 */
function possibleCombinations(board, position, index) {
  // printBoard(board);
  if (position === ending) { // ending check
    return Number(index === 48); // make sure it was the last move
  }
  
  let dir = 0b1111;
  
  // get neighbors
  const U = position >> 9n;
  const D = position << 9n;
  const L = position >> 1n;
  const R = position << 1n;
  
  // filter out positions
  if (board & U) dir &= 0b0111;
  if (board & D) dir &= 0b1011;
  if (board & L) dir &= 0b1101;
  if (board & R) dir &= 0b1110;
  
  // opposite position check
  if (
    dir === 0b0011 ||
    dir === 0b1100 ||
    dir === 0 // no moves
  ) return 0;
  
  // one available move check
  
  /**
   * @param p - the position
   * @param v - the direction
   */
  const oneAvailable = (p, v) => {
    if (
      (dir & v) &&
      ( Boolean(board & (p << 9n)) +
        Boolean(board & (p >> 9n)) +
        Boolean(board & (p >> 1n)) +
        Boolean(board & (p << 1n)) === 3)
    ) dir = dir & v; // must move in that direction
  };
  
  oneAvailable(U, 0b1000);
  oneAvailable(D, 0b0100);
  oneAvailable(L, 0b0010);
  oneAvailable(R, 0b0001);
  
  dir = dir & desc[index];
  
  const checkDirection = (p, v) => {
    if (!(dir & v)) return 0;
    return possibleCombinations(
      board | p, p, index + 1
    );
  };
  
  const total = (
    checkDirection(U, 0b1000) +
    checkDirection(D, 0b0100) +
    checkDirection(L, 0b0010) +
    checkDirection(R, 0b0001)
  );
  
  return total;
}

function convertDirections(n) {
  const desc = [];
  const map = {
    "U": 0b1000,
    "D": 0b0100,
    "L": 0b0010,
    "R": 0b0001,
    "?": 0b1111
  };
  for (const char of n) {
    desc.push(map[char]);
  }
  return desc;
}

function gridPath(n) {
  desc = convertDirections(n);
  const board = ( // fill in board
    0b111111111n |
    (0b100000011n << 9n) | // player is on the very right
    (0b100000001n << 18n) |
    (0b100000001n << 27n) |
    (0b100000001n << 36n) |
    (0b100000001n << 45n) |
    (0b100000001n << 54n) |
    (0b100000000n << 63n) |
    (0b111111111n << 72n)
  );
  return possibleCombinations(board, 1n<<10n, 0);
}

// rl.on('line', function (n) {
//   console.log(gridPath(n));
//   rl.close();
// });

function test() {
  const t = performance.now();
  const tle = {
    "???R????????L???????????????????????????????????": 16078,
    "?????????????????????????????R???????????R??????": 1764,
    "????????????????????????????????????????????????": 88418,
  };
  const times = [];
  let last;
  let curr;
  for (const testCase in tle) {
    last = performance.now();
    console.log(gridPath(testCase));
    curr = performance.now();
    times.push(curr - last);
  }
  console.log("-----");
  for (const time of times) {
    console.log(time);
  }
}

test();