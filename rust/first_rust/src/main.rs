/*
    Spentine's Rust Learning Session (10 November 2024)
*/

fn main() {
    // == intro ==
    
    println!("Hello, world!"); // ! is a macro
    
    let mut x = 123; // mut means mutable
    println!("The value of x is {x}"); // {} specifies variables and stuff
    x = 456;
    println!("The value of x is now {x}");
    
    // const will never be mutable
    // always specify the type
    const SECOND_TO_DAY: u32 = 60 * 60 * 24;
    
    // == shadowing ==
    
    x = 789;
    { // scoping
        let x = 2 * SECOND_TO_DAY; // shadows outer x
        println!("Inner-scoped x is {x}");
    }
    println!("Outer-scoped x is now {x}");
    
    // use this becuase you can't mutate a variable's type
    let chars = "abc";
    let chars = chars.len(); // shadows chars by creating a new variable
    
    println!("There are {chars} characters in chars (well not anymore)");
    
    // == types ==
    
    // u8, u16, u32, u64, u128
    let mut unsigned_byte: u8 = 255;
    
    // i8, i16, i32, i64, i128
    let mut signed_byte: i8 = 63;
    
    // floats exist but only f32 and f64
    
    // wrapping causes the program to panic and die
    // use wrapping_* methods if you want to wrap omg
    
    // unsigned_byte = unsigned_byte + 1;
    // signed_byte = signed_byte + 1;
    
    unsigned_byte = unsigned_byte - 128;
    signed_byte = signed_byte - 127; // you can't subtract 128 because it is out of range of i8
    
    println!("Unsigned byte: {unsigned_byte}");
    println!("Signed byte: {signed_byte}");
    
    // bool
    let t = true;
    let f = false;
    
    // str / char
    let some_string = "double quotes";
    let some_char   = 's'; // single quotes
    
    // characters use UTF-8
    println!("True: {t}, False: {f}, String: {some_string}, Char: {some_char}");
    
    // tuple (cannot change size)
    let t: (i32, f32, u8) = (1234, 0.1, 128); // optional type annotations
    
    // destructuring
    let (x, y, z) = t;
    
    println!("x = {x}, y = {y}, z = {z}");
    
    // you can also just use tuple.index
    let a = t.0;
    let b = t.1;
    let c = t.2;
    
    println!("a = {a}, b = {b}, c = {c}");
    // println!("t.0 = {t.0}, t.1 = {t.1}, t.2 = {t.2}"); you can't do this
    
    // the number of elements will probably not change
    let some_array = ["single", "double", "triple"];
    
    let a = some_array[0]; // access with array[index] now
    println!("a: {a}");
    
    let some_array: [i8; 3] = [100, 50, -100]; // type annotations
    
    let a = some_array[0];
    let b = some_array[1];
    let c = some_array[2];
    
    println!("i8 array: [{a}, {b}, {c}]"); // cannot print arrays directly either huh
    
    let repeated_array = [0; 5]; // [0, 0, 0, 0, 0]
    
    let a = repeated_array[3];
    println!("repeated array: {a}");
    
    here_now(); // alr next one
}

fn parameter(x: i8) {
  println!("Parameter printed {x}");  
}

fn here_now() { // 3.3
    
    // == functions ==
    
    println!("Now in here_now()");
    
    parameter(8);
    parameter(3);
    
    // == return values ==
    
    let y = {
       let x = 0;
       // DO NOT put a semicolon or it becomes a statement
       x + 1 // returns 1 and makes the whole thing return 1
    };
    println!("y = {y}");
    
    let x = plus_one(5);
    println!("5 + 1 = {x}");
    
    let x = what_returns(x); // 6 + 2
    println!("6 + 2 = {x}");
    
    here_now_two();
}

fn plus_one(x: i8) -> i8 {
    // NOT
    // x + 1;
    
    // IS
    x + 1
}

