import readLex from "./readlextwo.json" with {type: "json"};

function getMostCommonCharacters() {
  const characters = {};
  readLex.forEach((i) => {
    const word = i[1];
    for (let i of word) {
      if (characters[i]) {
        characters[i]++;
      } else {
        characters[i] = 1;
      }
    }
  });
  return characters;
}

function sortByCommon(data) {
  const map = [];
  const keys = Object.keys(data);
  keys.forEach((i) => {
    map.push([i, data[i]]);
  });
  map.sort((a, b) => b[1] - a[1]);
  return map;
}

function order() {
  const common = sortByCommon(getMostCommonCharacters());

  console.log(common);

  var s = "";
  common.forEach(pair => {
    s += "\n" + pair[0] + "\t" + pair[1];
    s += pair[0];
  });
  console.log(s);
}

function filterWords(allowedCharacters) {
  const filtered = readLex.filter(word => {
    var w = false;
    var v = false;
    for (let i of word[1]) {
      // if (!allowedCharacters.includes(i)) return false;
      w = w || (i === "𐑑");
      v = v || (i === "𐑐");
    }
    return w && v;
  });
  filtered.sort((a, b) => b[1].length - a[1].length);
  return filtered;
}

function displayWords(fWords) {
  var s = "";
  fWords.forEach(i => {
    s += "\n" + i[1] + "\t(" + i[0] + ")";
  });
  console.log(s);
}

displayWords(filterWords("𐑦𐑑𐑩𐑕𐑯𐑤𐑒𐑛𐑟𐑮𐑪"));