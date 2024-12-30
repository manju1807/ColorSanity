import * as fs from "node:fs";
import * as path from "node:path";

interface Gradient {
	name: string;
	colors: string[];
}

function cleanupGradients(gradients: Gradient[]): Gradient[] {
	// Create a map to track unique color combinations
	const colorMap = new Map<string, Gradient[]>();

	// Function to create a unique key for colors
	const createColorKey = (colors: string[]): string =>
		[...colors].sort().join("|").toLowerCase();

	// Group gradients by their color combinations
	gradients.forEach((gradient) => {
		const colorKey = createColorKey(gradient.colors);
		if (!colorMap.has(colorKey)) {
			colorMap.set(colorKey, []);
		}
		colorMap.get(colorKey)?.push(gradient);
	});

	// Function to clean up gradient names
	const cleanName = (name: string): string => {
		// Remove "Variant X" from the name
		return name.replace(/\s+Variant\s+\d+$/, "");
	};

	// Function to pick the best name for a group of identical gradients
	const pickBestName = (gradients: Gradient[]): string => {
		// Sort by name length and alphabetically to ensure consistent selection
		const names = gradients
			.map((g) => g.name)
			.map((name) => cleanName(name))
			.sort((a, b) => {
				// Prefer names without numbers
				const aHasNumber = /\d/.test(a);
				const bHasNumber = /\d/.test(b);
				if (aHasNumber !== bHasNumber) {
					return aHasNumber ? 1 : -1;
				}
				// Then prefer shorter names
				if (a.length !== b.length) {
					return a.length - b.length;
				}
				// Finally sort alphabetically
				return a.localeCompare(b);
			});
		return names[0];
	};

	const cleanedGradients: Gradient[] = [];

	// Process each unique color combination
	colorMap.forEach((gradientGroup) => {
		if (gradientGroup.length === 1) {
			// If there's only one gradient with these colors, clean its name and add it
			cleanedGradients.push({
				name: cleanName(gradientGroup[0].name),
				colors: gradientGroup[0].colors,
			});
		} else {
			// For multiple gradients with the same colors
			const baseName = pickBestName(gradientGroup);
			cleanedGradients.push({
				name: baseName,
				colors: gradientGroup[0].colors,
			});
		}
	});

	// Sort gradients alphabetically by name
	return cleanedGradients.sort((a, b) => a.name.localeCompare(b.name));
}

// Main execution
try {
	// Read the input file
	const inputPath = path.join(__dirname, "gradients.json");
	const gradients: Gradient[] = JSON.parse(
		fs.readFileSync(inputPath, "utf8"),
	);

	// Process the gradients
	const cleanedGradients = cleanupGradients(gradients);

	// Generate statistics
	console.log("Gradient Cleanup Results:");
	console.log("-------------------------");
	console.log(`Original gradient count: ${gradients.length}`);
	console.log(`Cleaned gradient count: ${cleanedGradients.length}`);
	console.log(
		`Removed duplicates: ${gradients.length - cleanedGradients.length}`,
	);

	// Write the cleaned data to a new file
	const outputPath = path.join(__dirname, "cleaned-gradients.json");
	fs.writeFileSync(
		outputPath,
		JSON.stringify(cleanedGradients, null, 2),
		"utf8",
	);

	console.log(`\nCleaned gradients saved to: ${outputPath}`);

	// Show some sample changes
	console.log("\nSample of changes made:");
	for (let i = 0; i < Math.min(5, cleanedGradients.length); i++) {
		const original = gradients.find((g) =>
			cleanedGradients[i].colors.every((c) => g.colors.includes(c)),
		);
		if (original && original.name !== cleanedGradients[i].name) {
			console.log(`${original.name} -> ${cleanedGradients[i].name}`);
		}
	}
} catch (error) {
	console.error(
		"Error processing gradients:",
		error instanceof Error ? error.message : error,
	);
	process.exit(1);
}