// return not needed when it is the last expression
fn what_returns(x: i8) -> i8 {
    // this does NOT work because it evaluates (x + 2) (x + 3)
    /*
    
    x + 2
    x + 3
    
    */
    
    x + 2
}

fn collatz(x: i32) -> i32 {
    // you do not need () around your if statements
    if x % 2 == 0 {
        return x / 2;
    } else {
        return x * 3 + 1;
    }
}

fn here_now_two() {
    // idk how to make loops yet bc i'm on 3.5
    // i can do recursion but this is easier
    let x = (
        collatz(1),
        collatz(2),
        collatz(3),
        collatz(4),
        collatz(5),
        collatz(6),
        collatz(7),
        collatz(8),
        collatz(9),
        collatz(10),
    );
    
    // it pains me to do this
    let (a, b, c, d, e, f, g, h, i, j) = x;
    
    println!("{a}, {b}, {c}, {d}, {e}, {f}, {g}, {h}, {i}, {j}");
    
    // this does NOT work because rust isnt gonna babysit you and convert it for you
    /*
    let x = 1
    if x {
        ...
    }
    */
    
    // the types that are returned MUST be the same
    let another_if_construction = if true { "yes" } else { "no" };
    println!("{another_if_construction}");
    
    // ok now i know how to make loops
    let mut current_number: i32 = 19; // 27 takes too long omg
    println!("current number: {current_number}");
    loop {
        current_number = collatz(current_number);
        println!("current number: {current_number}");
        if current_number == 1 {
            break;
        }
    }
    
    // loops must begin with single quote
    let mut x = 0;
    'outside: loop {
        let mut y = 0;
        // 'inside: loop {
        loop { // unused labels get a warning
            y += 1;
            if x * y == 15 {
                println!("{x} times {y} = 15");
                break 'outside;
            }
            if y == 3 {
               break; // breaks closest loop 
            }
        }
        x += 1;
    }
    
    let mut x = 0;
    while x != 5 { // while loops also work
        println!("{x}");
        x += 1;
    }
    
    let mut x = 0;
    let number = 26;
    let mut found = false;
    // loop names can also be used for while loops
    'outside_while: while x < 10 {
        let mut y = 0;
        while y < 10 {
            if x * y == number {
                found = true;
                println!("{x} times {y} = {number}");
                break 'outside_while;
            }
            y += 1; 
        }
        x += 1;
    }
    
    if !found {
        println!("Couldn't find two numbers x, y < 9 where xy = {number}");
    }
    
    let array = ["this", "is", "the", "rust", "programming", "language"];
    for word in array {
        println!("word: {}", word); // forgot to mention u can do this with println
    }
    
    for number in 1..4 { // [1, 4) = 1, 2, 3
        println!("{number}");
    }
    
    here_now_three();
}

fn here_now_three() { // 4.1
    let mut s = String::from("mutable string"); // it is now a mutable string
    s.push_str("s are cool"); // appends a literal to the string
    println!("{s}");
    
    // string literals are fast and efficient
    // it is mutable and growable
    
    // DO NOT do this becuase rust will drop it. check 4.1 in the book
    /*
    let s1 = String::from("uh oh");
    let s2 = s1; // s1 gets dropped :(
    
    println!("{s1}"); // compiler error
    */
    // rust is trying to not free the variable twice omg
    
    // no such things as shallow copies, instead it's a move
    
    let mut cloned_s = s.clone(); // it actually does get copied
    cloned_s.push_str(" and im");
    println!("{cloned_s}{s}");
    
    ownership_drop(s);
    ownership_drop(cloned_s);
    
    let s1 = String::from("transfer");
    let s2 = ownership_transfer(s1); // s1 invalid
    
    let (s2, size) = get_length(s2);
    println!("{s2} ({size} bytes)");
    
    here_now_four();
}

fn ownership_drop(some_string: String) {
   println!("time to drop the string with \"{some_string}\"");
   // some_string goes out of bounds and dies 
}

