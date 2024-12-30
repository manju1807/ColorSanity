import * as fs from "node:fs";
import * as path from "node:path";

interface Gradient {
	name: string;
	colors: string[];
}

function verifyGradients(gradients: Gradient[]) {
	// Create a map of color combinations
	const colorMap = new Map<string, string[]>();

	// Function to create a unique key for colors
	const createColorKey = (colors: string[]): string =>
		[...colors].sort().join("|").toLowerCase();

	// Check for duplicates and variants
	gradients.forEach((gradient) => {
		const colorKey = createColorKey(gradient.colors);
		if (!colorMap.has(colorKey)) {
			colorMap.set(colorKey, []);
		}
		colorMap.get(colorKey)?.push(gradient.name);
	});

	// Verify no duplicates exist
	console.log("Verification Results:");
	console.log("--------------------");
	console.log(`Total gradients: ${gradients.length}`);
	console.log(`Unique color combinations: ${colorMap.size}`);

	// Check for any remaining duplicates
	let hasIssues = false;
	colorMap.forEach((names, colors) => {
		if (names.length > 1) {
			console.log("\nDuplicate color combination found:");
			console.log(`Colors: ${colors}`);
			console.log(`Used by: ${names.join(", ")}`);
			hasIssues = true;
		}
	});

	// Check for variant naming consistency
	const variantGradients = gradients.filter((g) =>
		g.name.includes("Variant"),
	);
	if (variantGradients.length > 0) {
		console.log("\nChecking variant naming consistency:");
		variantGradients.forEach((gradient) => {
			console.log(`Found variant: ${gradient.name}`);
			hasIssues = true;
		});
	}

	if (!hasIssues) {
		console.log("\nNo issues found! The gradients are clean and unique.");
	}

	// Verify alphabetical sorting
	const isSorted = gradients.every(
		(gradient, i) =>
			i === 0 || gradient.name.localeCompare(gradients[i - 1].name) >= 0,
	);

	console.log(
		`\nAlphabetical sorting: ${isSorted ? "Correct" : "Incorrect"}`,
	);
}

// Run verification
try {
	const inputPath = path.join(__dirname, "cleaned-gradients.json");
	const gradients: Gradient[] = JSON.parse(
		fs.readFileSync(inputPath, "utf8"),
	);
	verifyGradients(gradients);
} catch (error) {
	console.error(
		"Error verifying gradients:",
		error instanceof Error ? error.message : error,
	);
	process.exit(1);
}
