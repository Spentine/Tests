import { assertEquals } from "jsr:@std/assert";
import { gaEventHandler } from "./nextEvent.js";

/*
  n: next
  s: skip
*/

const runActions = (ga, actions, expected) => {
  for (let i=0; i<actions.length; i++) {
    const action = actions[i];
    let event;
    if (action === "n") {
      event = ga.next();
    } else {
      event = ga.skip();
      ga.resetGravityTime(); // pretend the block hit the ground
    }
    console.log(i, action, expected[i], event.action[0] + event.time);
    assertEquals(event.action[0], expected[i][0]);
    assertEquals(event.time, Number(expected[i].substring(1)));
  }
}

Deno.test("next() test 1", () => {
  const ga = new gaEventHandler(
    0, // gravOffset
    2, // gravSpeed
    0, // arrOffset
    3, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456
     grav | - # # #
      arr | -  #  #
    event | n n n n
          |    n
  */
  
  runActions(ga, "nnnnn", ["g2", "a3", "g4", "g6", "a6"]);
});

Deno.test("next() test 2", () => {
  const ga = new gaEventHandler(
    0, // gravOffset
    1, // gravSpeed
    1, // arrOffset
    2, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456
     grav | -######
      arr |  # # # 
    event | n n n n
          |    n
  */
  
  runActions(ga, "nnnnn", ["g1", "a1", "g2", "g3", "a3"]);
});

Deno.test("next() test 3", () => {
  const ga = new gaEventHandler(
    0, // gravOffset
    1, // gravSpeed
    1, // arrOffset
    2, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456
     grav | -######
      arr |  # # # 
    event | nnnn
          |  n
  */
  
  runActions(ga, "nnnnn", ["g1", "a1", "g2", "g3", "a3"]);
});

Deno.test("next() test 4", () => {
  const ga = new gaEventHandler(
    1, // gravOffset
    3, // gravSpeed
    2, // arrOffset
    8, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456789abcdefghi
     grav |  #  #  #  #  #  #
      arr |   #       #       #
    event | nn  n  n  n  n  n
          |   n       n       
  */
  
  runActions(ga, "nnnnnnnnn", ["g1", "a2", "g4", "g7", "g10", "a10", "g13", "g16", "a18"]);
});

Deno.test("skip() test 1", () => {
  const ga = new gaEventHandler(
    0, // gravOffset
    2, // gravSpeed
    0, // arrOffset
    3, // arrSpeed
    0  // time
  );
  
  /*
     time | 012345678
     grav | - #x #x #
      arr | -  #  #  
    event | n s  s  
          |    s  s
  */
  
  runActions(ga, "nssss", ["g2", "a3", "g5", "a6", "g8"]);
});

Deno.test("skip() test 2", () => {
  const ga = new gaEventHandler(
    0, // gravOffset
    1, // gravSpeed
    1, // arrOffset
    2, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456
     grav | -######
      arr |  # # # 
    event | nsss
          |  s
  */
  
  runActions(ga, "nssss", ["g1", "a1", "g2", "a3", "g4"]);
});

Deno.test("skip() test 3", () => {
  const ga = new gaEventHandler(
    2, // gravOffset
    3, // gravSpeed
    1, // arrOffset
    4, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456789abc
     grav |   #  x  #x  #
      arr |  #   #   #
    event | n s     s
          |  s   s   s
  */
  
  runActions(ga, "nsssss", ["a1", "g2", "a5", "g8", "a9", "g12"]);
});

Deno.test("skip() test 4", () => {
  const ga = new gaEventHandler(
    2, // gravOffset
    3, // gravSpeed
    0, // arrOffset
    8, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456789abcdefghijklmnopqrstuvwyxz
     grav |   #  #  #  #  # x  #  # x  #  # x  # 
      arr | -       #       #       #       #
    event | n s        s       s       s
          |         s       s       s       s
  */
  
  runActions(ga, "nssssssss", ["g2", "a8", "g11", "a16", "g19", "a24", "g27", "a32", "g35"]);
});

Deno.test("general test 1", () => {
  const ga = new gaEventHandler(
    1, // gravOffset
    2, // gravSpeed
    4, // arrOffset
    3, // arrSpeed
    0  // time
  );
  
  /*
     time | 0123456789abcdef
     grav |  # #x # # # #x #
      arr |     #  #  #  #
    event | ns    n s   s  
          |     n  n  n  n
  */
  
  runActions(ga, "nsnnnsnsn", ["g1", "a4", "g6", "a7", "g8", "a10", "g12", "a13", "g15"]);
});