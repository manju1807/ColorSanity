<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useColorPaletteStore } from '../stores/colorPalette';
import { ColorTheoryMode } from '../types';
import {
  Download,
  Undo,
  Redo,
  Palette,
  Settings,
  History,
} from 'lucide-vue-next';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Store
const store = useColorPaletteStore();

// Refs
const showSettings = ref(false);
const showHistory = ref(false);
const showColorDetails = ref(false);
const selectedMode = ref<ColorTheoryMode>('random');
const baseColor = ref<string | undefined>();
const selectedColor = ref<{ name: string; hex: string; rgb: string; hsl: string } | null>(null);

// Methods
const handleKeyDown = (event: KeyboardEvent) => {
  const { keyboardShortcuts } = store.state.preferences;

  if (event.code === keyboardShortcuts.generate) {
    event.preventDefault();
    store.generatePalette(selectedMode.value, baseColor.value);
  } else if (event.ctrlKey && event.key === keyboardShortcuts.undo) {
    event.preventDefault();
    store.undo();
  } else if (event.ctrlKey && event.shiftKey && event.key === keyboardShortcuts.redo) {
    event.preventDefault();
    store.redo();
  }
};

const exportPalette = async () => {
  try {
    const format = store.state.preferences.autoExportFormat;
    let content = '';

    switch (format) {
      case 'css':
        content = store.currentPalette.value
          .map((color, i) => `--color-${i + 1}: ${color.hex};`)
          .join('\n');
        break;
      case 'json':
        content = JSON.stringify(store.currentPalette.value, null, 2);
        break;
      default:
        content = store.currentPalette.value
          .map(color => `${color.name}: ${color.hex}`)
          .join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-palette.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting palette:', error);
  }
};

const openColorDetails = (color: { name: string; hex: string; rgb: string; hsl: string }) => {
  selectedColor.value = color;
  showColorDetails.value = true;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Lifecycle
onMounted(async () => {
  await store.initialize();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

defineOptions({
  name: 'ColorPalette',
  layout: 'default',
  meta: {
    title: 'Color Palette Generator',
    description: 'Generate beautiful color palettes with color theory!',
  },
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-6 h-screen flex flex-col">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 class="text-sm text-center md:text-left md:text-lg font-medium text-muted-foreground">
            Generate beautiful color palettes with color theory!
          </h1>

          <!-- Controls -->
          <div class="flex flex-wrap justify-center gap-2">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button @click="store.undo" variant="ghost" :disabled="!store.canUndo" class="flex items-center gap-2"
                  aria-label="Undo">
                  <Undo class="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger as-child>
                <Button @click="store.redo" variant="ghost" :disabled="!store.canRedo" class="flex items-center gap-2"
                  aria-label="Redo">
                  <Redo class="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger as-child>
                <Button @click="exportPalette" variant="ghost" class="flex items-center gap-2"
                  aria-label="Export Palette">
                  <Download class="w-5 h-5" />
                  <span class="hidden md:flex">Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Palette</TooltipContent>
            </Tooltip>

            <Select v-model="selectedMode">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="complementary">Complementary</SelectItem>
                <SelectItem value="analogous">Analogous</SelectItem>
                <SelectItem value="triadic">Triadic</SelectItem>
                <SelectItem value="tetradic">Tetradic</SelectItem>
              </SelectContent>
            </Select>

            <Button @click="store.generatePalette(selectedMode, baseColor)" class="flex items-center gap-2">
              <Palette class="w-5 h-5" />
              Generate
            </Button>

            <Button @click="showSettings = true" variant="ghost" class="flex items-center gap-2">
              <Settings class="w-5 h-5" />
            </Button>

            <Button @click="showHistory = true" variant="ghost" class="flex items-center gap-2">
              <History class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <!-- Color Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-1">
        <div v-for="(color, index) in store.currentPalette" :key="index"
          class="relative rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 group"
          :style="{ backgroundColor: color.hex }">
          <div class="absolute inset-0 flex flex-col justify-center items-center p-4"
            :class="{ 'backdrop-blur-sm bg-black/10': store.state.preferences.showColorDetails }">
            <p class="text-xl font-semibold mb-2"
              :style="{ color: store.state.preferences.preferredColorFormat === 'hex' ? color.hex : color.rgb }">
              {{ color.name }}
            </p>

            <div class="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-sm font-mono mb-1">
                {{ store.state.preferences.preferredColorFormat === 'hex' ? color.hex :
                  store.state.preferences.preferredColorFormat === 'rgb' ? color.rgb : color.hsl }}
              </p>

              <div class="flex gap-2 mt-2">
                <Button size="sm" variant="ghost"
                  @click="copyToClipboard(color[store.state.preferences.preferredColorFormat])"
                  class="text-white bg-black/20 hover:bg-black/30">
                  Copy
                </Button>
                <Button size="sm" variant="ghost" @click="openColorDetails(color)"
                  class="text-white bg-black/20 hover:bg-black/30">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Modal -->
      <Dialog v-model:open="showSettings">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Default Color Count</label>
              <Input type="number" v-model="store.state.preferences.defaultColorCount" min="2" max="10" />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Color Format</label>
              <Select v-model="store.state.preferences.preferredColorFormat">
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">HEX</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Export Format</label>
              <Select v-model="store.state.preferences.autoExportFormat">
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="css">CSS Variables</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex items-center gap-2">
              <Checkbox v-model="store.state.preferences.showColorDetails" id="showDetails" />
              <label for="showDetails" class="text-sm">Show color details by default</label>
            </div>
          </div>
          <DialogFooter>
            <Button @click="showSettings = false">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- History Modal -->
      <Dialog v-model:open="showHistory">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Palette History</DialogTitle>
          </DialogHeader>
          <div class="space-y-4 max-h-[60vh] overflow-y-auto">
            <div v-for="palette in store.paletteHistory" :key="palette.created.toString()"
              class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">{{ palette.name }}</h3>
                <span class="text-sm text-gray-500">
                  {{ new Date(palette.created).toLocaleDateString() }}
                </span>
              </div>

              <div class="flex gap-2 h-8">
                <div v-for="color in palette.colors" :key="color.hex" class="flex-1 rounded"
                  :style="{ backgroundColor: color.hex }" />
              </div>

              <div class="flex gap-2 mt-2">
                <Button size="sm" variant="ghost" @click="store.loadPalette(palette.colors)">
                  Load
                </Button>
                <Button size="sm" variant="ghost" @click="store.deletePalette(palette)">
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button @click="showHistory = false">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- Color Details Modal -->
      <Dialog v-model:open="showColorDetails">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ selectedColor?.name }}</DialogTitle>
          </DialogHeader>
          <div class="space-y-4">
            <div class="h-32 rounded-lg" :style="{ backgroundColor: selectedColor?.hex }"></div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium">HEX</label>
                <p class="font-mono">{{ selectedColor?.hex }}</p>
              </div>
              <div>
                <label class="text-sm font-medium">RGB</label>
                <p class="font-mono">{{ selectedColor?.rgb }}</p>
              </div>
              <div>
                <label class="text-sm font-medium">HSL</label>
                <p class="font-mono">{{ selectedColor?.hsl }}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button @click="showColorDetails = false">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
