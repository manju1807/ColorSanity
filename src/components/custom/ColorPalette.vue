<script setup lang="ts">
import { TransitionRoot } from "@headlessui/vue";
import {
	AlertCircle as AlertCircleIcon,
	Check as CheckIcon,
	Copy as CopyIcon,
} from "lucide-vue-next";
import { ref } from "vue";

interface ColorInfo {
	className: string;
	rgb: string;
	hsl: string;
	hex: string;
}

interface Props {
	colors: Record<string, Record<string, ColorInfo>>;
	format?: "hex" | "rgb" | "hsl";
}

const props = withDefaults(defineProps<Props>(), {
	format: "hex",
});

const copiedStates = ref<Record<string, boolean>>({});
const showError = ref(false);

const getFormattedValue = (colorInfo: ColorInfo): string => {
	switch (props.format) {
		case "rgb":
			return colorInfo.rgb;
		case "hsl":
			return colorInfo.hsl;
		default:
			return colorInfo.hex;
	}
};

const handleCopy = async (
	colorName: string,
	shade: string,
	colorInfo: ColorInfo,
) => {
	const textToCopy = getFormattedValue(colorInfo);
	try {
		await navigator.clipboard.writeText(textToCopy);
		copiedStates.value[`${colorName}-${shade}`] = true;
		setTimeout(() => {
			copiedStates.value[`${colorName}-${shade}`] = false;
		}, 2000);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		showError.value = true;
		setTimeout(() => {
			showError.value = false;
		}, 3000);
	}
};
</script>

<template>
  <div class="w-full space-y-4 sm:space-y-8 px-2 sm:px-0">
    <!-- Error Alert -->
    <TransitionRoot appear :show="showError" as="template">
      <div class="fixed top-4 right-4 z-50">
        <div class="bg-red-50 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <AlertCircleIcon class="w-5 h-5" />
          <span>Failed to copy color value</span>
        </div>
      </div>
    </TransitionRoot>

    <div v-for="(shades, colorName) in colors" :key="colorName" class="space-y-2">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
        <h3 class="text-base font-semibold capitalize">{{ colorName }}</h3>
        <div class="text-sm text-gray-500">Format: {{ format }}</div>
      </div>

      <div class="color-grid">
        <div v-for="(colorInfo, shade) in shades" :key="shade"
          class="group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <!-- Copy Button - Always visible on mobile, hover on desktop -->
          <button @click="handleCopy(colorName, shade, colorInfo)" class="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-sm
                  sm:opacity-0 sm:group-hover:opacity-100
                  transition-opacity duration-200" :aria-label="`Copy ${colorName}-${shade} ${format} value`">
            <component :is="copiedStates[`${colorName}-${shade}`] ? CheckIcon : CopyIcon" :class="[
              'w-4 h-4',
              copiedStates[`${colorName}-${shade}`] ? 'text-green-500' : 'text-gray-100'
            ]" />
          </button>

          <!-- Color Display -->
          <div class="h-16 sm:h-24 w-full" :style="{ backgroundColor: colorInfo.hex }"></div>

          <!-- Color Info -->
          <div class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs bg-white dark:bg-gray-800">
            <p class="font-medium text-gray-900 dark:text-gray-200">
              {{ `${colorName}-${shade}` }}
            </p>
            <p class="text-gray-500 dark:text-gray-400 font-mono break-all">
              {{ getFormattedValue(colorInfo) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .color-grid {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
}

/* Custom transitions for error alert */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
