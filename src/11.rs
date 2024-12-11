const INPUT: &str = "890 0 1 935698 68001 3441397 7221 27";

fn main() {
    let rocks = INPUT
        .split_whitespace()
        .map(|x| x.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();

    p1(rocks);
}

fn p1(mut rocks: Vec<u64>) -> usize {
    let mut blinked = 0;

    while blinked < 25 {
        let mut new_rocks: Vec<u64> = Vec::new();
        for rock in &rocks {
            let rock_string = rock.to_string();
            if *rock == 0 {
                new_rocks.push(1);
            } else if rock_string.len() % 2 == 0 {
                let half_length = (rock_string.len() + 1) / 2;
                let (x1, x2) = rock_string.split_at(half_length);
                new_rocks.push(x1.parse::<u64>().unwrap());
                new_rocks.push(x2.parse::<u64>().unwrap());
            } else {
                new_rocks.push(rock * 2024);
            }
        }
        rocks = new_rocks;
        blinked += 1;
    }

    println!("Total rocks after {} blinks: {}", blinked, rocks.len());
    rocks.len()
}
