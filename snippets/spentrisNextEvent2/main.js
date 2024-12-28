import { gaEventHandler } from "./nextEvent.js";

const ga = new gaEventHandler(0, 1, 10, 2, 0);

function runEvents(events) {
  for (let i of events) {
    let v = null;
    if (i === "n") {
      v = ga.next();
    } else {
      v = ga.skip();
    }
    console.log(v);
    if (v.action === "finish") break;
  }
}

runEvents("nnnnnnsnssnnnnnn");