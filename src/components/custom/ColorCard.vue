<script setup lang="ts">
import type {
	CardOptions,
	ColorData,
	GradientColor,
	SolidColor,
} from "@/types/colors";
import html2canvas from "html2canvas";
import { Copy, Download, EllipsisVertical, Eye } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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

const options = ref<CardOptions>({
	opacity: 1,
	direction: "linear",
	angle: 90,
});

const opacityValue = ref<number[]>([options.value.opacity ?? 1]);
const angleValue = ref<number[]>([options.value.angle ?? 180]);

watch(angleValue, (newValue) => {
	if (newValue?.length) {
		options.value.angle = newValue[0];
	}
});

watch(opacityValue, (newValue) => {
	if (newValue?.length && newValue[0] !== undefined) {
		options.value.opacity = Number(newValue[0].toFixed(2));
	}
});

const isGradient = computed(() => "colors" in props.colorData);

const applyOpacityToColor = (color: string, opacity: number): string => {
	if (color.startsWith("rgb(")) {
		return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
	} else if (color.startsWith("#")) {
		const hex = color.replace("#", "");
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}
	return color;
};

const backgroundStyle = computed(() => {
	const opacity = options.value.opacity;

	if (isGradient.value) {
		const { colors } = props.colorData as GradientColor;
		const { direction, angle } = options.value;

		const colorStops = colors
			.map((color) => applyOpacityToColor(color, opacity ?? 1))
			.join(", ");

		if (direction === "linear") {
			return {
				background: `linear-gradient(${angle}deg, ${colorStops})`,
			};
		} else if (direction === "radial") {
			return {
				background: `radial-gradient(circle, ${colorStops})`,
			};
		} else {
			return {
				background: `conic-gradient(${colorStops})`,
			};
		}
	} else {
		const { color } = props.colorData as SolidColor;
		return {
			backgroundColor: applyOpacityToColor(color, opacity ?? 1),
		};
	}
});

const cssCode = computed(() => {
	const opacity = options.value.opacity;

	if (isGradient.value) {
		const { colors } = props.colorData as GradientColor;
		const { direction, angle } = options.value;

		const colorStops = colors
			.map((color) => applyOpacityToColor(color, opacity ?? 1))
			.join(", ");

		if (direction === "linear") {
			return `background: linear-gradient(${angle}deg, ${colorStops});`;
		} else if (direction === "radial") {
			return `background: radial-gradient(circle, ${colorStops});`;
		} else {
			return `background: conic-gradient(${colorStops});`;
		}
	} else {
		const { color } = props.colorData as SolidColor;
		return `background-color: ${applyOpacityToColor(color, opacity ?? 1)};`;
	}
});

const nonSettingsActions = [
	{
		label: "Download",
		icon: Download,
		handler: async () => {
			const element = document.querySelector("#downloadable");
			const controls = document.querySelector("#controls");

			if (!element) return;

			try {
				if (controls) controls.classList.add("hidden");

				const canvas = await html2canvas(element as HTMLElement, {
					backgroundColor: null,
					scale: 10,
				});

				const img = canvas.toDataURL("image/png");
				const a = document.createElement("a");
				a.href = img;
				a.download = `${props.colorData.name || "color"}.png`;
				a.click();

				toast.success("Successfully downloaded image!");
			} catch (error) {
				console.error("Failed to download image", error);
				toast.error("Failed to download image!");
			} finally {
				if (controls) controls.classList.remove("hidden");
			}
		},
	},
	{
		label: "Preview",
		icon: Eye,
		handler: () => {
			const colorParams = new URLSearchParams();

			if (isGradient.value) {
				const gradientData = props.colorData as GradientColor;
				colorParams.set("type", "gradient");
				colorParams.set("colors", JSON.stringify(gradientData.colors));
				colorParams.set(
					"direction",
					options.value.direction || "linear",
				);
				colorParams.set(
					"angle",
					(options.value.angle ?? 90).toString(),
				);
			} else {
				const solidData = props.colorData as SolidColor;
				colorParams.set("type", "solid");
				colorParams.set("color", solidData.color);
			}

			colorParams.set("opacity", (options.value.opacity ?? 1).toString());
			colorParams.set("name", props.colorData.name || "");

			window.location.href = `/preview?${colorParams.toString()}`;
		},
	},
];

const copyCSS = () => {
	try {
		navigator.clipboard.writeText(cssCode.value);
		toast.success("Successfully copied CSS code!");
	} catch (error) {
		console.error("Failed to copy CSS code", error);
		toast.error("Failed to copy CSS code!");
	}
};
</script>

<template>
  <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
    <div id="downloadable" class="w-full h-48 relative">
      <div class="w-full h-full" :style="backgroundStyle"></div>
    </div>

    <div class="absolute inset-0 flex items-end p-4 justify-center">
      <Badge variant="secondary" class="bg-white/60 py-1.5 text-slate-900 rounded-full">
        {{ colorData.name }}
      </Badge>
    </div>

    <div id="controls" class="absolute top-0 right-0 p-4 flex gap-2">
      <Button v-for="action in nonSettingsActions" :key="action.label" variant="secondary" size="icon"
        class="rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-transform transform hover:scale-110"
        :title="action.label" @click="action.handler">
        <component :is="action.icon" class="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger>
          <Button variant="secondary" size="icon"
            class="rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-transform transform hover:scale-110"
            aria-label="More options">
            <EllipsisVertical class="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent class="w-80 max-w-[90vw] p-4 bg-white shadow-lg rounded-lg">
          <div class="space-y-4">
            <div v-if="isGradient" class="space-y-4">
              <div class="space-y-2">
                <Label class="text-sm font-medium">Direction</Label>
                <Select v-model="options.direction">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                    <SelectItem value="conic">Conic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div v-if="options.direction === 'linear'" class="space-y-2">
                <Label class="text-sm font-medium">Angle: {{ options.angle }}°</Label>
                <Slider v-model="angleValue" :min="0" :max="360" :step="1" />
              </div>
            </div>

            <div class="space-y-2">
              <Label class="text-sm font-medium">Opacity: {{ Math.round((options.opacity ?? 1) * 100) }}%</Label>
              <Slider v-model="opacityValue" :min="0" :max="1" :step="0.01" />
            </div>

            <div class="space-y-2">
              <Label class="text-sm font-medium">CSS Code</Label>
              <div class="relative">
                <p class="p-6 bg-slate-100 rounded text-xs text-wrap font-mono">
                  {{ cssCode }}
                </p>
                <Button variant="secondary" size="xs" class="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  @click="copyCSS" title="Copy CSS">
                  <Copy class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles for transitions and animations */
.button-hover {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.button-hover:hover {
  transform: scale(1.1);
}

.popover-content {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