fn ownership_transfer(mut some_string: String) -> String { // deletes s1
   some_string.push_str(" ownership");
   some_string // transfers ownership
}

fn get_length(the_string: String) -> (String, usize) {
    let length = the_string.len();
    (the_string, length)
    // thx chatgpt
    // DO NOT do this:
    /*
    (the_string, the_string.len())
    */
    // the_string gets moved away into get_length().0 and then the_string becomes invalid for the_string.len().
    // (the_string.len(), the_string) does work though because it doesn't get moved away omg
}

fn here_now_four() { // 4.2
    let mut s1 = String::from("dont kill me pls,, ");
    let len = get_length_ref(&s1); // creating a reference is called "borrowing"
    println!("length of str: {len}");
    
    // u cannot modify shit you are borrowing!
    /*
    let lmao = &s1.push_str(" im fucking up the string lmao");
    */
    
    // nah nvm u can do it if it's mutable lmao
    (&mut s1).push_str("i cant fuck up the string anymore nooo!!");
    
    // mutable ofc
    s1.push_str(" lmao im safe phew!!!");
    println!("{s1}");
    
    // u cannot have two mutable references omg
    /*
    ((&mut s1), (&mut s1))
    */
    // this would mess everything up
    // if u have a mutable reference there cannot be any other references
    
    let r1 = &s1;
    let r2 = &s1.len();
    
    println!("{r1} has length {r2}"); // this works
    // the compiler sees r1 and r2 aint gonna be used anymore
    
    let r3 = &mut s1; // no error bc r1 and r2 are not used
    r3.push_str(" ok cool");
    
    // == slices ==
    
    let s = String::from("derusting");
    let slice = &s[2..6]; // slice
    let slice2 = &s[2..]; // all the way to the end
    let slice3 = &s[..6]; // all the way from the start
    
    println!("{slice}, {slice2}, {slice3}");
    
    // &str works for both &String and &str
    // &String only works for &String
    
    here_now_five();
}

fn get_length_ref(reference: &String) -> usize {
    reference.len()
} // the reference goes out of scope but doesnt really own the string so it is safe

fn here_now_five() { // 5.1
    let game1 = build_nim(12);
    let game2 = Nim {
        coins: 15,
        ..game1 // use the rest of the values from game1
    };
    
    println!("game1: {}, {} ; game2: {}, {}",
        game1.coins,
        game1.turn,
        game2.coins,
        game2.turn,
    );
    
    let pos = Position(1, 2);
    println!("pos: {}, {}", pos.0, pos.1);
    
    // DO NOT compare this omfg
    /*
    let res = AlwaysEqual;
    let res2 = AlwaysEqual;
    
    println!("res == res2? {}!", res == res2);
    */
    
    // IF you want to do this then add #[derive(Debug)] at the beginning
    /*
    println!("built in printing: {game1:?}");
    */
    
    println!("game1 win {}, game2 win {}", nim_win(&game1), nim_win(&game2));
    
    // returns ownership of expressoin value
    /*
    dbg!(&rect1);
    */
    
    println!("game1 win {}, game2 win {}", game1.win(), game2.win()); // IMPLementation method
    // game2.win() is the same as (&game2).win()
    // rust will match the correct kind
}

// struct
struct Nim {
    coins: u8,
    turn: bool,
}

fn build_nim(coins: u8) -> Nim {
    Nim {
        coins, // field init shorthand 
        turn: false,
    }
}

// tuple struct
struct Position(i32, i32); // no names bc verbose / redundant

// unit struct
// struct AlwaysEqual;
// warning it wasnt constructed so im gonna leave it like this

// take last object
fn nim_win(game: &Nim) -> bool {
    game.coins % 4 == 0
}

// IMPLementation
impl Nim { // ALWAYS associated with Nim type
    fn win(&self) -> bool {
        self.coins % 4 == 0
    }
}