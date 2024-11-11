use std::io;

struct CollatzResult {
    print: String,
    length: u32,
}

fn collatz(num: u128) -> u128 {
    if num & 1 == 0 { // divisible by 2
        num >> 1 // divide by 2 (right shift)
    } else {
        num * 3 + 1
    }
}

fn collatz_until_one(mut num: u128, print_track: bool) -> CollatzResult {
    let mut result = if print_track { num.to_string() } else { String::from("") };
    
    let mut count: u32 = 0;
    loop {
        num = collatz(num);
        count += 1;
        
        if print_track {
            result.push_str(", ");
            result.push_str(&num.to_string());
        }
        
        if num == 1 {
            return CollatzResult {
                print: result,
                length: count,
            };
        }
    }
}

fn prompt() {
    println!("Enter starting number:");
    
    let mut input = String::new();
    
    io::stdin()
        .read_line(&mut input)
        .expect("Failure");
    
    let start: u128 = input.trim().parse()
        .expect("Please type a number.");
    
    let result = collatz_until_one(start, true);
    println!("{}", result.print);
    println!("{} iterations", result.length);
}

fn main() {
    prompt();
}
