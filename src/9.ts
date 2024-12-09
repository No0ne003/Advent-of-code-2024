import fs from "fs";

const input = fs
	.readFileSync("input.txt", "utf-8")
	.split("")
	.filter((char) => char !== "\n");

function p1(chars: string[]) {
	let map: (number | string)[] = [];
	let k = 0;
	let fileId = 0;

	for (const char of chars) {
		if (k % 2 === 0) {
			for (let j = 0; j < Number(char); j++) {
				map.push(fileId);
			}
			fileId++;
		} else {
			for (let j = 0; j < Number(char); j++) {
				map.push(".");
			}
		}
		k++;
	}

	let res: (number | string)[] = [];
	for (let i = 0; i < map.length; i++) {
		if (map[i] !== ".") {
			res.push(map[i]);
			map[i] = ".";
		} else {
			const rem = map.findLast((x) => x !== ".");
			if (rem !== undefined && typeof rem === "number") {
				res.push(rem);
				map[map.lastIndexOf(rem)] = ".";
			}
		}
	}

	const v = res.map((x) => (typeof x === "number" ? x : 0));

	let c1 = 0;
	for (let k = 0; k < v.length; k++) {
		c1 = c1 + k * v[k];
	}

	console.log(c1);
}

p1(input);
