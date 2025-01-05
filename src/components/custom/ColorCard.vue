<script setup lang="ts">
import type { CardOptions, ColorData, GradientColor, SolidColor } from "@/types/colors";
import html2canvas from "html2canvas";
import { Copy, Download, EllipsisVertical, Eye } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";

const props = defineProps<{
  colorData: ColorData;
}>();

const options = ref<CardOptions>({
  opacity: 1,
  direction: "linear",
  angle: 90,
});

// Create refs for the slider values
const angleValue = ref<number[]>([options.value.angle ?? 180]);
const opacityValue = ref<number[]>([options.value.opacity ?? 1]);

// Watch for changes in the slider values and update options
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

const backgroundStyle = computed(() => {
  const opacity = options.value.opacity;

  if (isGradient.value) {
    const { colors } = props.colorData as GradientColor;
    const { direction, angle } = options.value;

    const colorStops = colors
      .map((color) => {
        const rgbColor = color.replace(/rgba?\(([^)]+)\)/, "rgb($1)").replace(/,\s*[\d.]+\s*\)/, ")");
        return rgbColor.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
      })
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
      backgroundColor: color.replace("rgb", "rgba").replace(")", `, ${opacity})`),
    };
  }
});

const cssCode = computed(() => {
  if (isGradient.value) {
    const { colors } = props.colorData as GradientColor;
    const { direction, angle, opacity } = options.value;

    const colorStops = colors
      .map((color) => {
        const rgbColor = color.replace(/rgba?\(([^)]+)\)/, "rgb($1)").replace(/,\s*[\d.]+\s*\)/, ")");
        return rgbColor.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
      })
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
    return `background-color: ${color.replace("rgb", "rgba").replace(")", `, ${options.value.opacity})`)}`
  }
});

const nonSettingsActions = [
  {
    label: "Download",
    icon: Download,
    handler: async () => {
      try {
        const element = document.querySelector("#downloadable");
        if (!element) return;

        const controls = document.querySelector("#controls");
        if (controls) controls.classList.add("hidden");

        const canvas = await html2canvas(element as HTMLElement, {
          backgroundColor: null,
          scale: 10,
        });

        if (controls) controls.classList.remove("hidden");

        const img = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = img;
        a.download = `${props.colorData.name || "color"}.png`;
        a.click();

        toast.success("Successfully downloaded image!");
      } catch (error) {
        console.error("Failed to download image", error);
        toast.error("Failed to download image!");
      }
    },
  },
  {
    label: "Preview",
    icon: Eye,
    handler: () => {
      // Create a query string with the color data
      const colorParams = new URLSearchParams();

      if (isGradient.value) {
        const gradientData = props.colorData as GradientColor;
        colorParams.set('type', 'gradient');
        colorParams.set('colors', JSON.stringify(gradientData.colors));
        colorParams.set('direction', options.value.direction || 'linear');
        colorParams.set('angle', (options.value.angle ?? 90).toString());
      } else {
        const solidData = props.colorData as SolidColor;
        colorParams.set('type', 'solid');
        colorParams.set('color', solidData.color);
      }

      colorParams.set('opacity', (options.value.opacity ?? 1).toString());
      colorParams.set('name', props.colorData.name || '');

      // Redirect to preview page with color data
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
  <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
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
        class="rounded-full bg-slate-900/80 hover:bg-slate-900 text-white" @click="action.handler">
        <component :is="action.icon" class="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger>
          <Button variant="secondary" size="icon" class="rounded-full bg-slate-900/80 hover:bg-slate-900 text-white">
            <EllipsisVertical class="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent class="w-80">
          <div class="space-y-4">
            <div v-if="isGradient" class="space-y-4">
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

              <div v-if="options.direction === 'linear'" class="space-y-2">
                <Label>Angle: {{ options.angle }}°</Label>
                <Slider v-model="angleValue" :min="0" :max="360" :step="1" />
              </div>
            </div>

            <div class="space-y-2">
              <Label>Opacity: {{ Math.round((options.opacity ?? 1) * 100) }}%</Label>
              <Slider v-model="opacityValue" :min="0" :max="1" :step="0.01" />
            </div>

            <div class="space-y-2">
              <Label>CSS Code</Label>
              <div class="relative">
                <pre class="p-2 bg-slate-100 rounded text-sm">{{ cssCode }}</pre>
                <Button variant="secondary" size="sm" class="absolute top-2 right-2" @click="copyCSS">
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
