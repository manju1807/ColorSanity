<script setup lang="ts">
import ColorPalette from "@/components/custom/ColorPalette.vue";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TintColors from "@/config/constants/data/tints.json";
import { ref } from "vue";

// Constants
const selectedFormat = ref<"hex" | "rgb" | "hsl">("hex");

// Format options
const formatOptions = [
	{ value: "hex", label: "HEX" },
	{ value: "rgb", label: "RGB" },
	{ value: "hsl", label: "HSL" },
];
</script>

<template>
  <div class="container relative px-4 md:px-24 py-12 z-10">
    <!-- Header -->
    <div class="min-h-full min-w-full mb-12 space-y-4 flex flex-col items-center justify-center">
      <h1 class="text-center text-5xl font-extrabold tracking-tight leading-tight text-foreground">
        Tints Collections
      </h1>
      <p class="text-center text-sm text-foreground max-w-md">
        Discover our handpicked selection of tints and shades to elevate your designs
      </p>
      <p class="text-xs text-foreground tracking-tight">Made with ❤️ by Manjunath R</p>

      <!-- Shadcn Dropdown Menu -->
      <div class="w-full flex items-end justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            class="w-32 px-3 py-2 text-sm bg-background border rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {{ formatOptions.find(opt => opt.value === selectedFormat)?.label }}
            <span class="ml-2">
              <svg class="w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem v-for="option in formatOptions" :key="option.value"
              @select="selectedFormat = option.value as 'hex' | 'rgb' | 'hsl'"
              :class="{ 'bg-muted': selectedFormat === option.value }">
              {{ option.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Main Content -->
    <div>
      <ColorPalette :colors="TintColors" :format="selectedFormat" />
    </div>
  </div>
</template>
