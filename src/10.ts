import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const grid = input
	.split("\n")
	.filter((x) => x.trim() !== "")
	.map((x) => x.split("").map((y) => Number(y)));

const directions = [
	[-1, 0], // up
	[0, 1], // right
	[1, 0], // down
	[0, -1], // left
];

let trailheads: string[] = [];

function hike(origin: string, x: number, y: number) {
	if (grid[x][y] === 9) {
		trailheads.push(`${origin} ${y} ${x}`);
	}

	for (const [dr, dc] of directions) {
		const nx = x + dr;
		const ny = y + dc;

		if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
			if (grid[nx][ny] === grid[x][y] + 1) {
				hike(origin, nx, ny);
			}
		}
	}
}

for (let r = 0; r < grid.length; r++) {
	for (let c = 0; c < grid[0].length; c++) {
		if (grid[r][c] === 0) {
			hike(`${r} ${c}`, r, c);
		}
	}
}

console.log(new Set(trailheads).size);
