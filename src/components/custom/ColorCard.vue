<!-- components/ColorCard.vue -->
<template>
  <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <!-- Main Card Content -->
    <div class="w-full h-48 p-4 relative" :style="backgroundStyle">
      <!-- Action Buttons -->
      <div class="absolute top-4 right-4 flex gap-2">
        <Button v-for="action in actions" :key="action.label" variant="secondary" size="icon"
          class="rounded-full bg-slate-900/80 hover:bg-slate-900 text-white" @click="action.handler">
          <component :is="action.icon" class="h-4 w-4" />
        </Button>
      </div>

      <!-- Color Name -->
      <div class="absolute bottom-4 left-4">
        <Badge variant="secondary" class="bg-white/80 text-slate-900">
          {{ colorData.name }}
        </Badge>
      </div>
    </div>

    <!-- Options Panel (conditionally rendered) -->
    <div v-if="showOptions" class="p-4 bg-white border-t">
      <div v-if="isGradient">
        <div class="space-y-4">
          <!-- Direction Selector -->
          <div class="space-y-2">
            <Label>Direction</Label>
            <Select v-model="options.direction">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
                <SelectItem value="conic">Conic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Angle Slider (for linear gradients) -->
          <div v-if="options.direction === 'linear'" class="space-y-2">
            <Label>Angle: {{ options.angle }}°</Label>
            <Slider :model-value="angleArray" @update:model-value="updateAngle" :min="0" :max="360" :step="1" />
          </div>
        </div>
      </div>

      <!-- Opacity Slider (for both types) -->
      <div class="space-y-2">
        <Label>Opacity: {{ Math.round((options.opacity ?? 1) * 100) }}%</Label>
        <Slider :model-value="opacityArray" @update:model-value="updateOpacity" :min="0" :max="1" :step="0.01" />

        <!-- CSS Code Display -->
        <div class="mt-4">
          <Label>CSS Code</Label>
          <div class="relative mt-2">
            <pre class="p-2 bg-slate-100 rounded text-sm">{{ cssCode }}</pre>
            <Button variant="secondary" size="sm" class="absolute top-2 right-2" @click="copyCSS">
              <Copy class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
	CardOptions,
	ColorData,
	GradientColor,
	SolidColor,
} from "@/types/colors";
import { Copy, Download, Settings } from "lucide-vue-next";
import { computed, ref } from "vue";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
const props = defineProps<{
	colorData: ColorData;
}>();

const showOptions = ref(false);
const options = ref<CardOptions>({
	opacity: 1,
	direction: "linear",
	angle: 180,
} as CardOptions);

// Computed properties for slider values as arrays
const angleArray = computed(() => [options.value.angle ?? 180]);
const opacityArray = computed(() => [options.value.opacity ?? 1]);

// Update handlers for sliders
const updateAngle = (values: number[] | undefined) => {
	if (values?.length) {
		options.value.angle = values[0];
	}
};

const updateOpacity = (values: number[] | undefined) => {
	if (values?.length) {
		options.value.opacity = values[0];
	}
};

// Computed property to check if the color is gradient
const isGradient = computed(() => "colors" in props.colorData);

// Generate background style based on color type and options
const backgroundStyle = computed(() => {
	if (isGradient.value) {
		const { colors } = props.colorData as GradientColor;
		const { direction, angle, opacity } = options.value;

		if (direction === "linear") {
			return {
				background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
				opacity,
			};
		} else if (direction === "radial") {
			return {
				background: `radial-gradient(circle, ${colors.join(", ")})`,
				opacity,
			};
		} else {
			return {
				background: `conic-gradient(${colors.join(", ")})`,
				opacity,
			};
		}
	} else {
		const { color } = props.colorData as SolidColor;
		return {
			backgroundColor: color,
			opacity: options.value.opacity,
		};
	}
});

// Generate CSS code for copying
const cssCode = computed(() => {
	if (isGradient.value) {
		const { colors } = props.colorData as GradientColor;
		const { direction, angle, opacity } = options.value;

		let gradient = "";
		if (direction === "linear") {
			gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`;
		} else if (direction === "radial") {
			gradient = `radial-gradient(circle, ${colors.join(", ")})`;
		} else {
			gradient = `conic-gradient(${colors.join(", ")})`;
		}

		return `background: ${gradient};\nopacity: ${opacity};`;
	} else {
		const { color } = props.colorData as SolidColor;
		return `background-color: ${color};\nopacity: ${options.value.opacity};`;
	}
});

// Action handlers
const actions = [
	{
		label: "Download",
		icon: Download,
		handler: () => {
			// Implement download functionality
		},
	},
	{
		label: "Copy",
		icon: Copy,
		handler: () => copyCSS(),
	},
	{
		label: "Options",
		icon: Settings,
		handler: () => (showOptions.value = !showOptions.value),
	},
];

const copyCSS = () => {
	navigator.clipboard.writeText(cssCode.value);
	// Optional: Show a toast notification
};
</script>
