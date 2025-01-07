<script setup lang="ts">
import { ref } from "vue";

defineOptions({
	name: "ColorPalette",
});

const colors = ref([
	{ hex: "#D496A7", name: "Place" },
	{ hex: "#9D695A", name: "Redwood" },
	{ hex: "#78E0DC", name: "Tiffany Blue" },
	{ hex: "#8EEDF7", name: "Electric blue" },
	{ hex: "#AtCDF1", name: "Light Sky Blue" },
]);

const generatePalette = () => {
	// Function to generate new color palettes
	colors.value = [
		{ hex: "#D496A7", name: "Place" },
		{ hex: "#9D695A", name: "Redwood" },
		{ hex: "#78E0DC", name: "Tiffany Blue" },
		{ hex: "#8EEDF7", name: "Electric blue" },
		{ hex: "#AtCDF1", name: "Light Sky Blue" },
	];
};

const exportPalette = () => {
	// Function to export the color palette
	// console.log("Exporting palette:", colors.value);
};

const savePalette = () => {
	// Function to save the color palette
	// console.log("Saving palette:", colors.value);
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6">Press the spacebar to generate color palettes!</h1>
      <div class="flex justify-center gap-4 mb-6">
        <button @click="generatePalette"
          class="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
          Generate
        </button>
        <button @click="exportPalette"
          class="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
          Export
        </button>
        <button @click="savePalette"
          class="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90">
          Save
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(color, index) in colors" :key="index" class="p-4 rounded-lg shadow-md"
          :style="{ backgroundColor: color.hex }">
          <div class="text-center">
            <p class="text-lg font-semibold">{{ color.name }}</p>
            <p class="text-sm">{{ color.hex }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
