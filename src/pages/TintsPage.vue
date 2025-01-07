<script setup lang="ts">
import ColorPalette from "@/components/custom/ColorPalette.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TintColors from "@/config/constants/data/tints.json";
import { ChevronDownIcon } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";

// Simple format state
const selectedFormat = ref<"hex" | "rgb" | "hsl">("hex");

// Reactive props for dropdown positioning
const dropdownSide = ref<"left" | "right">("right");
const dropdownAlign = ref<"start" | "center" | "end">("start");
const dropdownSideOffset = ref(5);

// Function to update dropdown position based on screen size
const updateDropdownPosition = () => {
  if (window.innerWidth < 768) {
    dropdownSide.value = "left"; // Position dropdown to the left on small screens
    dropdownAlign.value = "start";
    dropdownSideOffset.value = 10; // Add some spacing
  } else {
    dropdownSide.value = "right"; // Default to right on larger screens
    dropdownAlign.value = "start";
    dropdownSideOffset.value = 5;
  }
};

// Update position on mount and window resize
onMounted(() => {
  updateDropdownPosition();
  window.addEventListener("resize", updateDropdownPosition);
});

// Cleanup event listener on unmount
onUnmounted(() => {
  window.removeEventListener("resize", updateDropdownPosition);
});
</script>

<template>
  <div class="w-full min-h-screen bg-background overflow-x-hidden">
    <!-- Main Content Container -->
    <div class="flex-1 flex flex-col max-w-7xl mx-auto px-4 md:px-6 py-12 w-full relative">
      <!-- Header Section -->
      <div class="flex flex-col items-center gap-4 mb-8">
        <h1 class="text-5xl font-extrabold tracking-tight text-center">
          Tints Collections
        </h1>
        <p class="text-sm text-center max-w-md">
          Discover our handpicked selection of tints and shades to elevate your designs
        </p>
        <p class="text-xs">Made with ❤️ by Manjunath R</p>
      </div>

      <!-- Format Selector -->
      <div class="flex justify-end mb-8 relative">
        <DropdownMenu>
          <DropdownMenuTrigger
            class="flex items-center gap-2 px-4 py-2 text-sm border rounded-md bg-background hover:bg-background/50 transition-colors duration-200">
            {{ selectedFormat.toUpperCase() }}
            <ChevronDownIcon class="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48" :side="dropdownSide" :align="dropdownAlign" :sideOffset="dropdownSideOffset"
            collisionPadding={10}>
            <DropdownMenuLabel>Color Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="selectedFormat = 'hex'" class="cursor-pointer">
              HEX
            </DropdownMenuItem>
            <DropdownMenuItem @select="selectedFormat = 'rgb'" class="cursor-pointer">
              RGB
            </DropdownMenuItem>
            <DropdownMenuItem @select="selectedFormat = 'hsl'" class="cursor-pointer">
              HSL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Color Palette Container -->
      <div class="w-full">
        <ColorPalette :colors="TintColors" :format="selectedFormat" />
      </div>
    </div>
  </div>
</template>
