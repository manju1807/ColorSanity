<!-- components/ColorCard.vue -->
<script setup lang="ts">
import type { CardOptions, ColorData, GradientColor, SolidColor } from "@/types/colors";
import html2canvas from 'html2canvas';
import { Copy, Download, EllipsisVertical, Eye } from "lucide-vue-next";
import { computed, ref } from "vue";
import { toast } from 'vue-sonner';
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
  angle: 180,
});

const angleArray = computed(() => [options.value.angle ?? 180]);
const opacityArray = computed(() => [options.value.opacity ?? 1]);

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

const isGradient = computed(() => "colors" in props.colorData);


const backgroundStyle = computed(() => {
  if (isGradient.value) {
    const { colors } = props.colorData as GradientColor;
    const { direction, angle, opacity } = options.value;
    const colorStops = colors.map(color => {
      if (color.startsWith('rgba')) return color;
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }).join(', ');

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
      backgroundColor: color.replace('rgb', 'rgba').replace(')', `, ${options.value.opacity})`),
    };
  }
});

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

const nonSettingsActions = [
  {
    label: "Download",
    icon: Download,
    handler: async () => {
      try {
        const element = document.querySelector('#downloadable');
        if (!element) return;

        // Hide controls before capture
        const controls = document.querySelector('#controls');
        if (controls) {
          controls.classList.add('hidden');
        }

        const canvas = await html2canvas(element as HTMLElement, {
          backgroundColor: null,
          scale: 10, // Better quality
        });

        // Show controls after capture
        if (controls) {
          controls.classList.remove('hidden');
        }

        const img = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = img;
        a.download = `${props.colorData.name || 'color'}.png`;
        a.click();

        toast.success('Successfully downloaded image!');
      } catch (error) {
        console.error("Failed to download image", error);
        toast.error('Failed to download image!');
      }
    },
  },
  {
    label: "Preview",
    icon: Eye,
    handler: () => (window.location.href = "/preview"),
  },
];

const copyCSS = () => {
  try {
    navigator.clipboard.writeText(cssCode.value);
    toast.success('Successfully copied css code!')
  } catch (error) {
    toast.error('Failed to copy css code!')
    console.error("Failed to copy CSS code", error);
  }
};

</script>

<template>
  <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <!-- Downloadable content -->
    <div id="downloadable" class="w-full h-48 relative">
      <!-- Background color/gradient -->
      <div class="w-full h-full" :style="backgroundStyle"></div>
    </div>

    <!-- Centered badge -->
    <div class="absolute inset-0 flex items-end p-4 justify-center">
      <Badge variant="secondary" class="bg-white/60 py-1.5 text-slate-900 rounded-full">
        {{ colorData.name }}
      </Badge>
    </div>

    <!-- Controls overlay (not included in download) -->
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
                <Slider :model-value="angleArray" @update:model-value="updateAngle" :min="0" :max="360" :step="1" />
              </div>
            </div>

            <div class="space-y-2">
              <Label>Opacity: {{ Math.round((options.opacity ?? 1) * 100) }}%</Label>
              <Slider :model-value="opacityArray" @update:model-value="updateOpacity" :min="0" :max="1" :step="0.01" />
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
