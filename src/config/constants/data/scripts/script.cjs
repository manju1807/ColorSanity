// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

// Read the input file
const inputData = fs.readFileSync('unique_colors.json', 'utf8');
const colors = JSON.parse(inputData);

// Create a Map to store unique colors (using name as key)
const uniqueColors = new Map();

// Process each color entry
colors.forEach(color => {
  uniqueColors.set(color.name, color);
});

// Convert Map back to array and sort by name
const sortedUniqueColors = Array.from(uniqueColors.values())
  .sort((a, b) => a.name.localeCompare(b.name));

// Format the output with proper indentation
const formattedOutput = JSON.stringify(sortedUniqueColors, null, 2);

// Write to new file
fs.writeFileSync('unique_colors_new.json', formattedOutput);

// Print statistics
console.log(`Original count: ${colors.length}`);
console.log(`After removing duplicates: ${sortedUniqueColors.length}`);

// Verify no duplicate names or colors exist
const names = new Set(sortedUniqueColors.map(c => c.name));
const hexCodes = new Set(sortedUniqueColors.map(c => c.color.toLowerCase()));

console.log(`Unique names: ${names.size}`);
console.log(`Unique color codes: ${hexCodes.size}`);

if (names.size !== sortedUniqueColors.length) {
  console.warn('Warning: There are still duplicate names!');
}
if (hexCodes.size !== sortedUniqueColors.length) {
  console.warn('Warning: There are still duplicate color codes!');
}
