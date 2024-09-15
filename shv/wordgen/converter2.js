import readLex from "./readlexmin.json" with {type: "json"};

const shawAssociation = [];
const keys = Object.keys(readLex);
for (let i=0; i<keys.length; i++) {
  const words = readLex[keys[i]];
  words.forEach(word => {
    shawAssociation.push([keys[i], word.Shaw]);
  });
}

console.log(JSON.stringify(shawAssociation));

