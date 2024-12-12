import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const grid = input
  .split("\n")
  .filter((x) => x.trim() !== "")
  .map((row) => row.split(""));

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

interface RegionDetailsType {
  key: string;
  area: number;
  perimeter: number;
}

let regionDetails: RegionDetailsType[] = [];

function calculateRegionProperties(
  x: number,
  y: number,
  visited: Set<string>,
  regionKey: string,
) {
  const key = `${x},${y}`;
  if (visited.has(key)) return { area: 0, perimeter: 0 };
  visited.add(key);

  let localArea = 1;
  let localPerimeter = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
      localPerimeter++;
    } else if (grid[nx][ny] !== regionKey) {
      localPerimeter++;
    } else if (!visited.has(`${nx},${ny}`)) {
      const { area, perimeter } = calculateRegionProperties(
        nx,
        ny,
        visited,
        regionKey,
      );
      localArea += area;
      localPerimeter += perimeter;
    }
  }

  return { area: localArea, perimeter: localPerimeter };
}

const visited = new Set<string>();

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    const regionKey = grid[r][c];
    const cellKey = `${r},${c}`;

    if (!visited.has(cellKey)) {
      const { area: regionArea, perimeter: regionPerimeter } =
        calculateRegionProperties(r, c, visited, regionKey);

      regionDetails.push({
        key: regionKey,
        area: regionArea,
        perimeter: regionPerimeter,
      });
    }
  }
}

let total = 0;

regionDetails.forEach(({ area, perimeter }) => {
  const cost = area * perimeter;
  total += cost;
});

console.log("\nTotal cost of all regions:", total);
