import fs from "fs";

const input = fs
	.readFileSync("input.txt", "utf-8")
	.trim()
	.split(" ")
	.map(Number);

let blinked = 0;

function afterBlink(rocks: number[]) {
	const nextRocks: number[] = [];

	for (const rock of rocks) {
		const rockString = rock.toString();
		if (rock === 0) {
			nextRocks.push(1);
		} else if (rockString.length % 2 === 0) {
			const halfLength = Math.ceil(rockString.length / 2);
			const [x1, x2] = [
				rockString.slice(0, halfLength),
				rockString.slice(halfLength),
			];
			nextRocks.push(Number(x1), Number(x2));
		} else {
			nextRocks.push(rock * 2024);
		}
	}

	blinked++;
	console.log(`Blink count: ${blinked}`);
	console.log(`Rocks after blink:`, nextRocks);

	if (blinked < 25) {
		afterBlink(nextRocks);
	} else {
		console.log(`Total rocks after ${blinked} blinks: ${nextRocks.length}`);
	}
}

afterBlink(input);
